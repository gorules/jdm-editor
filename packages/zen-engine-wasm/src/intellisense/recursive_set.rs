use std::collections::HashMap;
use std::rc::Rc;
use zen_expression::variable::VariableType;

pub trait RecursiveGetSet {
    fn set_type(&mut self, path: &str, vt: VariableType) -> VariableType;

    fn get_type(&self, path: &str) -> VariableType;
}

impl RecursiveGetSet for VariableType {
    fn set_type(&mut self, path: &str, variable_type: VariableType) -> VariableType {
        let (first, rest) = path
            .split_once('.')
            .map(|(a, b)| (a, Some(b)))
            .unwrap_or((path, None));

        match self {
            VariableType::Object(map) => {
                let mut vt = match map.remove(first) {
                    Some(vt) => (*vt).clone(),
                    None => VariableType::Object(HashMap::default()),
                };

                if let Some(r) = rest {
                    vt = vt.set_type(r, variable_type);
                } else {
                    vt = variable_type;
                }

                map.insert(first.to_string(), Rc::new(vt));
                VariableType::Object(map.clone())
            }
            _ => VariableType::Any,
        }
    }

    fn get_type(&self, path: &str) -> VariableType {
        let (first, rest) = path
            .split_once('.')
            .map(|(a, b)| (a, Some(b)))
            .unwrap_or((path, None));

        match self {
            VariableType::Object(map) => {
                let Some(vt) = map.get(first) else {
                    return VariableType::Any;
                };

                if let Some(r) = rest {
                    vt.get_type(r)
                } else {
                    (**vt).clone()
                }
            }
            _ => VariableType::Any,
        }
    }
}
