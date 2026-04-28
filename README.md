# Smart Task Manager

A production-minded task management application built with **React, TypeScript, and modern front-end engineering patterns**, designed to demonstrate scalable UI architecture, reusable component design, accessibility, and thoughtful state management.

> **Audience:** Hiring managers, engineers, and developers interested in implementation quality as much as feature completeness.

---

## Overview

Smart Task Manager started as a simple productivity app and evolved into an exploration of **production-grade front-end engineering decisions**:

- How should task state be modeled and updated?
- When is memoization worth introducing?
- How do you build reusable form controls that scale?
- How can a small application still reflect real-world engineering discipline?

The project intentionally goes beyond CRUD by emphasizing:

- Reusable component architecture
- Type-safe design system constants
- Accessibility-conscious interactions
- Internationalization support
- Local persistence
- Performance tradeoff analysis

---

## Features

### Core Task Management

- Add tasks with:
  - Priority selection (High / Medium / Low)
  - Due dates

- Toggle completion state
- Delete tasks
- Filter tasks:
  - All
  - Active
  - Completed

- Search tasks by text

---

## Advanced UI Features

### Priority Selector

Custom segmented radio-group priority control with:

- Keyboard and ARIA support
- Reusable sizing system
- Error state handling
- Visual state indicators

---

### Due Date Picker

Custom date picker with:

- Responsive popover positioning
- Overdue detection
- Clear-date action
- Validation state support
- Shared design-system sizing model

---

## Internationalization (i18n)

Supports:

- English
- Spanish

Implemented using a custom translation hook and locale constants.

Example concerns addressed:

- Dynamic translated labels
- Locale-specific date formatting
- Runtime language switching

---

## Persistence

Tasks persist in browser storage using a storage abstraction:

- Load persisted tasks at initialization
- Persist updates automatically
- Encapsulated storage utilities

---

# Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

## Architecture Patterns

- Custom Hooks
- Controlled Components
- Derived State
- Immutable Updates
- Design-System Constants

---

# Architecture

## Component Structure

```text
App
├── TaskInput
├── FilterBar
├── SearchInput
└── TaskList
    └── TaskItem
        ├── PrioritySelector
        └── DueDatePicker
```

---

## State Ownership

Task state is managed through a custom hook:

```ts
useTasks();
```

Responsibilities:

- Task creation
- Task mutation
- Persistence
- Encapsulation of update logic

This keeps `App` focused on orchestration and rendering.

---

## Data Flow

Unidirectional flow:

```text
User Action
→ Component Event
→ useTasks mutation handler
→ Immutable state update
→ React re-render
→ Updated UI
```

---

# Key Engineering Decisions

## 1. Immutable Array Updates vs Normalized State

Current implementation uses array-based immutable updates:

```ts
prev.map((task) =>
  task.id === id ? { ...task, completed: !task.completed } : task,
);
```

Why:

- Simple and idiomatic for this scale
- Efficient enough for small/medium collections
- Preserves object identity for memoization if needed

Tradeoff discussed:

- For large-scale entities, a normalized `byId + allIds` model may be preferable.

---

## 2. Memoization Tradeoff Analysis

This project intentionally explores when _not_ to overuse:

- `useCallback`
- `useMemo`
- `React.memo`

Key conclusion:

> Memoization should be driven by measured render pressure, not applied by default.

For small lists, simplicity often beats premature optimization.

---

## 3. Design System Constants + Derived Types

Instead of duplicating literal unions:

```ts
"small" | "medium" | "large";
```

sizes are modeled via:

```ts
export const SIZE = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;
```

with derived TypeScript unions.

Benefits:

- Single source of truth
- Better autocomplete
- Reduced drift between values and types

---

## 4. Reusable Form Abstractions

The project emphasizes reusable field-level behavior:

- Shared validation patterns
- Shared sizing semantics
- Consistent component contracts

This mirrors production UI system thinking.

---

# Accessibility

Accessibility considerations include:

- ARIA roles for radio groups
- `aria-invalid` support
- `aria-describedby` support
- Accessible labels
- Semantic buttons and form controls
- Keyboard-friendly native date input

Accessibility was treated as a feature, not an afterthought.

---

# Performance Considerations

Evaluated:

- Render propagation across task rows
- React memoization behavior
- Referential stability tradeoffs
- Strict Mode double-render debugging

Used render tracing and console instrumentation to validate assumptions.

---

## Example Discussion Topics (Interview Focus)

This project is intentionally structured to support deeper engineering discussion around:

- React rendering model
- Prop identity and memoization
- Custom hook design
- UI component abstraction
- Type modeling in TypeScript
- Design-system consistency

---

# Project Structure

```text
src/
├── components/
│   ├── TaskInput
│   ├── TaskList
│   ├── TaskItem
│   ├── PrioritySelector
│   ├── DueDatePicker
│   ├── FilterBar
│   └── SearchInput
│
├── hooks/
│   ├── useTasks
│   └── useI18n
│
├── types/
├── constants/
└── utils/
```

---

# Running Locally

## Install

```bash
npm install
```

## Start Dev Server

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

---

# Future Enhancements

Potential production evolutions:

## Product Features

- Drag-and-drop prioritization
- Recurring tasks
- Tags and categories
- Task sorting
- Notifications/reminders
- Calendar view
- Sync backend/API

---

## Engineering Enhancements

- Test coverage with Vitest + RTL
- Reducer or Zustand-based state modeling
- Row virtualization for large lists
- Component-level performance profiling
- PWA support
- Offline sync

---

# What I’d Improve in Production

If taking this beyond a portfolio project:

I would likely add:

- Persistent backend (Postgres + API)
- Authentication
- Optimistic updates
- Real-time sync
- Server-side validation
- Audit/event model for task history

And likely evaluate moving from local hook state toward a more formal domain model.

---

# Engineering Highlights

Highlights this project intentionally demonstrates:

✅ Typed reusable component APIs
✅ Custom hook-based state management
✅ Accessibility-aware UI controls
✅ Internationalization support
✅ Design-system thinking
✅ Performance tradeoff analysis
✅ Production-style code organization

---

# Why This Project Exists

Many task apps demonstrate features.

This project is intended to demonstrate **engineering judgment.**

Not just:

- Can it work?

But:

- Can it scale?
- Is the abstraction sound?
- Are the tradeoffs intentional?
- Would I want to maintain this code in a real codebase?

---

## Author Notes

This project was built as part of a broader return to software engineering, with emphasis on modern React, TypeScript, scalable front-end patterns, and interview preparation.

Feedback and discussion welcome.

---

## License

MIT
