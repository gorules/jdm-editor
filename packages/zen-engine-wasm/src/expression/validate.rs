use crate::expression::error::JsIsolateError;
use bumpalo::Bump;
use gloo_utils::format::JsValueSerdeExt;
use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::JsValue;
use zen_expression::compiler::Compiler;
use zen_expression::lexer::Lexer;
use zen_expression::parser::Parser;
use zen_expression::ExpressionKind;

#[wasm_bindgen(js_name = "validateExpression")]
pub fn validate_expression(expression: &str) -> JsValue {
    let Err(err) = get_error(ExpressionKind::Standard, expression) else {
        return JsValue::NULL;
    };

    JsValue::from_serde(&err).unwrap()
}

#[wasm_bindgen(js_name = "validateUnaryExpression")]
pub fn validate_unary_expression(expression: &str) -> JsValue {
    let Err(err) = get_error(ExpressionKind::Unary, expression) else {
        return JsValue::NULL;
    };

    JsValue::from_serde(&err).unwrap()
}

#[wasm_bindgen(js_name = "generateAst")]
pub fn generate_ast(expression: &str) -> String {
    ast(ExpressionKind::Standard, expression).unwrap_or_else(|err| err.to_string())
}

#[wasm_bindgen(js_name = "generateAstUnary")]
pub fn generate_ast_unary(expression: &str) -> String {
    ast(ExpressionKind::Unary, expression).unwrap_or_else(|err| err.to_string())
}

fn ast(kind: ExpressionKind, expression: &str) -> Result<String, JsIsolateError> {
    let bump = Bump::new();

    let mut lexer = Lexer::new();
    let tokens = lexer.tokenize(expression)?;

    let base_parser = Parser::try_new(tokens, &bump)?;
    let parser_result = match kind {
        ExpressionKind::Unary => base_parser.unary().parse(),
        ExpressionKind::Standard => base_parser.standard().parse(),
    };

    Ok(format!("{:#?}", parser_result.root))
}

fn get_error(kind: ExpressionKind, expression: &str) -> Result<(), JsIsolateError> {
    let bump = Bump::new();

    let mut lexer = Lexer::new();
    let tokens = lexer.tokenize(expression)?;

    let base_parser = Parser::try_new(tokens, &bump)?;
    let parser_result = match kind {
        ExpressionKind::Unary => base_parser.unary().parse(),
        ExpressionKind::Standard => base_parser.standard().parse(),
    };

    parser_result.error()?;

    let mut compiler = Compiler::new();
    compiler.compile(parser_result.root)?;

    Ok(())
}
