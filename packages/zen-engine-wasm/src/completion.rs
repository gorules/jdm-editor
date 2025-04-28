use gloo_utils::format::JsValueSerdeExt;
use serde::Serialize;
use strum::IntoEnumIterator;
use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::JsValue;
use zen_expression::functions::{
    ClosureFunction, DeprecatedFunction, FunctionKind, FunctionRegistry, InternalFunction,
};

struct CompletionInfo(String);

impl From<FunctionKind> for CompletionInfo {
    fn from(value: FunctionKind) -> Self {
        let m = |i: &str| CompletionInfo(i.to_owned());

        match value {
            FunctionKind::Internal(i) => match i {
                InternalFunction::Len => m("Returns the length of variable"),
                InternalFunction::Contains => m("Checks if variable contains a needle"),
                InternalFunction::Flatten => m("Flattens an array"),
                InternalFunction::Upper => m("Converts all characters in a string to uppercase"),
                InternalFunction::Lower => m("Converts all characters in a string to lowercase"),
                InternalFunction::Trim => m("Returns the string with leading and trailing whitespace removed"),
                InternalFunction::StartsWith => m("Returns true if the string starts with the specified prefix"),
                InternalFunction::EndsWith => m("Returns true if the string ends with the specified suffix"),
                InternalFunction::Matches => m("Returns true if the string matches the specified pattern"),
                InternalFunction::Extract => m("Extracts matching substrings according to a pattern"),
                InternalFunction::FuzzyMatch => m("Performs a fuzzy search of the needle in the haystack, and returns the match score(s)."),
                InternalFunction::Split => m("Splits a string into an array of substrings using the specified delimiter."),
                InternalFunction::Abs => m("Returns the absolute value of a number"),
                InternalFunction::Sum => m("Returns the sum of all elements in the input array."),
                InternalFunction::Avg => m("Calculates the average of all elements in the input array."),
                InternalFunction::Min => m("Returns the smallest of the elements in the input array."),
                InternalFunction::Max => m("Returns the largest of the elements in the input array."),
                InternalFunction::Rand => m("Generates a random number between 0 (inclusive) and max (inclusive)."),
                InternalFunction::Median => m("Calculates the median value of all elements in the input array."),
                InternalFunction::Mode => m("Finds the mode(s) of the input array, which are the most frequent element(s)."),
                InternalFunction::Floor => m("Rounds a number down to the nearest integer."),
                InternalFunction::Ceil => m("Rounds a number up to the nearest integer."),
                InternalFunction::Round => m("Rounds a number to a specified number of decimal places."),
                InternalFunction::IsNumeric => m("Checks if the given value is of a numeric type."),
                InternalFunction::String => m("Converts the given value to a string."),
                InternalFunction::Number => m("Converts the given value to a number."),
                InternalFunction::Bool => m("Converts the given value to a boolean."),
                InternalFunction::Type => m("Returns a string representing the data type of the value."),
                InternalFunction::Keys => m("Returns an array of a given object's own enumerable property names."),
                InternalFunction::Values => m("Returns an array of a given object's own enumerable property values."),
            },
            FunctionKind::Deprecated(d) => match d {
                DeprecatedFunction::Date => m("Converts a numeric timestamp to a unix timestamp."),
                DeprecatedFunction::Time => m("Extracts the time from a numeric timestamp and returns it as a seconds from beginning of day."),
                DeprecatedFunction::Duration => m("e.g. 1h30min"),
                DeprecatedFunction::Year => m("Extracts the year from a given timestamp."),
                DeprecatedFunction::DayOfWeek => m("Gets the day of the week from a given timestamp, where Sunday might be 0."),
                DeprecatedFunction::DayOfMonth => m("Extracts the day of the month from a given timestamp."),
                DeprecatedFunction::DayOfYear => m("Gets the day of the year from a given timestamp."),
                DeprecatedFunction::WeekOfYear => m("Calculates the week of the year from a given timestamp."),
                DeprecatedFunction::MonthOfYear => m("Extracts the month from a given timestamp, typically with January as 1."),
                DeprecatedFunction::MonthString => m("Converts the month from a given timestamp into its string representation (e.g., 'Jan')."),
                DeprecatedFunction::DateString => m("Converts a timestamp to a human-readable date string."),
                DeprecatedFunction::WeekdayString => m("Converts the day of the week from a given timestamp into its string representation (e.g., 'Mon')."),
                DeprecatedFunction::StartOf => m("Returns the timestamp representing the start of a specified unit (e.g., day, month, year) based on a given timestamp."),
                DeprecatedFunction::EndOf => m("Returns the timestamp representing the end of a specified unit (e.g., day, month, year) based on a given timestamp."),
            },
            FunctionKind::Closure(c) => match c {
                ClosureFunction::All => m("Checks if all elements in the array satisfy the condition defined in the callback."),
                ClosureFunction::None => m("Checks if no elements in the array satisfy the condition defined in the callback."),
                ClosureFunction::Some => m("Checks if at least one element in the array satisfies the condition defined in the callback."),
                ClosureFunction::One => m("Checks if exactly one element in the array satisfies the condition defined in the callback."),
                ClosureFunction::Filter => m("Creates a new array with all elements that satisfy the condition defined in the callback."),
                ClosureFunction::Map => m("Creates a new array populated with the results of calling the provided function on every element in the calling array."),
                ClosureFunction::FlatMap => m("First maps each element using a mapping function, then flattens the result into a new array."),
                ClosureFunction::Count => m("Counts the number of elements in the array that satisfy the condition defined in the callback."),
            }
        }
    }
}

struct CompletionParamNames(Vec<String>);

impl From<FunctionKind> for CompletionParamNames {
    fn from(value: FunctionKind) -> Self {
        let m = |a: &[&str]| CompletionParamNames(a.iter().map(|s| (*s).to_owned()).collect());

        match value {
            FunctionKind::Internal(i) => match i {
                InternalFunction::Len => m(&["var"]),
                InternalFunction::Contains => m(&["haystack", "needle"]),
                InternalFunction::Flatten => m(&["arr"]),
                InternalFunction::Upper => m(&["str"]),
                InternalFunction::Lower => m(&["str"]),
                InternalFunction::Trim => m(&["str"]),
                InternalFunction::StartsWith => m(&["str", "prefix"]),
                InternalFunction::EndsWith => m(&["str", "suffix"]),
                InternalFunction::Matches => m(&["str", "pattern"]),
                InternalFunction::Extract => m(&["str", "pattern"]),
                InternalFunction::FuzzyMatch => m(&["haystack", "needle"]),
                InternalFunction::Split => m(&["str", "delimiter"]),
                InternalFunction::Abs => m(&["num"]),
                InternalFunction::Sum => m(&["arr"]),
                InternalFunction::Avg => m(&["arr"]),
                InternalFunction::Min => m(&["arr"]),
                InternalFunction::Max => m(&["arr"]),
                InternalFunction::Rand => m(&["max"]),
                InternalFunction::Median => m(&["arr"]),
                InternalFunction::Mode => m(&["arr"]),
                InternalFunction::Floor => m(&["num"]),
                InternalFunction::Ceil => m(&["num"]),
                InternalFunction::Round => m(&["num"]),
                InternalFunction::IsNumeric => m(&["value"]),
                InternalFunction::String => m(&["value"]),
                InternalFunction::Number => m(&["value"]),
                InternalFunction::Bool => m(&["value"]),
                InternalFunction::Type => m(&["value"]),
                InternalFunction::Keys => m(&["obj"]),
                InternalFunction::Values => m(&["obj"]),
            },
            FunctionKind::Deprecated(d) => match d {
                DeprecatedFunction::Date => m(&["timestamp"]),
                DeprecatedFunction::Time => m(&["timestamp"]),
                DeprecatedFunction::Duration => m(&["duration"]),
                DeprecatedFunction::Year => m(&["timestamp"]),
                DeprecatedFunction::DayOfWeek => m(&["timestamp"]),
                DeprecatedFunction::DayOfMonth => m(&["timestamp"]),
                DeprecatedFunction::DayOfYear => m(&["timestamp"]),
                DeprecatedFunction::WeekOfYear => m(&["timestamp"]),
                DeprecatedFunction::MonthOfYear => m(&["timestamp"]),
                DeprecatedFunction::MonthString => m(&["timestamp"]),
                DeprecatedFunction::DateString => m(&["timestamp"]),
                DeprecatedFunction::WeekdayString => m(&["timestamp"]),
                DeprecatedFunction::StartOf => m(&["timestamp", "unit"]),
                DeprecatedFunction::EndOf => m(&["timestamp", "unit"]),
            },
            FunctionKind::Closure(_) => m(&[]),
        }
    }
}

struct CompletionSignature(String);

impl CompletionSignature {
    pub fn new(sig: &str) -> Self {
        CompletionSignature(sig.to_owned())
    }
}

impl From<FunctionKind> for CompletionSignature {
    fn from(value: FunctionKind) -> Self {
        match value {
            FunctionKind::Internal(_) | FunctionKind::Deprecated(_) => {
                let param_names: CompletionParamNames = value.clone().into();
                let Some(definition) = FunctionRegistry::get_definition(&value) else {
                    return CompletionSignature::new("");
                };

                let optional_params = definition.optional_parameters();
                let required_params = definition.required_parameters();
                let total_params = optional_params + required_params;

                let s = (0..total_params)
                    .map(|i| {
                        let param_name = param_names.0.get(i).map(|s| s.as_str()).unwrap_or("var");
                        let osym = match i >= required_params {
                            true => "?",
                            false => "",
                        };

                        let param_type = definition.param_type(i);

                        format!("{param_name}{osym}: `{param_type}`")
                    })
                    .collect::<Vec<_>>()
                    .join(", ");

                CompletionSignature(format!("({s}) -> {}", definition.return_type()))
            }
            FunctionKind::Closure(c) => match c {
                ClosureFunction::All => CompletionSignature::new(
                    "`<T>`(array: `T[]`, callback: `Callback<T, boolean>`) -> `boolean`",
                ),
                ClosureFunction::None => CompletionSignature::new(
                    "`<T>`(array: `T[]`, callback: `Callback<T, boolean>`) -> `boolean`",
                ),
                ClosureFunction::Some => CompletionSignature::new(
                    "`<T>`(array: `T[]`, callback: `Callback<T, boolean>`) -> `boolean`",
                ),
                ClosureFunction::One => CompletionSignature::new(
                    "`<T>`(array: `T[]`, callback: `Callback<T, boolean>`) -> `boolean`",
                ),
                ClosureFunction::Filter => CompletionSignature::new(
                    "`<T>`(array: `T[]`, callback: `Callback<T, boolean>`) -> `T[]`",
                ),
                ClosureFunction::Map => CompletionSignature::new(
                    "`<T, U>`(array: `T[]`, callback: `Callback<T, U>`) -> `U[]`",
                ),
                ClosureFunction::FlatMap => CompletionSignature::new(
                    "`<T, U>`(array: `T[]`, callback: `Callback<T, U[]>`) -> `U[]`",
                ),
                ClosureFunction::Count => CompletionSignature::new(
                    "`<T>`(array: `T[]`, callback: `Callback<T, boolean>`) -> `number`",
                ),
            },
        }
    }
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub enum CompletionKind {
    Variable,
    Function,
}

#[derive(Serialize)]
pub struct Completion {
    #[serde(rename = "type")]
    kind: CompletionKind,
    label: String,
    #[serde(rename = "detail")]
    signature: String,
    info: String,
    boost: Option<i32>,
}

#[wasm_bindgen(js_name = "getCompletions")]
pub fn get_completions() -> JsValue {
    let mut completions = InternalFunction::iter()
        .map(FunctionKind::Internal)
        .chain(DeprecatedFunction::iter().map(FunctionKind::Deprecated))
        .chain(ClosureFunction::iter().map(FunctionKind::Closure))
        .map(|fk| Completion {
            kind: CompletionKind::Function,
            label: fk.to_string(),
            signature: CompletionSignature::from(fk.clone()).0,
            info: CompletionInfo::from(fk.clone()).0,
            boost: match fk {
                FunctionKind::Internal(_) => Some(10),
                FunctionKind::Deprecated(_) => Some(-20),
                FunctionKind::Closure(_) => None,
            },
        })
        .collect::<Vec<_>>();

    completions.push(Completion {
        kind: CompletionKind::Variable,
        label: "$root".to_owned(),
        signature: "Root variable".to_owned(),
        boost: Some(-10),
        info: "".to_owned(),
    });

    JsValue::from_serde(completions.as_slice()).unwrap()
}
