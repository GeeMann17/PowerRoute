# Lessons Learned

This file tracks patterns and lessons learned during development to prevent repeated mistakes.

---

## Session Log

### 2026-02-02
- **Initial setup**: Created `tasks/lessons.md` per Claud3Plan operating principles
- Project: WHITE-GLOVE-LEADS
- Added `Claud3.md` to `docs/` folder as operating principles reference
- Renamed "GManPlan" to "Claud3Plan" per user preference

---

## Patterns to Remember

### Project Structure
- Current working directory `/Users/cardbag/Desktop/WHITE-GLOVE-LEADS` is the only copy of this project
- Key docs location: `docs/` folder contains project context, implementation plans, changelog
- Operating principles: `docs/Claud3.md` - refer to this with each prompt/query
- Task tracking: `tasks/` folder for todo.md and lessons.md

### User Preferences
- User prefers "Claud3Plan" naming convention (not "GManPlan")
- User wants Claud3.md referenced with each prompt and query
- User values autonomous execution - don't ask for hand-holding on bug fixes

### Key Files to Reference
- `docs/Claud3.md` - Operating principles (plan mode, subagents, verification, elegance)
- `docs/PROJECT_CONTEXT.md` - Project context and requirements
- `docs/IMPLEMENTATION_PLAN.md` - Implementation details
- `docs/TODO.md` - Project-level tasks
- `docs/CHANGELOG.md` - Track of changes made
- `tasks/lessons.md` - This file, for learnings

---

## Rules for Myself

1. **Always read `docs/Claud3.md`** at session start for operating principles
2. **Enter plan mode** for any non-trivial task (3+ steps)
3. **Stop and re-plan** if something goes sideways - don't keep pushing
4. **Verify before marking done** - prove it works
5. **Update this file** after any correction from the user
6. **Use subagents** to keep main context clean for complex problems
7. **Simplicity first** - minimal code changes, no over-engineering
8. **No laziness** - find root causes, senior developer standards
