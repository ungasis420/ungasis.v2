# Schema Contract System — Forms That Must Be Filled Correctly

## 1. Kitchen Analogy
Imagine a school enrollment form. It has specific boxes for your name, birthdate, and your parent's signature. If you leave the signature blank, or write a phone number in the birthdate box, the school rejects the form. A schema is that enrollment form. It makes sure configuration files have the correct information in the correct boxes before the system accepts them.

---

## 2. What a Schema Does
A schema enforces a "contract" on configuration files. It checks:
- **Presence:** Are all required fields present?
- **Data Types:** Are numbers formatted as numbers, and text formatted as text?
- **Typos:** Are field names spelled correctly? (e.g., `warning_threshold` instead of `warn_thresh`).
- **Allowed Values:** Do options match a pre-approved list?

---

## 3. Configuration Schema Registry

This table lists our config files and the fields they must contain:

| Config File | Purpose | Required Fields / Keys | Allowed Data Types |
|---|---|---|---|
| [agent-scoring.yml](file:///c:/Users/63905/Downloads/ungasis/config/agent-scoring.yml) | Grading agent outputs | `metrics`, `weights`, `thresholds` | Object, Map, Float |
| [circuit-breaker.yml](file:///c:/Users/63905/Downloads/ungasis/config/circuit-breaker.yml) | Failure handling | `max_failures`, `cooldown_seconds` | Integer, Float |
| [graceful-degradation.yml](file:///c:/Users/63905/Downloads/ungasis/config/graceful-degradation.yml) | Slower/safer fallback paths | `features`, `degraded_states` | Object, List |
| [kill-switch.yml](file:///c:/Users/63905/Downloads/ungasis/config/kill-switch.yml) | Stop-run triggers | `triggers`, `secrets_pattern`, `actions` | Object, String, List |
| [orchestration-policy.yml](file:///c:/Users/63905/Downloads/ungasis/config/orchestration-policy.yml) | Multi-agent rules | `roles`, `delegation_rules` | Object, Map |
| [progress-detection.yml](file:///c:/Users/63905/Downloads/ungasis/config/progress-detection.yml) | Detect loops/wandering | `repeater.threshold`, `wanderer.max_off_topic` | Integer, Integer |
| [rate-limit-budget.yml](file:///c:/Users/63905/Downloads/ungasis/config/rate-limit-budget.yml) | API request ceilings | `requests_per_minute`, `reset_window` | Integer, Integer |
| [sequential-defaults.yml](file:///c:/Users/63905/Downloads/ungasis/config/sequential-defaults.yml) | Fallback routing | `default_model`, `fallback_model` | String, String |
| [token-budget.yml](file:///c:/Users/63905/Downloads/ungasis/config/token-budget.yml) | Token spending limits | `warning_threshold`, `hard_cap` | Integer, Integer |

---

## 4. Schema Checklist & Guidelines
- [ ] **Match Schema:** Every config change must be checked against the schema registry before saving.
- [ ] **No Custom Keys:** Never add experimental keys to a config file without registering them in the schema first.
- [ ] **Validation Step:** Before merging a configuration change to the project repository, run the schema validator to prevent system crashes.

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
