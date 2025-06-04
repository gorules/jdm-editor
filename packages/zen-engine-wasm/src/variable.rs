use crate::expression::error::JsIsolateError;
use gloo_utils::format::JsValueSerdeExt;
use serde_json::Value;
use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::{JsError, JsValue};
use zen_expression::Variable;

/// JsVariable is a wrapper around JsValue that caches
/// the deserialized serde_json Value to avoid repeated
/// deserialization.
#[wasm_bindgen(js_name = "Variable")]
pub struct JsVariable {
    pub(crate) var: Variable,
}

#[wasm_bindgen(js_class = "Variable")]
impl JsVariable {
    #[wasm_bindgen(constructor)]
    pub fn new(js_value: JsValue) -> Self {
        let value: Value = js_value.into_serde().unwrap();

        Self { var: value.into() }
    }

    #[wasm_bindgen(js_name = "cloneWith")]
    pub fn clone_with(&self, key: &str, js_value: JsValue) -> Self {
        let depth = key.chars().filter(|c| *c == '.').count() + 1;
        let value: Value = js_value.into_serde().unwrap();

        let var = self.var.depth_clone(depth);
        var.dot_insert(key, value.into());
        Self { var }
    }

    #[wasm_bindgen(js_name = "evaluateExpression")]
    pub fn evaluate_expression(&self, expression: &str) -> Result<JsValue, JsError> {
        let result =
            zen_expression::evaluate_expression(expression, self.var.clone()).map_err(|e| {
                let js_err: JsError = JsIsolateError::from(e).into();
                js_err
            })?;

        Ok(JsValue::from_serde(&result)?)
    }

    #[wasm_bindgen(js_name = "evaluateUnaryExpression")]
    pub fn evaluate_unary_expression(&self, expression: &str) -> Result<bool, JsError> {
        let result = zen_expression::evaluate_unary_expression(expression, self.var.clone())
            .map_err(|e| {
                let js_err: JsError = JsIsolateError::from(e).into();
                js_err
            })?;

        Ok(result)
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> Result<JsValue, JsError> {
        Ok(JsValue::from_serde(&self.var)?)
    }

    #[wasm_bindgen(js_name = "get")]
    pub fn get(&self, js_value: JsValue) -> Self {
        let value: Value = js_value.into_serde().unwrap();

        match (&self.var, value) {
            (Variable::Object(_), Value::String(key)) => {
                let Some(part) = self.var.dot(key.as_str()) else {
                    return null();
                };

                Self { var: part }
            }
            (Variable::Array(arr), Value::Number(index)) => {
                let Some(index) = index.as_u64() else {
                    return null();
                };

                let arr_ref = arr.borrow();
                let Some(var) = arr_ref.get(index as usize) else {
                    return null();
                };

                Self { var: var.clone() }
            }
            _ => null(),
        }
    }
}

fn null() -> JsVariable {
    JsVariable {
        var: Variable::Null,
    }
}
