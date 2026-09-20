# F1Store Wiki

Welcome to the F1Store project wiki. This serves as the central knowledge base for tracking progress, plans, decisions, and tasks for the F1Store website.

## Quick Navigation

| Document | Purpose |
|----------|---------|
| [Project Overview](PROJECT_OVERVIEW.md) | High-level project description, goals, and scope |
| [Progress Tracker](PROGRESS.md) | Current status, milestones, and completion metrics |
| [Roadmap & Plans](ROADMAP.md) | Phased development plan and future features |
| [Task Board](TASKS.md) | Active tasks, backlog, and sprint tracking |
| [Architecture Decisions](ARCHITECTURE.md) | Technical decisions and rationale (ADR log) |
| [Development Guidelines](DEVELOPMENT.md) | Coding standards, workflows, and conventions |
| [Security Plan](SECURITY.md) | Threat model, implemented auth controls, staged hardening checklist |
| [Database Guide](DATABASE.md) | How the Neon + Prisma database works and how to control it |
| [Current File Tree](FILE_TREE.md) | Current repository folders and files |
| [F1 API Reference](F1_API_REFERENCE.md) | Formula 1 data sources, endpoints, and integration patterns |
| [Figma MCP Setup](FIGMA_MCP_SETUP.md) | Connect Figma to opencode for design-to-code workflow |
| [Login Landing Page](LOGIN_LANDING_PAGE.md) | 2026-09-20 plan, implementation, validation, and follow-up |

## Project Links

- **Repository**: `A:\Github\F1Community` (GitHub: `valenzuelajp/F1Community`)
- **Wiki Location**: `A:\Github\F1Community\f1storewiki`
- **Live Site**: *TBD*

## Quick Status

> **Last Updated**: 2026-09-18
> **Current Phase**: Phase 0 - Foundation (~50%)
> **Active Sprint**: Auth Completion + Foundation Cleanup
> **Latest**: DB-backed login + `/register` are live in code (verified end-to-end); migration baseline created; lint infra has a pre-existing config mismatch (see TASKS.md)

---

## For AI Assistants

This wiki is designed to be read by both humans and AI agents. When working on this project:

1. **Start here** - Read this index and the Project Overview
2. **Check Progress** - Review PROGRESS.md for current state
3. **Consult Roadmap** - Understand the planned phases in ROADMAP.md
4. **Pick Tasks** - Check TASKS.md for actionable work
5. **Follow Guidelines** - Adhere to DEVELOPMENT.md standards
6. **Document Decisions** - Record architectural choices in ARCHITECTURE.md

### Context Preservation

After completing any significant work:
- Update PROGRESS.md with new completion status
- Move completed tasks in TASKS.md
- Add any new decisions to ARCHITECTURE.md
- Update ROADMAP.md if plans change

---

*This wiki is maintained alongside the codebase. Keep it current!*
