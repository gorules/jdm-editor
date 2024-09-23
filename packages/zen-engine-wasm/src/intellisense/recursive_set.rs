use std::collections::HashMap;
use std::rc::Rc;
use zen_expression::variable::VariableType;

pub trait RecursiveSet {
    fn set_type(self, path: &str, vt: VariableType) -> VariableType;
}

impl RecursiveSet for VariableType {
    fn set_type(self, path: &str, variable_type: VariableType) -> VariableType {
        let (first, rest) = path.split_once('.')
            .map(|(a, b)| (a, Some(b)))
            .unwrap_or((path, None));

        match self {
            VariableType::Object(mut map) => {
                let mut vt = match map.remove(first) {
                    Some(vt) => vt.as_ref().clone(),
                    None => VariableType::Object(HashMap::default())
                };

                if let Some(r) = rest {
                    vt = vt.set_type(r, variable_type);
                } else {
                    vt = variable_type;
                }

                map.insert(first.to_string(), Rc::new(vt));
                VariableType::Object(map)
            }
            _ => VariableType::Any
        }
    }
}