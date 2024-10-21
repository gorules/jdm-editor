use wasm_bindgen::prelude::wasm_bindgen;

pub(crate) mod recursive_set;
mod variable_type;

#[wasm_bindgen(typescript_custom_section)]
const TS_APPEND_CONTENT: &'static str = include_str!("variable_type.ts");
