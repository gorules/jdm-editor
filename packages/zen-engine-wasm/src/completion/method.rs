use crate::completion::{CompletionDefinition, CompletionInfo, CompletionParamNames};
use zen_expression::functions::{DateMethod, MethodKind, MethodRegistry};

impl From<MethodKind> for CompletionInfo {
    fn from(value: MethodKind) -> Self {
        let m = |i: &str| CompletionInfo(i.to_owned());

        match value {
            MethodKind::DateMethod(dm) => match dm {
                DateMethod::Add => m("Adds time to a date"),
                DateMethod::Sub => m("Subtracts time from a date"),
                DateMethod::Set => m("Sets a specific unit of time on a date"),
                DateMethod::Format => m("Formats a date into a string representation"),
                DateMethod::StartOf => m("Returns the start of a specified time unit for a date"),
                DateMethod::EndOf => m("Returns the end of a specified time unit for a date"),
                DateMethod::Diff => m("Calculates the difference between two dates"),
                DateMethod::Tz => m("Converts a date to a different timezone"),
                DateMethod::IsSame => m("Checks if two dates are the same"),
                DateMethod::IsBefore => m("Checks if a date is before another date"),
                DateMethod::IsAfter => m("Checks if a date is after another date"),
                DateMethod::IsSameOrBefore => {
                    m("Checks if a date is the same as or before another date")
                }
                DateMethod::IsSameOrAfter => {
                    m("Checks if a date is the same as or after another date")
                }
                DateMethod::Second => m("Gets the seconds of a date"),
                DateMethod::Minute => m("Gets the minutes of a date"),
                DateMethod::Hour => m("Gets the hours of a date"),
                DateMethod::Day => m("Gets the day of the month for a date"),
                DateMethod::DayOfYear => m("Gets the day of the year for a date"),
                DateMethod::Week => m("Gets the week of the year for a date"),
                DateMethod::Weekday => m("Gets the day of the week for a date"),
                DateMethod::Month => m("Gets the month for a date"),
                DateMethod::Quarter => m("Gets the quarter for a date"),
                DateMethod::Year => m("Gets the year for a date"),
                DateMethod::Timestamp => m("Gets the Unix timestamp for a date"),
                DateMethod::OffsetName => m("Gets the timezone offset name for a date"),
                DateMethod::IsValid => m("Checks if a date is valid"),
                DateMethod::IsYesterday => m("Checks if a date is yesterday"),
                DateMethod::IsToday => m("Checks if a date is today"),
                DateMethod::IsTomorrow => m("Checks if a date is tomorrow"),
                DateMethod::IsLeapYear => m("Checks if the year of a date is a leap year"),
            },
        }
    }
}

impl From<MethodKind> for CompletionParamNames {
    fn from(value: MethodKind) -> Self {
        let m = |a: &[&str]| CompletionParamNames(a.iter().map(|s| (*s).to_owned()).collect());

        match value {
            MethodKind::DateMethod(dm) => match dm {
                DateMethod::Add => m(&["amount", "unit"]),
                DateMethod::Sub => m(&["amount", "unit"]),
                DateMethod::Set => m(&["value", "unit"]),
                DateMethod::Format => m(&["format"]),
                DateMethod::StartOf => m(&["unit"]),
                DateMethod::EndOf => m(&["unit"]),
                DateMethod::Diff => m(&["otherDate", "unit"]),
                DateMethod::Tz => m(&["timezone"]),
                DateMethod::IsSame => m(&["otherDate", "unit"]),
                DateMethod::IsBefore => m(&["otherDate", "unit"]),
                DateMethod::IsAfter => m(&["otherDate", "unit"]),
                DateMethod::IsSameOrBefore => m(&["otherDate", "unit"]),
                DateMethod::IsSameOrAfter => m(&["otherDate", "unit"]),
                DateMethod::Second => m(&[]),
                DateMethod::Minute => m(&[]),
                DateMethod::Hour => m(&[]),
                DateMethod::Day => m(&[]),
                DateMethod::DayOfYear => m(&[]),
                DateMethod::Week => m(&[]),
                DateMethod::Weekday => m(&[]),
                DateMethod::Month => m(&[]),
                DateMethod::Quarter => m(&[]),
                DateMethod::Year => m(&[]),
                DateMethod::Timestamp => m(&[]),
                DateMethod::OffsetName => m(&[]),
                DateMethod::IsValid => m(&[]),
                DateMethod::IsYesterday => m(&[]),
                DateMethod::IsToday => m(&[]),
                DateMethod::IsTomorrow => m(&[]),
                DateMethod::IsLeapYear => m(&[]),
            },
        }
    }
}

impl From<MethodKind> for CompletionDefinition {
    fn from(value: MethodKind) -> Self {
        let cd = |s: &str| CompletionDefinition {
            signature: s.to_owned(),
            method_for: None,
        };

        let param_names: CompletionParamNames = value.clone().into();
        let Some(definition) = MethodRegistry::get_definition(&value) else {
            return cd("");
        };

        let cd = |s: &str| CompletionDefinition {
            signature: s.to_owned(),
            method_for: definition.param_type(0),
        };

        // First parameter is resolved for self
        let optional_params = definition.optional_parameters();
        let required_params = definition.required_parameters();
        let total_params = optional_params + required_params;

        let s = (1..total_params)
            .map(|i| {
                let param_name = param_names
                    .0
                    .get(i - 1)
                    .map(|s| s.as_str())
                    .unwrap_or("var");
                let osym = match i >= required_params {
                    true => "?",
                    false => "",
                };

                let param_type = definition.param_type_str(i);
                format!("{param_name}{osym}: `{param_type}`")
            })
            .collect::<Vec<_>>()
            .join(", ");

        cd(format!("({s}) -> {}", definition.return_type_str()).as_str())
    }
}
