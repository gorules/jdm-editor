use wasm_bindgen::prelude::wasm_bindgen;

mod variable_type;
pub(crate) mod recursive_set;

#[wasm_bindgen(typescript_custom_section)]
const TS_APPEND_CONTENT: &'static str = include_str!("variable_type.ts");
