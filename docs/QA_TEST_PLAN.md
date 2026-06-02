# QA Test Plan Template

## 1. Flight Analogy
Before a pilot takes off in an airplane, they go through a "pre-flight checklist". They check the fuel level, test the wing flaps, and verify the engine instruments. If even a single critical check fails, the plane stays on the ground. This QA Test Plan is our pre-flight checklist to make sure our code is completely safe before it "takes off" into production.

---

## 2. Pre-Test Checklist
Do these steps before running any QA tests:
- [ ] **Clean environment:** Stop all running servers and start a clean session.
- [ ] **Install dependencies:** Run `npm install` or equivalent to make sure all packages are up-to-date.
- [ ] **Load test configurations:** Verify mock configurations are loaded, and no production API keys are used.

---

## 3. Test Categories & Pass/Fail Criteria

| Test Category | Target Area | What We Test | Pass Criteria | Fail Criteria |
|---|---|---|---|---|
| **Unit Test** | Core Logic | Smallest code pieces, functions. | Correct outputs for given inputs. | Code errors or wrong values. |
| **Integration Test**| Connections | Tools talking to databases/APIs. | Data transfers successfully. | Connection timeouts or 404/500 errors. |
| **Manual Test** | User Experience | Clicking buttons, navigation. | App is easy to use and looks correct. | Broken buttons, bad formatting. |
| **Accessibility** | Usability | Colors, text sizes, screen readers. | Readable fonts, clear contrast. | Small text, unreadable menus. |
| **Performance** | Speed | Page loading, response times. | Loading finishes in under 2 seconds. | Lagging screen, long spinning wheels. |

---

## 4. Test Results Recording Template

Use this table to record test results during a review:

| Test ID | Category | Feature Tested | Expected Behavior | Actual Behavior | Result (Pass/Fail) | Notes |
|---|---|---|---|---|---|---|
| **TC-01** | Unit | Token budget check | Block action when limit exceeded | Blocked action | Pass | Tested via mock runner. |
| **TC-02** | Integration | Database save | User data saved upon submit | Saved data | Pass | Local dev environment. |
| **TC-03** | Performance | Home page load | Home page opens under 2 seconds | Opened in 1.2s | Pass | Loaded on local dev server. |

---

Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
