# Atlas ERP — Design System

> A complete design system for Atlas ERP. Inspired by Linear, Stripe, Vercel, GitHub, and Notion.

---

## Table of Contents

- [Overview](#overview)
- [Brand](#brand)
- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Border Radius](#border-radius)
- [Elevation](#elevation)
- [Borders](#borders)
- [Icons](#icons)
- [Grid & Layout](#grid--layout)
- [Components](#components)
- [Forms](#forms)
- [Tables](#tables)
- [Charts](#charts)
- [Motion](#motion)
- [Accessibility](#accessibility)
- [Responsive](#responsive)
- [Theme](#theme)
- [Design Tokens](#design-tokens)
- [CSS Variables](#css-variables)
- [UI Principles](#ui-principles)
- [UX Guidelines](#ux-guidelines)

---

## Overview

Atlas ERP uses a minimalist, high-contrast design system built on **Tailwind CSS v4**, **shadcn/ui**, **oklch color space**, and **CSS custom properties**. The system prioritizes clarity, consistency, and accessibility across all screen sizes.

**Stack:**

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui (Base UI primitives) |
| Colors | oklch |
| Icons | Lucide React |
| Animation | framer-motion |

---

## Brand

### Personality

| Trait | Description |
|---|---|
| Confident | Assured without arrogance. Reliable at every interaction. |
| Precise | Every pixel, word, and interaction is intentional. |
| Calm | Complex data presented simply. Never overwhelming. |
| Professional | Enterprise-grade without being sterile. |
| Thoughtful | Anticipates user needs. Reduces friction. |

### Voice

- **Writing style:** Direct, clear, action-oriented.
- **Voice:** Knowledgeable colleague, not a manual.
- **Language:** Plain English. Avoid jargon unless domain-specific.
- **Microcopy:** Short labels, helpful hints, forgiving error messages.

---

## Colors

### Palette

All colors are defined in **oklch** for perceptual uniformity.

#### Primary

| Name | Light | Dark | Usage |
|---|---|---|---|
| `--primary` | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` | Buttons, links, active states |
| `--primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.205 0 0)` | Text on primary |

#### Secondary

| Name | Light | Dark | Usage |
|---|---|---|---|
| `--secondary` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Subtle backgrounds, secondary buttons |
| `--secondary-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` | Text on secondary |

#### Muted

| Name | Light | Dark | Usage |
|---|---|---|---|
| `--muted` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Disabled states, subtle backgrounds |
| `--muted-foreground` | `oklch(0.556 0 0)` | `oklch(0.708 0 0)` | Placeholder text, captions |

#### Accent

| Name | Light | Dark | Usage |
|---|---|---|---|
| `--accent` | `oklch(0.97 0 0)` | `oklch(0.269 0 0)` | Hover states, highlights |
| `--accent-foreground` | `oklch(0.205 0 0)` | `oklch(0.985 0 0)` | Text on accent |

#### Destructive

| Name | Light | Dark | Usage |
|---|---|---|---|
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Delete, remove, critical actions |
| `--destructive-foreground` | `oklch(0.985 0 0)` | `oklch(0.985 0 0)` | Text on destructive |

#### Semantic

| Name | Light | Dark | Usage |
|---|---|---|---|
| `--success` | `oklch(0.65 0.19 155)` | `oklch(0.72 0.19 155)` | Success messages, positive values |
| `--success-foreground` | `oklch(0.985 0 0)` | `oklch(0.145 0 0)` | Text on success |
| `--warning` | `oklch(0.75 0.15 75)` | `oklch(0.80 0.15 75)` | Warnings, caution states |
| `--warning-foreground` | `oklch(0.145 0 0)` | `oklch(0.145 0 0)` | Text on warning |
| `--info` | `oklch(0.55 0.15 250)` | `oklch(0.65 0.15 250)` | Informational, neutral highlights |
| `--info-foreground` | `oklch(0.985 0 0)` | `oklch(0.985 0 0)` | Text on info |

#### Surface

| Name | Light | Dark | Usage |
|---|---|---|---|
| `--background` | `oklch(1 0 0)` | `oklch(0.145 0 0)` | Page background |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Default text |
| `--card` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | Card backgrounds |
| `--card-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Card text |
| `--popover` | `oklch(1 0 0)` | `oklch(0.205 0 0)` | Dropdowns, popovers |
| `--popover-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Popover text |

#### Border & Input

| Name | Light | Dark | Usage |
|---|---|---|---|
| `--border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` | Default borders |
| `--input` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 15%)` | Input field borders |
| `--ring` | `oklch(0.708 0 0)` | `oklch(0.556 0 0)` | Focus rings |

#### Chart

| Name | Light | Dark | Usage |
|---|---|---|---|
| `--chart-1` | `oklch(0.646 0.222 41.116)` | `oklch(0.646 0.222 41.116)` | Chart series 1 |
| `--chart-2` | `oklch(0.6 0.118 184.704)` | `oklch(0.6 0.118 184.704)` | Chart series 2 |
| `--chart-3` | `oklch(0.398 0.07 227.392)` | `oklch(0.398 0.07 227.392)` | Chart series 3 |
| `--chart-4` | `oklch(0.828 0.189 84.429)` | `oklch(0.828 0.189 84.429)` | Chart series 4 |
| `--chart-5` | `oklch(0.769 0.188 70.08)` | `oklch(0.769 0.188 70.08)` | Chart series 5 |

---

## Typography

### Font Stack

| Token | Font | Usage |
|---|---|---|
| `--font-sans` | Geist Sans, system-ui, sans-serif | Body, UI text |
| `--font-mono` | Geist Mono, monospace | Code, data, IDs |

### Scale

| Name | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `text-xs` | 12px / 0.75rem | 400 | 1.5 | Captions, helper text |
| `text-sm` | 14px / 0.875rem | 400 | 1.5 | Secondary text, labels |
| `text-base` | 16px / 1rem | 400 | 1.5 | Body text, inputs |
| `text-lg` | 18px / 1.125rem | 400 | 1.5 | Lead paragraphs |
| `text-xl` | 20px / 1.25rem | 600 | 1.5 | Section headings |
| `text-2xl` | 24px / 1.5rem | 700 | 1.4 | Page titles |
| `text-3xl` | 30px / 1.875rem | 700 | 1.3 | Hero headings |

### Rules

- Never set font size below `12px`
- Body text line height: `1.5`
- Headings line height: `1.3` — `1.4`
- Letter spacing: `0` for body, `-0.01em` to `-0.02em` for headings
- Maximum line width for body: `65ch`

---

## Spacing

### Scale

| Token | Value | Usage |
|---|---|---|
| `--spacing-0` | `0px` | Reset |
| `--spacing-px` | `1px` | Hairline borders |
| `--spacing-0-5` | `2px` | Tight inner spacing |
| `--spacing-1` | `4px` | Minimal gap |
| `--spacing-1-5` | `6px` | Compact elements |
| `--spacing-2` | `8px` | Default inner spacing |
| `--spacing-2-5` | `10px` | Small gaps |
| `--spacing-3` | `12px` | Medium inner spacing |
| `--spacing-3-5` | `14px` | Medium gaps |
| `--spacing-4` | `16px` | Standard spacing |
| `--spacing-5` | `20px` | Comfortable spacing |
| `--spacing-6` | `24px` | Section spacing |
| `--spacing-7` | `28px` | Large gaps |
| `--spacing-8` | `32px` | Section padding |
| `--spacing-9` | `36px` | Card spacing |
| `--spacing-10` | `40px` | Large sections |
| `--spacing-12` | `48px` | Major sections |
| `--spacing-14` | `56px` | Page sections |
| `--spacing-16` | `64px` | Page breaks |
| `--spacing-20` | `80px` | Hero spacing |
| `--spacing-24` | `96px` | Maximum spacing |

### Rules

- Always use spacing tokens, never raw pixel values
- Consistent rhythm: maintain vertical spacing rhythm throughout pages
- Component internal: `spacing-2` to `spacing-4`
- Between components: `spacing-6` to `spacing-8`
- Section breaks: `spacing-12` to `spacing-16`

---

## Border Radius

### Scale

| Token | Calculation | Usage |
|---|---|---|
| `--radius` | `0.625rem` (10px) | Base radius |
| `--radius-sm` | `radius × 0.6` | Badges, chips |
| `--radius-md` | `radius × 0.8` | Buttons, inputs |
| `--radius-lg` | `radius` | Cards, panels |
| `--radius-xl` | `radius × 1.4` | Modals, large cards |
| `--radius-2xl` | `radius × 1.8` | Feature cards |
| `--radius-3xl` | `radius × 2.2` | Hero sections |
| `--radius-4xl` | `radius × 2.6` | Avatars, circular |

### Rules

- All interactive elements: `--radius-md` or `--radius-lg`
- Inputs and buttons: `--radius-md` (8px)
- Cards and panels: `--radius-lg` (10px)
- Modals and dialogs: `--radius-xl` (14px)
- Never use `rounded-full` for cards or panels

---

## Elevation

### Levels

| Level | Usage | CSS |
|---|---|---|
| 0 | Base / flat | `none` |
| 1 | Subtle lift (dropdowns) | `0 1px 3px oklch(0 0 0 / 8%)` |
| 2 | Medium lift (modals) | `0 4px 12px oklch(0 0 0 / 12%)` |
| 3 | High lift (toasts) | `0 8px 24px oklch(0 0 0 / 16%)` |
| 4 | Maximum (drag) | `0 16px 48px oklch(0 0 0 / 20%)` |

### Rules

- Dark mode: reduce shadow opacity by 50%
- Combine with subtle borders for definition
- Never use drop shadows on images
- Use `shadow-sm` for cards, `shadow-md` for popovers, `shadow-lg` for modals

---

## Borders

### Default

| Token | Light | Dark |
|---|---|---|
| `--border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` |
| `--input` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 15%)` |

### Rules

- Default border width: `1px`
- Use `--input` for form field borders
- Use `--border` for structural dividers
- Avoid borders when spacing alone can separate content
- Border style: always `solid`

---

## Icons

### Library

**Lucide React** — consistent, minimal, 1.5px stroke weight.

### Sizes

| Context | Size | Class |
|---|---|---|
| Inline text | 16px | `size-4` |
| Buttons | 16px | `size-4` |
| Navigation | 20px | `size-5` |
| Feature highlights | 24px | `size-6` |
| Empty states | 48px | `size-12` |

### Rules

- Always use consistent stroke width (1.5px)
- Pair icons with labels when possible
- Never use icons alone for critical actions
- Icon color inherits from text color unless semantic

---

## Grid & Layout

### Page Grid

| Breakpoint | Columns | Margin | Gutter |
|---|---|---|---|
| Mobile (< 640px) | 4 | 16px | 16px |
| Tablet (640px — 1024px) | 8 | 32px | 24px |
| Desktop (> 1024px) | 12 | Auto (centered) | 24px |
| Wide (> 1440px) | 12 | Auto (centered) | 32px |

### Layout Patterns

- **Sidebar + Content:** `240px` sidebar, fluid content area
- **Topbar + Content:** `56px` topbar, fluid content area
- **Split views:** 50/50 or 33/67 ratios
- **Content max-width:** `1280px` for main content
- **Form max-width:** `480px`
- **Card max-width:** `380px`

---

## Components

### Button

| Variant | Usage |
|---|---|
| `default` | Primary actions (Submit, Save, Create) |
| `secondary` | Alternative actions (Cancel, Close) |
| `outline` | Tertiary actions, social logins |
| `ghost` | Navigation, toolbar actions |
| `destructive` | Delete, remove, irreversible actions |
| `link` | Inline navigation |

Sizes: `sm` (32px), `default` (40px), `lg` (48px), `icon` (40×40px).

### Input

- Height: `40px` (default), `32px` (sm)
- Border: `--input` token
- Focus ring: `--ring` token, `2px` offset
- Placeholder color: `--muted-foreground`
- Error state: `--destructive` border + `FieldError`

### Checkbox

- Built on `@base-ui/react/checkbox`
- Size: `16px` with `2px` border radius
- Focus ring: `--ring` token

### Card

- Background: `--card`
- Border: `--border`, `1px` solid
- Radius: `--radius-lg`
- Padding: `spacing-6`
- Shadow: `shadow-sm` (default), `shadow-md` (hover)

---

## Forms

### Layout

- Use `FieldGroup` for vertical stacking
- Use `FieldLabel` for all inputs
- Use `FieldError` for validation messages
- Use `FieldSeparator` for visual dividers
- Maximum form width: `480px`

### Validation

- Validate on blur for text fields
- Validate on change for checkboxes
- Show errors inline below the field
- Use `aria-invalid` for screen readers
- Disable submit button during async validation

### Accessibility

- Every input must have a visible label
- Use `htmlFor` / `id` pairing
- Error messages must be associated via `aria-describedby`
- Password toggles must have `aria-label`

---

## Tables

### Structure

- Header: `--muted` background, `text-sm font-medium`
- Rows: `--card` background, `--border` bottom
- Hover: `--accent` background
- Padding: `spacing-3` horizontal, `spacing-2` vertical

### Rules

- Sticky header on scroll
- Sortable columns: cursor pointer + sort indicator
- Empty state with illustration and CTA
- Responsive: horizontal scroll on mobile

---

## Charts

### Colors

Use chart tokens (`--chart-1` through `--chart-5`) in sequence.

### Rules

- Grid lines: `--border`, dashed
- Axis labels: `text-xs`, `--muted-foreground`
- Tooltips: `--popover` background, `shadow-md`
- Animations: `duration-normal` entrance
- Responsive: stack vertically on mobile

---

## Motion

### Duration

| Token | Value | Usage |
|---|---|---|
| `--duration-micro` | `100ms` | Hover feedback, opacity changes |
| `--duration-quick` | `200ms` | Button presses, toggles |
| `--duration-normal` | `300ms` | Panel slides, content transitions |
| `--duration-slow` | `400ms` | Page transitions, complex animations |

### Easing

| Token | Curve | Usage |
|---|---|---|
| `--ease-default` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | General transitions |
| `--ease-in` | `cubic-bezier(0.55, 0.055, 0.675, 0.19)` | Exiting elements |
| `--ease-out` | `cubic-bezier(0.215, 0.61, 0.355, 1)` | Entering elements |
| `--ease-in-out` | `cubic-bezier(0.645, 0.045, 0.355, 1)` | Expanding elements |

### Rules

- Never animate layout properties (width, height, padding)
- Prefer `transform` and `opacity` for performance
- Reduce motion for `prefers-reduced-motion`
- Page transitions: `duration-normal` + `ease-out`
- Staggered lists: `50ms` delay between items
- Loading states: `1s` pulse cycle

---

## Accessibility

### Requirements

- WCAG 2.1 AA minimum, AAA for text contrast
- Color contrast: `4.5:1` for text, `3:1` for large text
- All interactive elements must have visible focus indicators
- Keyboard navigation: logical tab order
- Screen reader labels on all icon-only buttons

### ARIA

- Use `aria-label` for icon buttons
- Use `aria-invalid` on invalid inputs
- Use `aria-describedby` for error messages
- Use `aria-expanded` for dropdowns
- Use `role="alert"` for error toasts

### Focus Management

- Focus ring: `2px` offset using `--ring` color
- Visible on keyboard focus only (not mouse click)
- Trap focus in modals and dialogs
- Return focus on close

---

## Responsive

### Breakpoints

| Name | Min Width | Usage |
|---|---|---|
| `sm` | 640px | Tablet |
| `md` | 768px | Small desktop |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |
| `2xl` | 1440px | Wide screens |

### Rules

- Mobile-first: base styles for mobile, add complexity up
- Sidebar: collapse to hamburger on `< lg`
- Tables: horizontal scroll on `< md`
- Forms: full-width on mobile, centered on desktop
- Grid: reduce columns on smaller screens
- Touch targets: minimum `44px` on mobile

---

## Theme

### Light Mode

- Background: `oklch(1 0 0)` — pure white
- Text: `oklch(0.145 0 0)` — near black
- Borders: `oklch(0.922 0 0)` — light gray

### Dark Mode

- Background: `oklch(0.145 0 0)` — near black
- Text: `oklch(0.985 0 0)` — near white
- Borders: `oklch(1 0 0 / 10%)` — translucent white

### System Preference

Use `prefers-color-scheme` media query. Default to light mode.

---

## Design Tokens

### Hierarchy

```
Primitive tokens (raw values)
  → Semantic tokens (purpose)
    → Component tokens (usage)
```

### Naming

- **Primitive:** `--color-blue-500`
- **Semantic:** `--primary`, `--destructive`, `--success`
- **Component:** `--button-bg`, `--input-border`

### Where to Use

| Context | Token Type |
|---|---|
| New component | Semantic tokens |
| Theme customization | Semantic tokens |
| One-off override | Primitive tokens |
| Third-party integration | Primitive tokens |

---

## CSS Variables

All design tokens are defined as CSS custom properties in `app/globals.css` under `:root` and `.dark`.

```css
:root {
  /* Background */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);

  /* Card */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);

  /* Primary */
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);

  /* Destructive */
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);

  /* Success */
  --success: oklch(0.65 0.19 155);
  --success-foreground: oklch(0.985 0 0);

  /* Warning */
  --warning: oklch(0.75 0.15 75);
  --warning-foreground: oklch(0.145 0 0);

  /* Info */
  --info: oklch(0.55 0.15 250);
  --info-foreground: oklch(0.985 0 0);

  /* Border */
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);

  /* Radius */
  --radius: 0.625rem;

  /* Spacing */
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;

  /* Z-Index */
  --z-dropdown: 50;
  --z-sticky: 100;
  --z-overlay: 200;
  --z-modal: 300;
  --z-popover: 400;
  --z-toast: 500;
  --z-tooltip: 600;

  /* Animation */
  --duration-micro: 100ms;
  --duration-quick: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 400ms;

  /* Easing */
  --ease-default: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);

  /* Opacity */
  --opacity-disabled: 0.5;
  --opacity-muted: 0.5;
  --opacity-overlay: 0.5;
  --opacity-subtle: 0.05;
}
```

---

## UI Principles

1. **Clarity over complexity** — Simplify the complex.
2. **Consistency everywhere** — Same patterns, same behavior.
3. **Accessible by default** — Built for everyone.
4. **Performance matters** — Fast is a feature.
5. **Data with dignity** — Numbers tell stories. Present them respectfully.
6. **Progressive disclosure** — Show only what's needed, when needed.
7. **Forgiving interfaces** — Easy to undo, hard to make mistakes.
8. **Meaningful animation** — Every motion has a purpose.

---

## UX Guidelines

- **Loading states:** Use skeleton screens, not spinners, for content areas
- **Empty states:** Always provide a clear CTA
- **Error recovery:** Show what went wrong and how to fix it
- **Confirmation:** Confirm destructive actions with a dialog
- **Feedback:** Immediate feedback for all user actions
- **Progress:** Show progress for operations > 3 seconds
- **Autosave:** Save drafts automatically where possible
- **Keyboard:** Full keyboard navigation support

---

> **Atlas ERP Design System** — Built with precision. Scaled with purpose.
