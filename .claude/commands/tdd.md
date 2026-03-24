## TDD Cycle: Red → Green → Refactor

Execute a strict TDD cycle for the given feature or acceptance scenario.

**Input**: $ARGUMENTS (feature description or acceptance scenario)

### Phase 1: RED 🔴

Invoke the `tdd-test-writer` subagent:

```
Write a failing test for: $ARGUMENTS
```

**Gate**: The subagent MUST return a failing test with failure output.
Do NOT proceed to Phase 2 until test failure is confirmed.

### Phase 2: GREEN 🟢

Invoke the `tdd-implementer` subagent:

```
Make this failing test pass: <test file path from Phase 1>
```

**Gate**: The subagent MUST return passing test output AND full suite regression check.
Do NOT proceed to Phase 3 until all tests pass.

### Phase 3: REFACTOR 🔵

Invoke the `tdd-refactorer` subagent:

```
Review and optionally refactor the implementation from Phase 2. Files changed: <list from Phase 2>
```

**Gate**: All tests MUST still pass after refactoring.

### Completion

Report the cycle result:
```
TDD CYCLE COMPLETE
━━━━━━━━━━━━━━━━━━
RED:      <test file> — FAILED (confirmed)
GREEN:    <files changed> — PASSED
REFACTOR: <changes or "skipped"> — PASSED
━━━━━━━━━━━━━━━━━━
```

### Rules

- Do NOT skip phases
- Do NOT proceed past a gate until its condition is met
- Each phase uses a SEPARATE subagent for context isolation
- If any phase fails, stop and report the failure — do not retry automatically
