use crate::variable::JsVariable;
use gloo_utils::format::JsValueSerdeExt;
use serde_json::Value;
use std::hash::{DefaultHasher, Hash, Hasher};
use std::ops::{Deref, DerefMut};
use std::rc::Rc;
use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::JsValue;
use zen_expression::intellisense::IntelliSense;
use zen_expression::variable::VariableType;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "VariableTypeJson")]
    pub type VariableTypeJson;
}

#[wasm_bindgen(js_name = "VariableType")]
pub struct JsVariableType(VariableType);

impl Deref for JsVariableType {
    type Target = VariableType;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for JsVariableType {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

#[wasm_bindgen(js_class = "VariableType")]
impl JsVariableType {
    #[wasm_bindgen(constructor)]
    pub fn new(value: JsValue) -> Self {
        let serde_value = value.into_serde::<Value>().unwrap();
        Self(VariableType::from(serde_value))
    }

    #[wasm_bindgen(js_name = "fromJson")]
    pub fn from_json(value: VariableTypeJson) -> Self {
        let js_value: JsValue = value.into();
        let variable_type = js_value.into_serde::<VariableType>().unwrap();
        Self(variable_type)
    }

    #[wasm_bindgen(js_name = "fromIncoming")]
    pub fn from_incoming(values: Vec<JsVariableType>) -> Self {
        let empty_object = VariableType::Object(Default::default());
        let vt: VariableType = values
            .into_iter()
            .filter(|v| !matches!(v.0, VariableType::Any))
            .fold(empty_object, |a, b| a.merge(&b));

        Self(vt)
    }

    #[wasm_bindgen(js_name = "fromVariable")]
    pub fn from_variable(value: &JsVariable) -> Self {
        let vt = VariableType::from(value.var.to_value());
        Self(vt)
    }

    fn any() -> Self {
        Self(VariableType::Any)
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> VariableTypeJson {
        JsValue::from_serde(&self.0).unwrap().into()
    }

    #[wasm_bindgen(js_name = "clone")]
    pub fn clone_js(&self) -> Self {
        Self(self.0.clone())
    }

    #[wasm_bindgen(js_name = "toArray")]
    pub fn to_array(&self) -> Self {
        Self(VariableType::Array(Rc::new(self.0.clone())))
    }

    #[wasm_bindgen(js_name = "arrayItem")]
    pub fn array_item(&self) -> Self {
        match &self.0 {
            VariableType::Array(item) => Self((**item).clone()),
            _ => Self::any(),
        }
    }

    #[wasm_bindgen(js_name = "calculateType")]
    pub fn calculate_type(&self, source: &str) -> JsVariableType {
        if source.is_empty() {
            return Self(VariableType::Null);
        }

        let mut is = IntelliSense::new();
        let Some(mut type_data) = is.type_check(source, &self) else {
            return Self::any();
        };

        if type_data.is_empty() {
            return Self::any();
        }

        Self(type_data.remove(0).kind)
    }

    pub fn merge(&self, other: &JsVariableType) -> Self {
        Self(self.0.merge(&other.0))
    }

    pub fn set(&mut self, path: &str, value: &JsVariableType) {
        let variable_type = value.0.clone();
        if let Some(new_type) = self.0.dot_insert_detached(path, variable_type) {
            self.0 = new_type;
        }
    }

    #[wasm_bindgen(js_name = "setJson")]
    pub fn set_json(&mut self, path: &str, value: VariableTypeJson) {
        let js_value: JsValue = value.into();
        let variable_type = js_value.into_serde::<VariableType>().unwrap();

        self.0.dot_insert(path, variable_type);
    }

    pub fn get(&self, path: &str) -> Self {
        Self(self.0.dot(path).unwrap_or(VariableType::Any))
    }

    pub fn equal(&self, other: &JsVariableType) -> bool {
        self.0 == other.0
    }

    pub fn satisfies(&self, other: &JsVariableType) -> bool {
        self.0.satisfies(&other.0)
    }

    #[wasm_bindgen(js_name = "hash")]
    pub fn hash_js(&self) -> String {
        let mut s = DefaultHasher::new();
        self.hash(&mut s);
        s.finish().to_string()
    }

    #[wasm_bindgen(js_name = "typeCheck")]
    pub fn type_check(&self, source: &str) -> JsValue {
        if source.is_empty() {
            return JsValue::from(js_sys::Array::new());
        }

        let mut is = IntelliSense::new();

        let res = is.type_check(source, &self).unwrap_or_default();
        let rr = serde_json::to_value(res).unwrap_or_else(|_| Value::Array(Vec::new()));
        JsValue::from_serde(&rr).unwrap_or_else(|_| JsValue::from(js_sys::Array::new()))
    }

    #[wasm_bindgen(js_name = "typeCheckUnary")]
    pub fn type_check_unary(&self, source: &str) -> JsValue {
        if source.is_empty() {
            return JsValue::from(js_sys::Array::new());
        }

        let mut is = IntelliSense::new();

        let res = is.type_check_unary(source, &self).unwrap_or_default();
        let rr = serde_json::to_value(res).unwrap_or_else(|_| Value::Array(Vec::new()));
        JsValue::from_serde(&rr).unwrap_or_else(|_| JsValue::from(js_sys::Array::new()))
    }
}
