use wasm_bindgen::prelude::wasm_bindgen;

mod expression;
mod intellisense;

#[wasm_bindgen(js_name = "isReady")]
pub fn is_ready() -> bool {
    true
}
