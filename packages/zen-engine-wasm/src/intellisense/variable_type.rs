use crate::intellisense::recursive_set::RecursiveSet;
use gloo_utils::format::JsValueSerdeExt;
use serde_json::Value;
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
pub struct JsVariableType {
    vt: Rc<VariableType>,
}

#[wasm_bindgen(js_class = "VariableType")]
impl JsVariableType {
    #[wasm_bindgen(constructor)]
    pub fn new(value: JsValue) -> Self {
        let serde_value = value.into_serde::<Value>().unwrap();
        Self {
            vt: Rc::new(VariableType::from(serde_value))
        }
    }

    #[wasm_bindgen(js_name = "fromJson")]
    pub fn from_json(value: VariableTypeJson) -> Self {
        let js_value: JsValue = value.into();
        let variable_type = js_value.into_serde::<VariableType>().unwrap();
        Self {
            vt: Rc::new(variable_type)
        }
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> VariableTypeJson {
        JsValue::from_serde(&self.vt).unwrap().into()
    }

    pub fn merge(&self, vt: &JsVariableType) -> Self {
        let vt = self.vt.merge(&vt.vt);
        Self { vt: Rc::new(vt) }
    }

    #[wasm_bindgen(js_name = "typeCheck")]
    pub fn type_check(&self, source: &str) -> JsValue {
        let mut is = IntelliSense::new();

        let res = is.type_check(source, &self.vt);
        let rr = serde_json::to_value(res);
        JsValue::from_serde(&rr.unwrap_or_default()).unwrap()
    }

    #[wasm_bindgen(js_name = "calculateType")]
    pub fn calculate_type(&self, source: &str) -> JsVariableType {
        let mut is = IntelliSense::new();
        let type_data = is.type_check(source, &self.vt);
        let Some(vt) = type_data.map(|s| s.first().map(|t| t.kind.clone())).flatten() else {
            return Self { vt: Rc::new(VariableType::Any) }
        };

        Self { vt }
    }

    #[wasm_bindgen(js_name = "cloneWithType")]
    pub fn clone_with_type(&self, path: &str, jvt: JsVariableType) -> JsVariableType {
        let self_vt = self.vt.as_ref().clone();
        let vt = jvt.vt.as_ref().clone();

        let new_vt = self_vt.set_type(path, vt);
        Self { vt: Rc::new(new_vt) }
    }

    #[wasm_bindgen(js_name = "typeCheckUnary")]
    pub fn type_check_unary(&self, source: &str) -> JsValue {
        let mut is = IntelliSense::new();

        let res = is.type_check_unary(source, &self.vt);
        let rr = serde_json::to_value(res);
        JsValue::from_serde(&rr.unwrap_or_default()).unwrap()
    }

    pub fn equal(&self, vt: &JsVariableType) -> bool {
        self.vt == vt.vt
    }

    pub fn satisfies(&self, vt: &JsVariableType) -> bool {
        self.vt.satisfies(&vt.vt)
    }
}