use crate::expression::error::JsIsolateError;
use gloo_utils::format::JsValueSerdeExt;
use serde_json::Value;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "evaluateExpression")]
pub fn evaluate_expression(expression: &str, context: JsValue) -> Result<JsValue, JsError> {
    let context_value: Value = context.into_serde()?;

    let result =
        zen_expression::evaluate_expression(expression, context_value.into()).map_err(|e| {
            let js_err: JsError = JsIsolateError::from(e).into();
            js_err
        })?;

    Ok(JsValue::from_serde(&result)?)
}

#[wasm_bindgen(js_name = "evaluateUnaryExpression")]
pub fn evaluate_unary_expression(expression: &str, context: JsValue) -> Result<bool, JsError> {
    let context_value: Value = context.into_serde()?;

    let result = zen_expression::evaluate_unary_expression(expression, context_value.into())
        .map_err(|e| {
            let js_err: JsError = JsIsolateError::from(e).into();
            js_err
        })?;

    Ok(result)
}
