use gloo_utils::format::JsValueSerdeExt;
use serde_json::Value;
use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::JsValue;
use zen_expression::intellisense::IntelliSense;
use zen_expression::variable::VariableType;

#[wasm_bindgen(js_name = "VariableType")]
pub struct JsVariableType {
    vt: VariableType,
}

#[wasm_bindgen(js_class = "VariableType")]
impl JsVariableType {
    #[wasm_bindgen(constructor)]
    pub fn new(value: JsValue) -> Self {
        let serde_value = value.into_serde::<Value>().unwrap();
        Self {
            vt: VariableType::from(serde_value)
        }
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.vt).unwrap()
    }

    pub fn merge(&self, vt: &JsVariableType) -> Self {
        let vt = self.vt.merge(&vt.vt);
        Self { vt }
    }

    #[wasm_bindgen(js_name = "typeCheck")]
    pub fn type_check(&self, source: &str) -> JsValue {
        let mut is = IntelliSense::new();

        let res = is.type_check(source, &self.vt);
        let rr = serde_json::to_value(res);
        JsValue::from_serde(&rr.unwrap_or_default()).unwrap()
    }

    #[wasm_bindgen(js_name = "typeCheckUnary")]
    pub fn type_check_unary(&self, source: &str) -> JsValue {
        let mut is = IntelliSense::new();

        let res = is.type_check_unary(source, &self.vt);
        let rr = serde_json::to_value(res);
        JsValue::from_serde(&rr.unwrap_or_default()).unwrap()
    }
}