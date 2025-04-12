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
    var: Variable,
}

#[wasm_bindgen(js_class = "Variable")]
impl JsVariable {
    #[wasm_bindgen(constructor)]
    pub fn new(js_value: JsValue) -> Self {
        let value: Value = js_value.into_serde().unwrap();

        Self { var: value.into() }
    }

    #[wasm_bindgen(js_name = "cloneWithReference")]
    pub fn clone_with_reference(&self, js_value: JsValue) -> Self {
        let value: Value = js_value.into_serde().unwrap();

        let var = self.var.depth_clone(1);
        var.dot_insert("$", value.into());
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
}
