use std::ops::Deref;
use serde::Serialize;
use wasm_bindgen::JsError;
use zen_expression::IsolateError;

#[derive(Debug, Serialize)]
pub(crate) struct JsIsolateError(IsolateError);

impl Deref for JsIsolateError {
    type Target = IsolateError;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<IsolateError> for JsIsolateError {
    fn from(value: IsolateError) -> Self {
        Self(value)
    }
}

impl From<JsIsolateError> for JsError {
    fn from(value: JsIsolateError) -> Self {
        let maybe_contents = serde_json::from_str::<String>(value.to_string().as_str());
        let error_message = maybe_contents.unwrap_or_else(|_| value.to_string());

        Self::new(error_message.as_str())
    }
}
