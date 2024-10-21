use bumpalo::Bump;
use gloo_utils::format::JsValueSerdeExt;
use serde_json::Value;
use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::JsValue;
use zen_expression::compiler::Compiler;
use zen_expression::lexer::Lexer;
use zen_expression::parser::Parser;
use zen_expression::IsolateError;

#[wasm_bindgen(js_name = "validateUnaryExpression")]
pub fn validate_unary_expression(expression: &str) -> JsValue {
    let Some(err) = get_unary_error(expression) else {
        return JsValue::NULL;
    };

    JsValue::from_serde(&err).unwrap()
}

#[wasm_bindgen(js_name = "validateExpression")]
pub fn validate_expression(expression: &str) -> JsValue {
    let Some(err) = get_error(expression) else {
        return JsValue::NULL;
    };

    JsValue::from_serde(&err).unwrap()
}

fn get_unary_error(expression: &str) -> Option<Value> {
    let mut lexer = Lexer::new();
    let tokens = match lexer.tokenize(expression) {
        Err(e) => {
            return serde_json::to_value(IsolateError::LexerError { source: e })
                .ok()
                .into()
        }
        Ok(tokens) => tokens,
    };

    let bump = Bump::new();
    let parser = match Parser::try_new(tokens, &bump) {
        Err(e) => {
            return serde_json::to_value(IsolateError::ParserError { source: e })
                .ok()
                .into()
        }
        Ok(p) => p.unary(),
    };

    let parser_result = parser.parse();
    match parser_result.error() {
        Err(e) => {
            return serde_json::to_value(IsolateError::ParserError { source: e })
                .ok()
                .into()
        }
        Ok(n) => n,
    };

    let mut compiler = Compiler::new();
    if let Err(e) = compiler.compile(parser_result.root) {
        return serde_json::to_value(IsolateError::CompilerError { source: e })
            .ok()
            .into();
    }

    None
}

fn get_error(expression: &str) -> Option<Value> {
    let mut lexer = Lexer::new();
    let tokens = match lexer.tokenize(expression) {
        Err(e) => {
            return serde_json::to_value(IsolateError::LexerError { source: e })
                .ok()
                .into()
        }
        Ok(tokens) => tokens,
    };

    let bump = Bump::new();
    let parser = match Parser::try_new(tokens, &bump) {
        Err(e) => {
            return serde_json::to_value(IsolateError::ParserError { source: e })
                .ok()
                .into()
        }
        Ok(p) => p.standard(),
    };

    let parser_result = parser.parse();
    match parser_result.error() {
        Err(e) => {
            return serde_json::to_value(IsolateError::ParserError { source: e })
                .ok()
                .into()
        }
        Ok(n) => n,
    };

    let mut compiler = Compiler::new();
    if let Err(e) = compiler.compile(parser_result.root) {
        return serde_json::to_value(IsolateError::CompilerError { source: e })
            .ok()
            .into();
    }

    None
}
