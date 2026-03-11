use bumpalo::Bump;
use gloo_utils::format::JsValueSerdeExt;
use rust_decimal::prelude::ToPrimitive;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
use zen_expression::lexer::{Bracket, Lexer};
use zen_expression::parser::{Node, Parser};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum SimpleOperator {
    Any,
    Eq,
    Neq,
    Gt,
    Gte,
    Lt,
    Lte,
    In,
    NotIn,
    Between,
    Null,
    NotNull,
    StartsWith,
    EndsWith,
    Contains,
    DateAfter,
    DateBefore,
    DateSame,
    DateSameOrAfter,
    DateSameOrBefore,
    DateIsToday,
    TimeGt,
    TimeGte,
    TimeLt,
    TimeLte,
    DayOfWeekIn,
    QuarterIn,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum SimpleValue {
    String {
        value: String,
    },
    Number {
        value: f64,
    },
    Boolean {
        value: bool,
    },
    StringArray {
        values: Vec<String>,
    },
    NumberArray {
        values: Vec<f64>,
    },
    IntArray {
        values: Vec<i32>,
    },
    Interval {
        left: f64,
        right: f64,
        #[serde(rename = "leftInclusive")]
        left_inclusive: bool,
        #[serde(rename = "rightInclusive")]
        right_inclusive: bool,
    },
    Date {
        value: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        granularity: Option<String>,
    },
    Time {
        hour: i32,
        minute: i32,
    },
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(tag = "kind", rename_all = "camelCase")]
pub enum ExpressionBuilderData {
    Simple {
        operator: SimpleOperator,
        value: Option<SimpleValue>,
    },
    Complex {
        raw: String,
    },
}

#[wasm_bindgen]
pub struct ExpressionBuilder {
    data: ExpressionBuilderData,
    raw: String,
}

#[wasm_bindgen]
impl ExpressionBuilder {
    #[wasm_bindgen(js_name = "parseUnary")]
    pub fn parse_unary(expression: &str) -> ExpressionBuilder {
        let trimmed = expression.trim();

        if trimmed.is_empty() || trimmed == "-" {
            return ExpressionBuilder {
                data: ExpressionBuilderData::Simple {
                    operator: SimpleOperator::Any,
                    value: None,
                },
                raw: expression.to_string(),
            };
        }

        let bump = Bump::new();
        let mut lexer = Lexer::new();

        let tokens = match lexer.tokenize(expression) {
            Ok(t) => t,
            Err(_) => return ExpressionBuilder::complex(expression),
        };

        let parser = match Parser::try_new(tokens, &bump) {
            Ok(p) => p,
            Err(_) => return ExpressionBuilder::complex(expression),
        };

        let result = parser.unary().parse();
        if result.error().is_err() {
            return ExpressionBuilder::complex(expression);
        }

        let ast = unwrap_bool_function(result.root);
        match ast_to_business(ast) {
            Some(data) => ExpressionBuilder {
                data,
                raw: expression.to_string(),
            },
            None => ExpressionBuilder::complex(expression),
        }
    }

    #[wasm_bindgen]
    pub fn serialize(&self) -> String {
        match &self.data {
            ExpressionBuilderData::Complex { raw } => raw.clone(),
            ExpressionBuilderData::Simple { operator, value } => serialize_simple(operator, value),
        }
    }

    #[wasm_bindgen(js_name = "toJson")]
    pub fn to_json(&self) -> JsValue {
        JsValue::from_serde(&self.data).unwrap()
    }

    #[wasm_bindgen(js_name = "fromJson")]
    pub fn from_json(json: JsValue) -> Result<ExpressionBuilder, JsError> {
        let data: ExpressionBuilderData = json
            .into_serde()
            .map_err(|e| JsError::new(&e.to_string()))?;

        let raw = match &data {
            ExpressionBuilderData::Complex { raw } => raw.clone(),
            ExpressionBuilderData::Simple { operator, value } => serialize_simple(operator, value),
        };

        Ok(ExpressionBuilder { data, raw })
    }

    #[wasm_bindgen(getter, js_name = "isSimple")]
    pub fn is_simple(&self) -> bool {
        matches!(self.data, ExpressionBuilderData::Simple { .. })
    }

    #[wasm_bindgen(getter, js_name = "isComplex")]
    pub fn is_complex(&self) -> bool {
        matches!(self.data, ExpressionBuilderData::Complex { .. })
    }

    #[wasm_bindgen(getter)]
    pub fn raw(&self) -> String {
        self.raw.clone()
    }

    fn complex(expression: &str) -> ExpressionBuilder {
        ExpressionBuilder {
            data: ExpressionBuilderData::Complex {
                raw: expression.to_string(),
            },
            raw: expression.to_string(),
        }
    }
}

fn unwrap_bool_function<'a>(node: &'a Node<'a>) -> &'a Node<'a> {
    if let Node::FunctionCall { kind, arguments } = node {
        if kind.to_string() == "bool" && arguments.len() == 1 {
            return arguments[0];
        }
    }
    node
}

fn is_root(node: &Node) -> bool {
    matches!(node, Node::Root | Node::Pointer)
        || matches!(node, Node::Identifier(name) if *name == "$")
}

fn is_date_of_root(node: &Node) -> bool {
    if let Node::FunctionCall { kind, arguments } = node {
        if kind.to_string() == "d" && arguments.len() == 1 && is_root(arguments[0]) {
            return true;
        }
    }
    false
}

fn extract_date_string(node: &Node) -> Option<String> {
    if let Node::String(s) = node {
        return Some(s.to_string());
    }
    if let Node::FunctionCall { kind, arguments } = node {
        if kind.to_string() == "d" && arguments.len() == 1 {
            if let Node::String(s) = arguments[0] {
                return Some(s.to_string());
            }
        }
    }
    None
}

fn extract_granularity(node: &Node) -> Option<String> {
    if let Node::String(s) = node {
        return Some(s.to_string());
    }
    None
}

fn ast_to_business(node: &Node) -> Option<ExpressionBuilderData> {
    match node {
        Node::Null => Some(ExpressionBuilderData::Simple {
            operator: SimpleOperator::Null,
            value: None,
        }),

        Node::Bool(v) => Some(ExpressionBuilderData::Simple {
            operator: SimpleOperator::Eq,
            value: Some(SimpleValue::Boolean { value: *v }),
        }),

        Node::Number(n) => Some(ExpressionBuilderData::Simple {
            operator: SimpleOperator::Eq,
            value: Some(SimpleValue::Number { value: n.to_f64()? }),
        }),

        Node::String(s) => Some(ExpressionBuilderData::Simple {
            operator: SimpleOperator::Eq,
            value: Some(SimpleValue::String {
                value: s.to_string(),
            }),
        }),

        Node::Array(items) => {
            if items.is_empty() {
                return Some(ExpressionBuilderData::Simple {
                    operator: SimpleOperator::In,
                    value: None,
                });
            }
            if let Some(strings) = extract_string_array(items) {
                return Some(ExpressionBuilderData::Simple {
                    operator: SimpleOperator::In,
                    value: Some(SimpleValue::StringArray { values: strings }),
                });
            }
            if let Some(numbers) = extract_number_array(items) {
                return Some(ExpressionBuilderData::Simple {
                    operator: SimpleOperator::In,
                    value: Some(SimpleValue::NumberArray { values: numbers }),
                });
            }
            None
        }

        Node::Interval {
            left,
            right,
            left_bracket,
            right_bracket,
        } => {
            let left_num = extract_number(left)?;
            let right_num = extract_number(right)?;
            Some(ExpressionBuilderData::Simple {
                operator: SimpleOperator::Between,
                value: Some(SimpleValue::Interval {
                    left: left_num,
                    right: right_num,
                    left_inclusive: *left_bracket == Bracket::LeftSquareBracket,
                    right_inclusive: *right_bracket == Bracket::RightSquareBracket,
                }),
            })
        }

        Node::Binary {
            left,
            operator,
            right,
        } => {
            let op_str = operator.to_string();

            if let Some(result) = try_parse_time_comparison(node) {
                return Some(result);
            }
            if let Some(result) = try_parse_weekday_in(node) {
                return Some(result);
            }
            if let Some(result) = try_parse_quarter_in(node) {
                return Some(result);
            }

            if is_root(left) {
                match op_str.as_str() {
                    "==" => {
                        if matches!(right, Node::Null) {
                            return Some(ExpressionBuilderData::Simple {
                                operator: SimpleOperator::Null,
                                value: None,
                            });
                        }
                        let value = node_to_value(right)?;
                        Some(ExpressionBuilderData::Simple {
                            operator: SimpleOperator::Eq,
                            value: Some(value),
                        })
                    }
                    "!=" => {
                        if matches!(right, Node::Null) {
                            return Some(ExpressionBuilderData::Simple {
                                operator: SimpleOperator::NotNull,
                                value: None,
                            });
                        }
                        let value = node_to_value(right)?;
                        Some(ExpressionBuilderData::Simple {
                            operator: SimpleOperator::Neq,
                            value: Some(value),
                        })
                    }
                    ">" => {
                        let value = node_to_value(right)?;
                        Some(ExpressionBuilderData::Simple {
                            operator: SimpleOperator::Gt,
                            value: Some(value),
                        })
                    }
                    ">=" => {
                        let value = node_to_value(right)?;
                        Some(ExpressionBuilderData::Simple {
                            operator: SimpleOperator::Gte,
                            value: Some(value),
                        })
                    }
                    "<" => {
                        let value = node_to_value(right)?;
                        Some(ExpressionBuilderData::Simple {
                            operator: SimpleOperator::Lt,
                            value: Some(value),
                        })
                    }
                    "<=" => {
                        let value = node_to_value(right)?;
                        Some(ExpressionBuilderData::Simple {
                            operator: SimpleOperator::Lte,
                            value: Some(value),
                        })
                    }
                    "in" => {
                        if let Node::Array(items) = right {
                            if items.is_empty() {
                                return Some(ExpressionBuilderData::Simple {
                                    operator: SimpleOperator::In,
                                    value: None,
                                });
                            }
                            if let Some(strings) = extract_string_array(items) {
                                return Some(ExpressionBuilderData::Simple {
                                    operator: SimpleOperator::In,
                                    value: Some(SimpleValue::StringArray { values: strings }),
                                });
                            }
                            if let Some(numbers) = extract_number_array(items) {
                                return Some(ExpressionBuilderData::Simple {
                                    operator: SimpleOperator::In,
                                    value: Some(SimpleValue::NumberArray { values: numbers }),
                                });
                            }
                        }
                        if let Node::Interval {
                            left: l,
                            right: r,
                            left_bracket,
                            right_bracket,
                        } = right
                        {
                            let left_num = extract_number(l)?;
                            let right_num = extract_number(r)?;
                            return Some(ExpressionBuilderData::Simple {
                                operator: SimpleOperator::Between,
                                value: Some(SimpleValue::Interval {
                                    left: left_num,
                                    right: right_num,
                                    left_inclusive: *left_bracket == Bracket::LeftSquareBracket,
                                    right_inclusive: *right_bracket == Bracket::RightSquareBracket,
                                }),
                            });
                        }
                        None
                    }
                    "not in" => {
                        if let Node::Array(items) = right {
                            if items.is_empty() {
                                return Some(ExpressionBuilderData::Simple {
                                    operator: SimpleOperator::NotIn,
                                    value: None,
                                });
                            }
                            if let Some(strings) = extract_string_array(items) {
                                return Some(ExpressionBuilderData::Simple {
                                    operator: SimpleOperator::NotIn,
                                    value: Some(SimpleValue::StringArray { values: strings }),
                                });
                            }
                            if let Some(numbers) = extract_number_array(items) {
                                return Some(ExpressionBuilderData::Simple {
                                    operator: SimpleOperator::NotIn,
                                    value: Some(SimpleValue::NumberArray { values: numbers }),
                                });
                            }
                        }
                        None
                    }
                    _ => None,
                }
            } else if is_root(right) {
                match op_str.as_str() {
                    ">" => {
                        let value = node_to_value(left)?;
                        Some(ExpressionBuilderData::Simple {
                            operator: SimpleOperator::Lt,
                            value: Some(value),
                        })
                    }
                    ">=" => {
                        let value = node_to_value(left)?;
                        Some(ExpressionBuilderData::Simple {
                            operator: SimpleOperator::Lte,
                            value: Some(value),
                        })
                    }
                    "<" => {
                        let value = node_to_value(left)?;
                        Some(ExpressionBuilderData::Simple {
                            operator: SimpleOperator::Gt,
                            value: Some(value),
                        })
                    }
                    "<=" => {
                        let value = node_to_value(left)?;
                        Some(ExpressionBuilderData::Simple {
                            operator: SimpleOperator::Gte,
                            value: Some(value),
                        })
                    }
                    _ => None,
                }
            } else {
                None
            }
        }

        Node::Unary {
            operator,
            node: inner,
        } if operator.to_string() == "!" => {
            if is_root(inner) {
                return Some(ExpressionBuilderData::Simple {
                    operator: SimpleOperator::Null,
                    value: None,
                });
            }
            None
        }

        Node::FunctionCall { kind, arguments } if kind.to_string() == "exists" => {
            if arguments.len() == 1 && is_root(arguments[0]) {
                return Some(ExpressionBuilderData::Simple {
                    operator: SimpleOperator::NotNull,
                    value: None,
                });
            }
            None
        }

        Node::FunctionCall { kind, arguments } if kind.to_string() == "startsWith" => {
            if arguments.len() == 2 && is_root(arguments[0]) {
                if let Node::String(s) = arguments[1] {
                    return Some(ExpressionBuilderData::Simple {
                        operator: SimpleOperator::StartsWith,
                        value: Some(SimpleValue::String {
                            value: s.to_string(),
                        }),
                    });
                }
            }
            None
        }

        Node::FunctionCall { kind, arguments } if kind.to_string() == "endsWith" => {
            if arguments.len() == 2 && is_root(arguments[0]) {
                if let Node::String(s) = arguments[1] {
                    return Some(ExpressionBuilderData::Simple {
                        operator: SimpleOperator::EndsWith,
                        value: Some(SimpleValue::String {
                            value: s.to_string(),
                        }),
                    });
                }
            }
            None
        }

        Node::FunctionCall { kind, arguments } if kind.to_string() == "contains" => {
            if arguments.len() == 2 && is_root(arguments[0]) {
                if let Node::String(s) = arguments[1] {
                    return Some(ExpressionBuilderData::Simple {
                        operator: SimpleOperator::Contains,
                        value: Some(SimpleValue::String {
                            value: s.to_string(),
                        }),
                    });
                }
            }
            None
        }

        Node::MethodCall {
            kind,
            this,
            arguments,
        } => {
            let method_name = kind.to_string();

            if is_date_of_root(this) {
                match method_name.as_str() {
                    "isAfter" if arguments.len() >= 1 && arguments.len() <= 2 => {
                        let date = extract_date_string(arguments[0])?;
                        let granularity = arguments.get(1).and_then(|n| extract_granularity(n));
                        Some(ExpressionBuilderData::Simple {
                            operator: SimpleOperator::DateAfter,
                            value: Some(SimpleValue::Date {
                                value: date,
                                granularity,
                            }),
                        })
                    }
                    "isBefore" if arguments.len() >= 1 && arguments.len() <= 2 => {
                        let date = extract_date_string(arguments[0])?;
                        let granularity = arguments.get(1).and_then(|n| extract_granularity(n));
                        Some(ExpressionBuilderData::Simple {
                            operator: SimpleOperator::DateBefore,
                            value: Some(SimpleValue::Date {
                                value: date,
                                granularity,
                            }),
                        })
                    }
                    "isSame" if arguments.len() >= 1 && arguments.len() <= 2 => {
                        let date = extract_date_string(arguments[0])?;
                        let granularity = arguments.get(1).and_then(|n| extract_granularity(n));
                        Some(ExpressionBuilderData::Simple {
                            operator: SimpleOperator::DateSame,
                            value: Some(SimpleValue::Date {
                                value: date,
                                granularity,
                            }),
                        })
                    }
                    "isSameOrAfter" if arguments.len() >= 1 && arguments.len() <= 2 => {
                        let date = extract_date_string(arguments[0])?;
                        let granularity = arguments.get(1).and_then(|n| extract_granularity(n));
                        Some(ExpressionBuilderData::Simple {
                            operator: SimpleOperator::DateSameOrAfter,
                            value: Some(SimpleValue::Date {
                                value: date,
                                granularity,
                            }),
                        })
                    }
                    "isSameOrBefore" if arguments.len() >= 1 && arguments.len() <= 2 => {
                        let date = extract_date_string(arguments[0])?;
                        let granularity = arguments.get(1).and_then(|n| extract_granularity(n));
                        Some(ExpressionBuilderData::Simple {
                            operator: SimpleOperator::DateSameOrBefore,
                            value: Some(SimpleValue::Date {
                                value: date,
                                granularity,
                            }),
                        })
                    }
                    "isToday" if arguments.is_empty() => Some(ExpressionBuilderData::Simple {
                        operator: SimpleOperator::DateIsToday,
                        value: None,
                    }),
                    _ => None,
                }
            } else {
                None
            }
        }

        _ => None,
    }
}

fn is_time_minutes_expr(node: &Node) -> bool {
    if let Node::Binary {
        left,
        operator,
        right,
    } = node
    {
        if operator.to_string() != "+" {
            return false;
        }
        if let Node::Binary {
            left: hour_mul,
            operator: mul_op,
            right: sixty1,
        } = left
        {
            if mul_op.to_string() != "*" {
                return false;
            }
            if !matches!(sixty1, Node::Number(n) if n.to_f64() == Some(60.0)) {
                return false;
            }
            if let Node::MethodCall {
                kind,
                this,
                arguments,
            } = hour_mul
            {
                if kind.to_string() == "hour" && arguments.is_empty() && is_date_of_root(this) {
                    if let Node::MethodCall {
                        kind: min_kind,
                        this: min_this,
                        arguments: min_args,
                    } = right
                    {
                        return min_kind.to_string() == "minute"
                            && min_args.is_empty()
                            && is_date_of_root(min_this);
                    }
                }
            }
        }
    }
    false
}

fn extract_time_value(node: &Node) -> Option<(i32, i32)> {
    if let Node::Binary {
        left,
        operator,
        right,
    } = node
    {
        if operator.to_string() != "+" {
            return None;
        }
        if let Node::Binary {
            left: hour_node,
            operator: mul_op,
            right: sixty,
        } = left
        {
            if mul_op.to_string() != "*" {
                return None;
            }
            if !matches!(sixty, Node::Number(n) if n.to_f64() == Some(60.0)) {
                return None;
            }
            let hour = extract_int(hour_node)?;
            let minute = extract_int(right)?;
            return Some((hour, minute));
        }
    }
    None
}

fn extract_int(node: &Node) -> Option<i32> {
    if let Node::Number(n) = node {
        n.to_f64().map(|f| f as i32)
    } else {
        None
    }
}

fn try_parse_time_comparison(node: &Node) -> Option<ExpressionBuilderData> {
    if let Node::Binary {
        left,
        operator,
        right,
    } = node
    {
        let op_str = operator.to_string();
        if is_time_minutes_expr(left) {
            let (hour, minute) = extract_time_value(right)?;
            let op = match op_str.as_str() {
                ">" => SimpleOperator::TimeGt,
                ">=" => SimpleOperator::TimeGte,
                "<" => SimpleOperator::TimeLt,
                "<=" => SimpleOperator::TimeLte,
                _ => return None,
            };
            return Some(ExpressionBuilderData::Simple {
                operator: op,
                value: Some(SimpleValue::Time { hour, minute }),
            });
        }
    }
    None
}

fn is_weekday_call(node: &Node) -> bool {
    if let Node::MethodCall {
        kind,
        this,
        arguments,
    } = node
    {
        return kind.to_string() == "weekday" && arguments.is_empty() && is_date_of_root(this);
    }
    false
}

fn is_quarter_call(node: &Node) -> bool {
    if let Node::MethodCall {
        kind,
        this,
        arguments,
    } = node
    {
        return kind.to_string() == "quarter" && arguments.is_empty() && is_date_of_root(this);
    }
    false
}

fn extract_int_array(items: &[&Node]) -> Option<Vec<i32>> {
    let mut result = Vec::new();
    for item in items {
        if let Node::Number(n) = item {
            result.push(n.to_f64()? as i32);
        } else {
            return None;
        }
    }
    Some(result)
}

fn try_parse_weekday_in(node: &Node) -> Option<ExpressionBuilderData> {
    if let Node::Binary {
        left,
        operator,
        right,
    } = node
    {
        if operator.to_string() == "in" && is_weekday_call(left) {
            if let Node::Array(items) = right {
                let values = extract_int_array(items)?;
                return Some(ExpressionBuilderData::Simple {
                    operator: SimpleOperator::DayOfWeekIn,
                    value: Some(SimpleValue::IntArray { values }),
                });
            }
        }
    }
    None
}

fn try_parse_quarter_in(node: &Node) -> Option<ExpressionBuilderData> {
    if let Node::Binary {
        left,
        operator,
        right,
    } = node
    {
        if operator.to_string() == "in" && is_quarter_call(left) {
            if let Node::Array(items) = right {
                let values = extract_int_array(items)?;
                return Some(ExpressionBuilderData::Simple {
                    operator: SimpleOperator::QuarterIn,
                    value: Some(SimpleValue::IntArray { values }),
                });
            }
        }
    }
    None
}

fn node_to_value(node: &Node) -> Option<SimpleValue> {
    match node {
        Node::String(s) => Some(SimpleValue::String {
            value: s.to_string(),
        }),
        Node::Number(n) => Some(SimpleValue::Number { value: n.to_f64()? }),
        Node::Bool(b) => Some(SimpleValue::Boolean { value: *b }),
        _ => None,
    }
}

fn extract_number(node: &Node) -> Option<f64> {
    if let Node::Number(n) = node {
        n.to_f64()
    } else {
        None
    }
}

fn extract_string_array(items: &[&Node]) -> Option<Vec<String>> {
    let mut result = Vec::new();
    for item in items {
        if let Node::String(s) = item {
            result.push(s.to_string());
        } else {
            return None;
        }
    }
    Some(result)
}

fn extract_number_array(items: &[&Node]) -> Option<Vec<f64>> {
    let mut result = Vec::new();
    for item in items {
        if let Node::Number(n) = item {
            result.push(n.to_f64()?);
        } else {
            return None;
        }
    }
    Some(result)
}

fn serialize_simple(operator: &SimpleOperator, value: &Option<SimpleValue>) -> String {
    match operator {
        SimpleOperator::Any => String::new(),

        SimpleOperator::Null => "null".to_string(),

        SimpleOperator::NotNull => "!= null".to_string(),

        SimpleOperator::Eq => match value {
            Some(SimpleValue::String { value }) => format!("\"{}\"", escape_string(value)),
            Some(SimpleValue::Number { value }) => format_number(*value),
            Some(SimpleValue::Boolean { value }) => value.to_string(),
            _ => "null".to_string(),
        },

        SimpleOperator::Neq => match value {
            Some(SimpleValue::String { value }) => format!("!= \"{}\"", escape_string(value)),
            Some(SimpleValue::Number { value }) => format!("!= {}", format_number(*value)),
            Some(SimpleValue::Boolean { value }) => format!("!= {}", value),
            _ => "!= null".to_string(),
        },

        SimpleOperator::Gt => match value {
            Some(SimpleValue::Number { value }) => format!("> {}", format_number(*value)),
            _ => "> 0".to_string(),
        },

        SimpleOperator::Gte => match value {
            Some(SimpleValue::Number { value }) => format!(">= {}", format_number(*value)),
            _ => ">= 0".to_string(),
        },

        SimpleOperator::Lt => match value {
            Some(SimpleValue::Number { value }) => format!("< {}", format_number(*value)),
            _ => "< 0".to_string(),
        },

        SimpleOperator::Lte => match value {
            Some(SimpleValue::Number { value }) => format!("<= {}", format_number(*value)),
            _ => "<= 0".to_string(),
        },

        SimpleOperator::In => match value {
            Some(SimpleValue::StringArray { values }) => {
                let items: Vec<String> = values
                    .iter()
                    .map(|v| format!("\"{}\"", escape_string(v)))
                    .collect();
                format!("[{}]", items.join(", "))
            }
            Some(SimpleValue::NumberArray { values }) => {
                let items: Vec<String> = values.iter().map(|v| format_number(*v)).collect();
                format!("[{}]", items.join(", "))
            }
            _ => "[]".to_string(),
        },

        SimpleOperator::NotIn => match value {
            Some(SimpleValue::StringArray { values }) => {
                let items: Vec<String> = values
                    .iter()
                    .map(|v| format!("\"{}\"", escape_string(v)))
                    .collect();
                format!("not in [{}]", items.join(", "))
            }
            Some(SimpleValue::NumberArray { values }) => {
                let items: Vec<String> = values.iter().map(|v| format_number(*v)).collect();
                format!("not in [{}]", items.join(", "))
            }
            _ => "not in []".to_string(),
        },

        SimpleOperator::Between => match value {
            Some(SimpleValue::Interval {
                left,
                right,
                left_inclusive,
                right_inclusive,
            }) => {
                let lb = if *left_inclusive { "[" } else { "(" };
                let rb = if *right_inclusive { "]" } else { ")" };
                format!(
                    "{}{}..{}{}",
                    lb,
                    format_number(*left),
                    format_number(*right),
                    rb
                )
            }
            _ => "[0..100]".to_string(),
        },

        SimpleOperator::StartsWith => match value {
            Some(SimpleValue::String { value }) => {
                format!("startsWith($, \"{}\")", escape_string(value))
            }
            _ => "startsWith($, \"\")".to_string(),
        },

        SimpleOperator::EndsWith => match value {
            Some(SimpleValue::String { value }) => {
                format!("endsWith($, \"{}\")", escape_string(value))
            }
            _ => "endsWith($, \"\")".to_string(),
        },

        SimpleOperator::Contains => match value {
            Some(SimpleValue::String { value }) => {
                format!("contains($, \"{}\")", escape_string(value))
            }
            _ => "contains($, \"\")".to_string(),
        },

        SimpleOperator::DateAfter => match value {
            Some(SimpleValue::Date { value, granularity }) => match granularity {
                Some(g) => format!("d($).isAfter(\"{}\", \"{}\")", value, g),
                None => format!("d($).isAfter(\"{}\")", value),
            },
            _ => "d($).isAfter(\"\")".to_string(),
        },

        SimpleOperator::DateBefore => match value {
            Some(SimpleValue::Date { value, granularity }) => match granularity {
                Some(g) => format!("d($).isBefore(\"{}\", \"{}\")", value, g),
                None => format!("d($).isBefore(\"{}\")", value),
            },
            _ => "d($).isBefore(\"\")".to_string(),
        },

        SimpleOperator::DateSame => match value {
            Some(SimpleValue::Date { value, granularity }) => match granularity {
                Some(g) => format!("d($).isSame(\"{}\", \"{}\")", value, g),
                None => format!("d($).isSame(\"{}\")", value),
            },
            _ => "d($).isSame(\"\")".to_string(),
        },

        SimpleOperator::DateSameOrAfter => match value {
            Some(SimpleValue::Date { value, granularity }) => match granularity {
                Some(g) => format!("d($).isSameOrAfter(\"{}\", \"{}\")", value, g),
                None => format!("d($).isSameOrAfter(\"{}\")", value),
            },
            _ => "d($).isSameOrAfter(\"\")".to_string(),
        },

        SimpleOperator::DateSameOrBefore => match value {
            Some(SimpleValue::Date { value, granularity }) => match granularity {
                Some(g) => format!("d($).isSameOrBefore(\"{}\", \"{}\")", value, g),
                None => format!("d($).isSameOrBefore(\"{}\")", value),
            },
            _ => "d($).isSameOrBefore(\"\")".to_string(),
        },

        SimpleOperator::DateIsToday => "d($).isToday()".to_string(),

        SimpleOperator::TimeGt => match value {
            Some(SimpleValue::Time { hour, minute }) => {
                format!(
                    "d($).hour() * 60 + d($).minute() > {} * 60 + {}",
                    hour, minute
                )
            }
            _ => "d($).hour() * 60 + d($).minute() > 0".to_string(),
        },

        SimpleOperator::TimeGte => match value {
            Some(SimpleValue::Time { hour, minute }) => {
                format!(
                    "d($).hour() * 60 + d($).minute() >= {} * 60 + {}",
                    hour, minute
                )
            }
            _ => "d($).hour() * 60 + d($).minute() >= 0".to_string(),
        },

        SimpleOperator::TimeLt => match value {
            Some(SimpleValue::Time { hour, minute }) => {
                format!(
                    "d($).hour() * 60 + d($).minute() < {} * 60 + {}",
                    hour, minute
                )
            }
            _ => "d($).hour() * 60 + d($).minute() < 0".to_string(),
        },

        SimpleOperator::TimeLte => match value {
            Some(SimpleValue::Time { hour, minute }) => {
                format!(
                    "d($).hour() * 60 + d($).minute() <= {} * 60 + {}",
                    hour, minute
                )
            }
            _ => "d($).hour() * 60 + d($).minute() <= 0".to_string(),
        },

        SimpleOperator::DayOfWeekIn => match value {
            Some(SimpleValue::IntArray { values }) => {
                let items: Vec<String> = values.iter().map(|v| v.to_string()).collect();
                format!("d($).weekday() in [{}]", items.join(", "))
            }
            _ => "d($).weekday() in []".to_string(),
        },

        SimpleOperator::QuarterIn => match value {
            Some(SimpleValue::IntArray { values }) => {
                let items: Vec<String> = values.iter().map(|v| v.to_string()).collect();
                format!("d($).quarter() in [{}]", items.join(", "))
            }
            _ => "d($).quarter() in []".to_string(),
        },
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(tag = "kind", rename_all = "camelCase")]
pub enum StandardExpressionData {
    String { value: String },
    Number { value: f64 },
    Boolean { value: bool },
    Date { value: String },
    Expression,
}

#[wasm_bindgen(js_name = "parseStandardExpression")]
pub fn parse_standard_expression(expression: &str) -> JsValue {
    let data = parse_standard_impl(expression);
    JsValue::from_serde(&data).unwrap()
}

fn parse_standard_impl(expression: &str) -> StandardExpressionData {
    let trimmed = expression.trim();
    if trimmed.is_empty() {
        return StandardExpressionData::Expression;
    }

    let bump = Bump::new();
    let mut lexer = Lexer::new();

    let tokens = match lexer.tokenize(expression) {
        Ok(t) => t,
        Err(_) => return StandardExpressionData::Expression,
    };

    let parser = match Parser::try_new(tokens, &bump) {
        Ok(p) => p,
        Err(_) => return StandardExpressionData::Expression,
    };

    let result = parser.standard().parse();
    if result.error().is_err() {
        return StandardExpressionData::Expression;
    }

    match result.root {
        Node::String(s) => StandardExpressionData::String {
            value: s.to_string(),
        },
        Node::Number(n) => match n.to_f64() {
            Some(v) => StandardExpressionData::Number { value: v },
            None => StandardExpressionData::Expression,
        },
        Node::Bool(b) => StandardExpressionData::Boolean { value: *b },
        Node::FunctionCall { kind, arguments }
            if kind.to_string() == "d" && arguments.len() == 1 =>
        {
            if let Node::String(s) = arguments[0] {
                StandardExpressionData::Date {
                    value: s.to_string(),
                }
            } else {
                StandardExpressionData::Expression
            }
        }
        _ => StandardExpressionData::Expression,
    }
}

fn escape_string(s: &str) -> String {
    s.replace('\\', "\\\\")
        .replace('"', "\\\"")
        .replace('\n', "\\n")
        .replace('\r', "\\r")
        .replace('\t', "\\t")
}

fn format_number(n: f64) -> String {
    if n.fract() == 0.0 {
        format!("{}", n as i64)
    } else {
        format!("{}", n)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn roundtrip(input: &str, expected_output: &str) {
        let expr = ExpressionBuilder::parse_unary(input);
        assert!(expr.is_simple(), "Expected simple for: {}", input);
        let serialized = expr.serialize();
        assert_eq!(
            serialized, expected_output,
            "Roundtrip failed for: {}",
            input
        );
    }

    fn is_complex(input: &str) {
        let expr = ExpressionBuilder::parse_unary(input);
        assert!(expr.is_complex(), "Expected complex for: {}", input);
    }

    #[test]
    fn test_any() {
        roundtrip("-", "");
        roundtrip("", "");
        roundtrip("  ", "");
    }

    #[test]
    fn test_null() {
        roundtrip("null", "null");
    }

    #[test]
    fn test_not_null() {
        roundtrip("$ != null", "!= null");
        roundtrip("!= null", "!= null");
    }

    #[test]
    fn test_string_eq() {
        roundtrip("\"hello\"", "\"hello\"");
        roundtrip("\"world\"", "\"world\"");
    }

    #[test]
    fn test_number_eq() {
        roundtrip("42", "42");
        roundtrip("3.14", "3.14");
        roundtrip("0", "0");
    }

    #[test]
    fn test_boolean_eq() {
        roundtrip("true", "true");
        roundtrip("false", "false");
    }

    #[test]
    fn test_comparisons() {
        roundtrip("$ > 10", "> 10");
        roundtrip("> 10", "> 10");
        roundtrip("$ >= 10", ">= 10");
        roundtrip(">= 10", ">= 10");
        roundtrip("$ < 10", "< 10");
        roundtrip("< 10", "< 10");
        roundtrip("$ <= 10", "<= 10");
        roundtrip("<= 10", "<= 10");
        roundtrip("$ != 10", "!= 10");
        roundtrip("!= 10", "!= 10");
    }

    #[test]
    fn test_string_array() {
        roundtrip("[\"a\", \"b\", \"c\"]", "[\"a\", \"b\", \"c\"]");
        roundtrip("[\"hello\"]", "[\"hello\"]");
        roundtrip("not in [\"a\", \"b\"]", "not in [\"a\", \"b\"]");
    }

    #[test]
    fn test_number_array() {
        roundtrip("[1, 2, 3]", "[1, 2, 3]");
        roundtrip("[10, 20]", "[10, 20]");
        roundtrip("not in [1, 2, 3]", "not in [1, 2, 3]");
    }

    #[test]
    fn test_empty_array() {
        roundtrip("[]", "[]");
        roundtrip("$ in []", "[]");
        roundtrip("not in []", "not in []");
        roundtrip("$ not in []", "not in []");
    }

    #[test]
    fn test_interval() {
        roundtrip("[10..100]", "[10..100]");
        roundtrip("(0..50]", "(0..50]");
        roundtrip("[0..50)", "[0..50)");
        roundtrip("(0..50)", "(0..50)");
    }

    #[test]
    fn test_complex_expressions() {
        is_complex("$ > 10 and $ < 100");
        is_complex("$ + 1");
    }

    #[test]
    fn test_starts_with() {
        roundtrip("startsWith($, \"hello\")", "startsWith($, \"hello\")");
        roundtrip("startsWith($, \"test\")", "startsWith($, \"test\")");
    }

    #[test]
    fn test_ends_with() {
        roundtrip("endsWith($, \"world\")", "endsWith($, \"world\")");
        roundtrip("endsWith($, \".txt\")", "endsWith($, \".txt\")");
    }

    #[test]
    fn test_contains() {
        roundtrip("contains($, \"test\")", "contains($, \"test\")");
        roundtrip("contains($, \"foo\")", "contains($, \"foo\")");
    }

    #[test]
    fn test_date_after() {
        roundtrip(
            "d($).isAfter(\"2024-01-01\")",
            "d($).isAfter(\"2024-01-01\")",
        );
        roundtrip(
            "d($).isAfter(d(\"2024-06-15\"))",
            "d($).isAfter(\"2024-06-15\")",
        );
        roundtrip(
            "d($).isAfter(\"2024-01-01\", \"month\")",
            "d($).isAfter(\"2024-01-01\", \"month\")",
        );
        roundtrip(
            "d($).isAfter(\"2024-01-01\", \"year\")",
            "d($).isAfter(\"2024-01-01\", \"year\")",
        );
    }

    #[test]
    fn test_date_before() {
        roundtrip(
            "d($).isBefore(\"2024-12-31\")",
            "d($).isBefore(\"2024-12-31\")",
        );
        roundtrip(
            "d($).isBefore(\"2024-12-31\", \"day\")",
            "d($).isBefore(\"2024-12-31\", \"day\")",
        );
    }

    #[test]
    fn test_date_same() {
        roundtrip("d($).isSame(\"2024-01-01\")", "d($).isSame(\"2024-01-01\")");
        roundtrip(
            "d($).isSame(\"2024-01-01\", \"month\")",
            "d($).isSame(\"2024-01-01\", \"month\")",
        );
        roundtrip(
            "d($).isSame(\"2024-01-01\", \"year\")",
            "d($).isSame(\"2024-01-01\", \"year\")",
        );
    }

    #[test]
    fn test_date_same_or_after() {
        roundtrip(
            "d($).isSameOrAfter(\"2024-01-01\")",
            "d($).isSameOrAfter(\"2024-01-01\")",
        );
        roundtrip(
            "d($).isSameOrAfter(\"2024-01-01\", \"month\")",
            "d($).isSameOrAfter(\"2024-01-01\", \"month\")",
        );
    }

    #[test]
    fn test_date_same_or_before() {
        roundtrip(
            "d($).isSameOrBefore(\"2024-12-31\")",
            "d($).isSameOrBefore(\"2024-12-31\")",
        );
        roundtrip(
            "d($).isSameOrBefore(\"2024-12-31\", \"week\")",
            "d($).isSameOrBefore(\"2024-12-31\", \"week\")",
        );
    }

    #[test]
    fn test_date_is_today() {
        roundtrip("d($).isToday()", "d($).isToday()");
    }

    #[test]
    fn test_time_roundtrip() {
        roundtrip(
            "d($).hour() * 60 + d($).minute() > 9 * 60 + 30",
            "d($).hour() * 60 + d($).minute() > 9 * 60 + 30",
        );
        roundtrip(
            "d($).hour() * 60 + d($).minute() >= 8 * 60 + 0",
            "d($).hour() * 60 + d($).minute() >= 8 * 60 + 0",
        );
        roundtrip(
            "d($).hour() * 60 + d($).minute() < 17 * 60 + 30",
            "d($).hour() * 60 + d($).minute() < 17 * 60 + 30",
        );
        roundtrip(
            "d($).hour() * 60 + d($).minute() <= 18 * 60 + 0",
            "d($).hour() * 60 + d($).minute() <= 18 * 60 + 0",
        );
    }

    #[test]
    fn test_day_of_week_roundtrip() {
        roundtrip(
            "d($).weekday() in [1, 2, 3, 4, 5]",
            "d($).weekday() in [1, 2, 3, 4, 5]",
        );
        roundtrip("d($).weekday() in [6, 7]", "d($).weekday() in [6, 7]");
    }

    #[test]
    fn test_quarter_roundtrip() {
        roundtrip("d($).quarter() in [1, 4]", "d($).quarter() in [1, 4]");
        roundtrip(
            "d($).quarter() in [1, 2, 3, 4]",
            "d($).quarter() in [1, 2, 3, 4]",
        );
    }
}
