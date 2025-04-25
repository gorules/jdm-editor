use serde::Serialize;
use std::ops::Deref;
use wasm_bindgen::JsError;
use zen_expression::compiler::CompilerError;
use zen_expression::lexer::LexerError;
use zen_expression::parser::ParserError;
use zen_expression::vm::VMError;
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

impl From<LexerError> for JsIsolateError {
    fn from(source: LexerError) -> Self {
        Self(IsolateError::LexerError { source })
    }
}

impl From<ParserError> for JsIsolateError {
    fn from(source: ParserError) -> Self {
        Self(IsolateError::ParserError { source })
    }
}

impl From<CompilerError> for JsIsolateError {
    fn from(source: CompilerError) -> Self {
        Self(IsolateError::CompilerError { source })
    }
}

impl From<VMError> for JsIsolateError {
    fn from(source: VMError) -> Self {
        Self(IsolateError::VMError { source })
    }
}

impl From<JsIsolateError> for JsError {
    fn from(value: JsIsolateError) -> Self {
        let maybe_contents = serde_json::from_str::<String>(value.to_string().as_str());
        let error_message = maybe_contents.unwrap_or_else(|_| value.to_string());

        Self::new(error_message.as_str())
    }
}
