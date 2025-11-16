# CLAUDE.md - AI Assistant Guide for Thinker

**Last Updated:** 2025-11-16
**Repository:** Thinker
**Status:** Initial Setup

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Repository Structure](#repository-structure)
3. [Development Workflows](#development-workflows)
4. [Coding Conventions](#coding-conventions)
5. [Git Practices](#git-practices)
6. [Testing Strategy](#testing-strategy)
7. [Documentation Standards](#documentation-standards)
8. [AI Assistant Guidelines](#ai-assistant-guidelines)
9. [Common Tasks](#common-tasks)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

### About Thinker

**Status:** New Repository - Initial Setup Phase

This is a newly initialized repository. The project purpose, tech stack, and architecture will be defined as development progresses.

### Key Information

- **Primary Language:** To be determined
- **Framework/Platform:** To be determined
- **Build System:** To be determined
- **Package Manager:** To be determined

---

## Repository Structure

### Current Structure

```
Thinker/
├── .git/                 # Git repository data
└── CLAUDE.md            # This file
```

### Recommended Structure (To Be Implemented)

As the project grows, consider organizing code following these patterns:

```
Thinker/
├── .git/                 # Git repository data
├── .github/              # GitHub workflows and templates
│   ├── workflows/        # CI/CD pipelines
│   └── ISSUE_TEMPLATE/   # Issue templates
├── docs/                 # Project documentation
├── src/                  # Source code
│   ├── core/            # Core functionality
│   ├── utils/           # Utility functions
│   └── tests/           # Test files
├── config/              # Configuration files
├── scripts/             # Build and automation scripts
├── .gitignore           # Git ignore patterns
├── CLAUDE.md            # AI assistant guide (this file)
├── README.md            # Project documentation
├── LICENSE              # Project license
└── package.json         # Dependencies (if Node.js/npm)
```

---

## Development Workflows

### Branch Strategy

**Current Branch:** `claude/claude-md-mi1b4axe208qsqzo-01WtMz1XPDYbmf4SzEsFvvYj`

#### Branch Naming Conventions

- **Feature branches:** `feature/description-of-feature`
- **Bug fixes:** `fix/description-of-bug`
- **Documentation:** `docs/description-of-changes`
- **Claude AI branches:** `claude/claude-md-<session-id>`

#### Workflow Process

1. **Create Branch:** Always branch from main/master for new work
2. **Develop:** Make changes with clear, focused commits
3. **Test:** Ensure all tests pass before committing
4. **Commit:** Write descriptive commit messages
5. **Push:** Push to remote with `git push -u origin <branch-name>`
6. **Pull Request:** Create PR with detailed description
7. **Review:** Address feedback and make necessary changes
8. **Merge:** Merge to main after approval

---

## Coding Conventions

### General Principles

1. **Clarity Over Cleverness:** Write code that is easy to understand
2. **Consistency:** Follow established patterns in the codebase
3. **Documentation:** Comment complex logic and public APIs
4. **Error Handling:** Always handle errors gracefully
5. **Security:** Never commit secrets, credentials, or sensitive data

### Code Style

To be defined based on chosen language/framework. Consider adopting:

- **Linting:** ESLint, Pylint, RuboCop, etc.
- **Formatting:** Prettier, Black, rustfmt, etc.
- **Type Checking:** TypeScript, mypy, Flow, etc.

### File Organization

- **One responsibility per file**
- **Clear, descriptive file names**
- **Logical grouping by feature or module**
- **Separate concerns (business logic, UI, data access)**

### Naming Conventions

To be established based on project language:

- **Variables:** `camelCase` or `snake_case`
- **Constants:** `UPPER_SNAKE_CASE`
- **Classes:** `PascalCase`
- **Functions:** `camelCase` or `snake_case`
- **Files:** `kebab-case.ext` or `snake_case.ext`

---

## Git Practices

### Commit Messages

Follow conventional commit format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Example:**
```
feat(auth): add user authentication system

Implement JWT-based authentication with login, logout,
and token refresh functionality.

Closes #123
```

### Best Practices

1. **Atomic Commits:** Each commit should represent one logical change
2. **Meaningful Messages:** Explain WHY, not just WHAT
3. **Regular Commits:** Commit frequently with working code
4. **Review Before Commit:** Always review changes with `git diff`
5. **Never Force Push:** Avoid `git push --force` to shared branches
6. **Keep History Clean:** Use `git rebase` for local branches if needed

### Git Safety

- **NEVER** commit secrets, API keys, or credentials
- **NEVER** commit `.env` files with sensitive data
- **ALWAYS** review `.gitignore` before first commit
- **ALWAYS** run tests before pushing
- **AVOID** committing commented-out code

---

## Testing Strategy

### Testing Principles

1. **Write Tests First:** Consider TDD approach
2. **Test Coverage:** Aim for >80% coverage for critical code
3. **Test Types:**
   - **Unit Tests:** Test individual functions/methods
   - **Integration Tests:** Test component interactions
   - **End-to-End Tests:** Test complete user workflows

### Testing Structure

```
tests/
├── unit/              # Unit tests
├── integration/       # Integration tests
├── e2e/              # End-to-end tests
├── fixtures/         # Test data
└── helpers/          # Test utilities
```

### Running Tests

To be defined based on chosen testing framework:

```bash
# Example commands (adjust based on actual setup)
npm test              # Run all tests
npm run test:unit     # Unit tests only
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

---

## Documentation Standards

### Code Documentation

1. **Public APIs:** Document all public functions, classes, and methods
2. **Complex Logic:** Add inline comments explaining non-obvious code
3. **TODOs:** Use `TODO:` comments for future improvements
4. **FIXMEs:** Use `FIXME:` for known issues

### Documentation Files

- **README.md:** Project overview, setup, and usage instructions
- **CLAUDE.md:** This file - AI assistant guide
- **CONTRIBUTING.md:** Contribution guidelines
- **CHANGELOG.md:** Version history and changes
- **API.md:** API documentation (if applicable)

### Documentation Format

Use clear, well-structured markdown with:
- Descriptive headings
- Code examples
- Tables for structured data
- Links to relevant sections

---

## AI Assistant Guidelines

### Working with AI Assistants

This section provides guidance for AI assistants (like Claude) working on this codebase.

#### Core Principles

1. **Understand Before Acting:** Always explore and understand existing code before making changes
2. **Consistency:** Match existing code style and patterns
3. **Safety First:** Never introduce security vulnerabilities
4. **Test Everything:** Ensure changes don't break existing functionality
5. **Document Changes:** Update documentation when modifying behavior

#### Workflow for AI Assistants

1. **Analyze Request:** Understand what's being asked
2. **Explore Codebase:** Use search tools to find relevant code
3. **Plan Changes:** Create todo list for complex tasks
4. **Implement:** Make changes following conventions
5. **Test:** Verify changes work as expected
6. **Document:** Update docs if needed
7. **Commit:** Create clear commit messages
8. **Report:** Explain what was done and why

#### Tool Usage Preferences

- **File Search:** Use Task tool with Explore agent for broad searches
- **Code Search:** Use Grep for specific patterns
- **File Reading:** Use Read tool, not cat commands
- **File Editing:** Use Edit tool, not sed/awk
- **File Creation:** Use Write tool, not echo/heredoc

#### Common Pitfalls to Avoid

- ❌ Don't make assumptions about code structure
- ❌ Don't introduce breaking changes without discussion
- ❌ Don't commit without testing
- ❌ Don't ignore existing patterns
- ❌ Don't skip error handling
- ❌ Don't leave debug code in commits

#### Best Practices

- ✅ Always read existing code before modifying
- ✅ Match the existing code style
- ✅ Add tests for new functionality
- ✅ Update documentation when needed
- ✅ Use descriptive variable and function names
- ✅ Handle edge cases and errors
- ✅ Ask for clarification when unsure

---

## Common Tasks

### Initial Project Setup

When setting up a new project, consider these steps:

1. **Initialize Dependencies:**
   ```bash
   # Node.js
   npm init -y

   # Python
   python -m venv venv
   pip install -r requirements.txt

   # Go
   go mod init github.com/username/project
   ```

2. **Setup .gitignore:**
   - Add language-specific patterns
   - Include build artifacts
   - Exclude sensitive files
   - Ignore IDE-specific files

3. **Configure Linting/Formatting:**
   - Install linter for chosen language
   - Configure formatting rules
   - Add pre-commit hooks

4. **Setup Testing:**
   - Choose testing framework
   - Create test directory structure
   - Configure test runner
   - Add CI/CD for automated testing

5. **Create Documentation:**
   - Write comprehensive README.md
   - Document setup instructions
   - Add usage examples
   - Include contribution guidelines

### Adding a New Feature

1. Create feature branch: `git checkout -b feature/feature-name`
2. Implement feature with tests
3. Update documentation
4. Commit changes with clear messages
5. Push and create pull request

### Fixing a Bug

1. Create bug fix branch: `git checkout -b fix/bug-description`
2. Write test that reproduces the bug
3. Fix the bug
4. Verify test now passes
5. Commit and push

### Refactoring Code

1. Ensure comprehensive tests exist
2. Make small, incremental changes
3. Run tests after each change
4. Keep commits atomic and focused
5. Document reasons for refactoring

---

## Troubleshooting

### Common Issues

#### Git Issues

**Problem:** Unable to push to remote
```bash
# Solution: Ensure branch name is correct
git branch --show-current
git push -u origin <branch-name>
```

**Problem:** Merge conflicts
```bash
# Solution: Fetch latest, resolve conflicts
git fetch origin
git merge origin/main
# Resolve conflicts in files
git add .
git commit -m "Resolve merge conflicts"
```

#### Build Issues

To be defined based on project setup.

#### Test Failures

1. Run tests locally to reproduce
2. Check recent changes that might cause failure
3. Review test output for specific errors
4. Fix code or update tests as needed
5. Verify all tests pass before committing

---

## Project Evolution

### Next Steps for This Repository

As this is a new repository, consider these initial steps:

1. **Define Project Purpose:**
   - What problem does Thinker solve?
   - Who are the target users?
   - What are the core features?

2. **Choose Technology Stack:**
   - Programming language
   - Framework/libraries
   - Database (if needed)
   - Build tools

3. **Setup Development Environment:**
   - Package manager configuration
   - Linting and formatting tools
   - Testing framework
   - CI/CD pipeline

4. **Create Initial Structure:**
   - Source code directories
   - Test directories
   - Documentation folders
   - Configuration files

5. **Establish Conventions:**
   - Coding standards
   - Git workflow
   - Review process
   - Release process

### Updating This Document

This CLAUDE.md file should be updated:

- When project structure changes
- When new conventions are established
- When workflows are modified
- When new tools are added
- At least once per major version

**To update:** Modify this file and commit with message: `docs(claude): update AI assistant guidelines`

---

## Additional Resources

### Documentation

- [README.md](./README.md) - Project overview (to be created)
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines (to be created)
- [LICENSE](./LICENSE) - Project license (to be created)

### External Resources

- Git Best Practices: https://git-scm.com/book/en/v2
- Semantic Versioning: https://semver.org/
- Conventional Commits: https://www.conventionalcommits.org/

---

## Contact & Support

**Repository:** https://github.com/Jayesh1512/Thinker

For questions or issues:
1. Check existing documentation
2. Search closed issues
3. Open a new issue with detailed description

---

## Version History

### v1.0.0 - 2025-11-16
- Initial CLAUDE.md creation
- Established base structure and guidelines
- Ready for project initialization

---

**Note to AI Assistants:** This document is your primary guide for working with this codebase. Always refer to it before making significant changes. When in doubt, ask for clarification rather than making assumptions. Keep this document updated as the project evolves.
