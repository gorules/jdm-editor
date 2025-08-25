use wasm_bindgen::prelude::wasm_bindgen;

mod completion;
pub mod expression;
mod intellisense;
mod variable;
mod variable_deser;

#[wasm_bindgen(js_name = "isReady")]
pub fn is_ready() -> bool {
    true
}
