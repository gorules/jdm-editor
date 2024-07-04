use gloo_utils::format::JsValueSerdeExt;
use serde_json::Value;
use wasm_bindgen::prelude::*;
use crate::expression::error::JsIsolateError;

#[wasm_bindgen(js_name = "evaluateExpression")]
pub fn evaluate_expression(expression: &str, context: JsValue) -> Result<JsValue, JsError> {
    let context_value = context.into_serde()?;

    let result = zen_expression::evaluate_expression(expression, &context_value).map_err(|e| {
        let js_err: JsError = JsIsolateError::from(e).into();
        js_err
    })?;

    Ok(JsValue::from_serde(&result)?)
}

#[wasm_bindgen(js_name = "evaluateUnaryExpression")]
pub fn evaluate_unary_expression(expression: &str, context: JsValue) -> Result<bool, JsError> {
    let context_value: Value = context.into_serde()?;
    if !context_value.as_object().map(|o| o.contains_key("$")).unwrap_or(false) {
        return Err(JsError::new("Missing $ reference for unary evaluation."));
    }

    let result = zen_expression::evaluate_unary_expression(expression, &context_value).map_err(|e| {
        let js_err: JsError = JsIsolateError::from(e).into();
        js_err
    })?;

    Ok(result)
}

#[wasm_bindgen(js_name = "renderTemplate")]
pub fn render_template(template: &str, context: JsValue) -> Result<JsValue, JsError> {
    let context_value = context.into_serde()?;

    let result = zen_tmpl::render(template, &context_value).map_err(|e| {
        JsError::new(e.to_string().as_str())
    })?;

    Ok(JsValue::from_serde(&result)?)
}