use wasm_bindgen::prelude::wasm_bindgen;

pub mod expression;
mod intellisense;
mod variable;
mod completion;

#[wasm_bindgen(js_name = "isReady")]
pub fn is_ready() -> bool {
    true
}
