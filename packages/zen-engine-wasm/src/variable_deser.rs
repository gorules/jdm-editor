use gloo_utils::format::JsValueSerdeExt;
use rust_decimal::prelude::ToPrimitive;
use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;
use wasm_bindgen::prelude::*;
use zen_expression::variable::{RcValue, VariableMap};
use zen_expression::Variable;

pub struct JsValueCache {
    string_cache: HashMap<*const u8, JsValue>,
    array_cache: HashMap<*const Vec<Variable>, js_sys::Array>,
    object_cache: HashMap<*const VariableMap, js_sys::Object>,
}

impl JsValueCache {
    pub fn new() -> Self {
        Self {
            string_cache: HashMap::new(),
            array_cache: HashMap::new(),
            object_cache: HashMap::new(),
        }
    }

    pub fn get_or_create_string(&mut self, rc_str: &Rc<str>) -> JsValue {
        let ptr = rc_str.as_ptr() as *const _;

        if let Some(cached) = self.string_cache.get(&ptr) {
            cached.clone()
        } else {
            let js_string = JsValue::from_str(rc_str.as_ref());
            self.string_cache.insert(ptr, js_string.clone());
            js_string
        }
    }

    pub fn get_or_create_array(&mut self, rc_vec: &RefCell<Vec<Variable>>) -> js_sys::Array {
        let ptr = rc_vec.as_ptr() as *const _;

        if let Some(cached) = self.array_cache.get(&ptr) {
            cached.clone()
        } else {
            let vec = rc_vec.borrow();
            let js_array = js_sys::Array::new_with_length(vec.len() as u32);
            for (i, item) in vec.iter().enumerate() {
                let js_item = self.variable_to_js(item);
                js_array.set(i as u32, js_item);
            }
            self.array_cache.insert(ptr, js_array.clone());
            js_array
        }
    }

    pub fn get_or_create_object(&mut self, rc_map: &RefCell<VariableMap>) -> js_sys::Object {
        let ptr = rc_map.as_ptr() as *const _;

        if let Some(cached) = self.object_cache.get(&ptr) {
            cached.clone()
        } else {
            let map = rc_map.borrow();
            let js_obj = js_sys::Object::new();
            for (key, value) in map.iter() {
                let js_key = self.get_or_create_string(key);
                let js_value = self.variable_to_js(value);
                js_sys::Reflect::set(&js_obj, &js_key, &js_value).unwrap();
            }
            self.object_cache.insert(ptr, js_obj.clone());
            js_obj
        }
    }

    pub fn variable_to_js(&mut self, var: &Variable) -> JsValue {
        match var {
            Variable::Null => JsValue::null(),
            Variable::Bool(b) => JsValue::from(*b),
            Variable::Number(n) => JsValue::from(n.to_f64().unwrap_or(0.0)),
            Variable::String(rc_str) => self.get_or_create_string(rc_str),
            Variable::Array(rc_vec) => self.get_or_create_array(rc_vec).into(),
            Variable::Object(rc_map) => self.get_or_create_object(rc_map).into(),
            Variable::Dynamic(v) => JsValue::from_serde(&v.to_value()).unwrap_or_default(),
        }
    }
}

#[wasm_bindgen(js_name = "deserializeRef")]
pub fn deserialize_ref(reference: &str) -> Result<JsValue, JsError> {
    let rc_value = serde_json::from_str::<RcValue>(reference)?;
    let var = Variable::deserialize_ref(rc_value)?;

    let mut cache = JsValueCache::new();
    Ok(cache.variable_to_js(&var))
}
