use gloo_utils::format::JsValueSerdeExt;
use serde::Serialize;
use strum::IntoEnumIterator;
use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::JsValue;
use zen_expression::functions::{
    ClosureFunction, DateMethod, DeprecatedFunction, FunctionKind, InternalFunction, MethodKind,
};
use zen_expression::variable::VariableType;

mod function;
mod method;

pub struct CompletionInfo(String);

pub struct CompletionParamNames(Vec<String>);

pub struct CompletionDefinition {
    pub signature: String,
    pub method_for: Option<VariableType>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub enum CompletionKind {
    Variable,
    Function,
    Method,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Completion {
    #[serde(rename = "type")]
    kind: CompletionKind,
    label: String,
    #[serde(rename = "detail")]
    signature: String,
    info: String,
    boost: Option<i32>,
    method_for: Option<VariableType>,
}

#[wasm_bindgen(js_name = "getCompletions")]
pub fn get_completions() -> JsValue {
    let mut completions: Vec<Completion> = Default::default();

    completions.extend(
        InternalFunction::iter()
            .map(FunctionKind::Internal)
            .chain(DeprecatedFunction::iter().map(FunctionKind::Deprecated))
            .chain(ClosureFunction::iter().map(FunctionKind::Closure))
            .map(|fk| {
                let definition = CompletionDefinition::from(fk.clone());

                Completion {
                    kind: CompletionKind::Function,
                    label: fk.to_string(),
                    info: CompletionInfo::from(fk.clone()).0,
                    signature: definition.signature,
                    method_for: definition.method_for,
                    boost: match fk {
                        FunctionKind::Internal(_) => Some(10),
                        FunctionKind::Deprecated(_) => Some(-20),
                        FunctionKind::Closure(_) => None,
                    },
                }
            }),
    );

    completions.extend(DateMethod::iter().map(MethodKind::DateMethod).map(|mk| {
        let definition = CompletionDefinition::from(mk.clone());

        Completion {
            kind: CompletionKind::Method,
            label: mk.to_string(),
            info: CompletionInfo::from(mk.clone()).0,
            boost: None,
            signature: definition.signature,
            method_for: definition.method_for,
        }
    }));

    completions.push(Completion {
        kind: CompletionKind::Variable,
        label: "$root".to_owned(),
        signature: "Root variable".to_owned(),
        boost: Some(-10),
        info: "".to_owned(),
        method_for: None,
    });

    JsValue::from_serde(completions.as_slice()).unwrap()
}
