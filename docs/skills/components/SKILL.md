---
name: components
description: Comprehensive guidelines, component catalogue, API references, and usage rules for building UIs with BrandField, shared widgets, Shadcn/Radix UI primitives, and dashboard layouts in this Laravel Inertia React application.
---

# UI Components & Design System Skill

This skill provides full documentation, architectural rules, and code patterns for working with UI components across this Laravel 12 + Inertia v3 + React 19 application.

## 1. Architectural Overview & Component Taxonomy

All frontend components live inside `resources/js/components/` and are organized into six clear domains:

| Directory | Purpose | Key Examples |
|---|---|---|
| `BrandField/` | High-level enterprise form controls with built-in labels, icons, error handling, counters, and accessibility. | `BrandField`, `BrandFieldSearchSelect`, `BrandSingleFile`, `BrandMultipleFile`, `BrandButton`, `BrandBadge`, `BrandRadioGroup`, `BrandSwitch`, `BrandOTPInput` |
| `shared/` | Shared application-level composite widgets and dialogs. | `Modal` (Responsive Dialog/Drawer), `DeleteAlert`, `ConfirmModal`, `Heading`, `Pagination`, `appToast` (Sonner), `YesNoBadge` |
| `ui/` | Low-level design system primitives (Radix UI + Tailwind CVA variants). | `Button`, `Badge`, `Input`, `Textarea`, `Checkbox`, `Card`, `Dialog`, `Drawer`, `DropdownMenu`, `Select`, `Switch`, `Tooltip`, etc. |
| `dashboard/` | Application shells, responsive navigation, sidebars, and account dropdowns. | `AppShell`, `AppSidebar`, `AppHeader`, `Breadcrumbs`, `NavMain`, `NavUser` |
| `security/` | Two-factor authentication, WebAuthn/Passkey registration, and recovery credentials. | `ManagePasskeys`, `ManageTwoFactor`, `TwoFactorSetupModal` |
| `products/` | E-commerce / catalog domain-specific UI cards. | `ProductCard` |

---

## 2. Form Building Golden Rules

When creating forms in this application, adhere to the following standards:

1. **Prefer `BrandField` over raw `<input>`**:
   `BrandField` encapsulates consistent typography, dark mode gradients, label association, leading prefix icons, trailing action buttons (like password visibility toggle), character counters, and error presentation.
2. **Use Single Reactive State Object**:
   For complex forms, keep one master state object (e.g. `const [values, setValues] = useState<FormValues>(initialValues);`) and a typed setter (`setField(key, value)`).
3. **Pure Validation Functions**:
   Compute validation errors dynamically via `useMemo(() => validate(values), [values])` to prevent stale error states.
4. **Accessible Error Messages**:
   Pass error strings to the `error` prop on `BrandField` or `BrandFieldSearchSelect`. Ensure inputs display `aria-invalid` and `role="alert"` on error text.
5. **Form File Handling**:
   Use `FormSingleFileUpload` for avatars/documents and `FormMultipleFileUpload` for bulk uploads, capturing bubbling changes via `<CaptureChange>`.

---

## 3. BrandField Components Guide

### `BrandField`
- **Import**: `import { BrandField } from "@/components/BrandField/BrandField";`
- **Types**: `'text' | 'email' | 'password' | 'search' | 'url' | 'tel' | 'number' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'year' | 'textarea'`
- **Props**:
  - `label`: `ReactNode` — Label text above the input
  - `leftIcon`: `ReactNode` — Prefix icon (e.g. `<Mail className="size-4" />`)
  - `rightAction`: `ReactNode` — Suffix button (e.g. password toggle)
  - `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
  - `variant`: `'default' | 'filled' | 'ghost'` (default: `'default'`)
  - `showCount`: `boolean` — Live character counter (when `maxLength` is set)
  - `maxLength`: `number` — Maximum character length
  - `rows`: `number` — Visible rows for `type="textarea"`
  - `resizable`: `boolean` — Locks textarea resizing when `false`
  - `error`: `ReactNode` — Inline destructive error message
  - `helperText`: `ReactNode` — Subtle helper guidance below the field

### `BrandFieldSearchSelect`
- **Import**: `import { BrandFieldSearchSelect } from "@/components/BrandField/BrandFieldSearchSelect";`
- **Props**:
  - `options`: `Array<{ label: string; value: string }>`
  - `value`: `string | string[]`
  - `onValueChange`: `(value: any) => void`
  - `multiple`: `boolean` — Activates multi-select chips mode
  - `searchPlaceholder`: `string` — Search filter input placeholder
  - `emptyMessage`: `string` — Empty search state text
  - `required`: `boolean`
  - `error`: `ReactNode`

### `BrandButton`
- **Import**: `import { BrandButton } from "@/components/BrandField/BrandButton";`
- **Props**:
  - `theme`: `'blue' | 'lime' | 'green' | 'emerald' | 'red' | 'purple' | 'amber' | 'indigo' | 'zinc' | 'black' | 'gray'`
  - `icon`: `ReactNode` or icon component
  - `isLoading`: `boolean` — Displays spinning loader `ImSpinner6`
  - `toolTipAlign`: `'auto' | 'top' | 'bottom' | 'left' | 'right'`
  - `title`: `string` — Built-in viewport-clamped tooltip text

### `BrandBadge`
- **Import**: `import BrandBadge from "@/components/BrandField/BrandBadge";`
- **Props**:
  - `value`: `string | number` — Value to match against mapped lists
  - `values`: `(string | number)[]`
  - `labels`: `string[]`
  - `tailwindColors`: `ColorKey[]` (`'green' | 'red' | 'blue' | 'amber' | 'gray' | ...`)
  - `pill`: `boolean` — Rounded pill border radius

### `BrandRadioGroup`
- **Import**: `import { BrandRadioGroup } from "@/components/BrandField/BrandRadioGroup";`
- **Props**:
  - `options`: `string[] | Array<{ value: string; label: string }>`
  - `value`: `string`
  - `onChange`: `(value: string) => void`
  - `orientation`: `'horizontal' | 'vertical'`
  - `theme`: color map or array of colors

### `BrandSwitch`
- **Import**: `import { BrandSwitch } from "@/components/BrandField/BrandSwitch";`
- **Props**:
  - `label`: `string`
  - `description`: `string`
  - `checked`: `boolean`
  - `onChange`: `(checked: boolean) => void`

### `BrandOTPInput`
- **Import**: `import { BrandOTPInput } from "@/components/BrandField/BrandOTPInput";`
- **Props**:
  - `length`: `number` (default: `6`)
  - `value`: `string`
  - `onChange`: `(value: string) => void`

---

## 4. Shared Overlays & Dialogs

### `Modal` (Responsive Dialog / Mobile Drawer)
- **Import**: `import { Modal } from "@/components/shared/modal";`
- **Behavior**: Automatically renders Radix `Dialog` on desktop (`min-width: 768px`) and a Vaul `Drawer` on mobile devices.
- **Props**:
  - `isOpen`: `boolean`
  - `onClose`: `() => void`
  - `title`: `ReactNode`
  - `description`: `ReactNode`
  - `maxWidth`: `'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'`
  - `footer`: `ReactNode` (action buttons)

### `DeleteAlert`
- **Import**: `import DeleteAlert from "@/components/shared/delete-alert";`
- Self-contained modal prompt for verifying destructive record deletions.

### `appToast` (Sonner Wrapper)
- **Import**: `import { appToast } from "@/components/shared/toast";`
- **Methods**:
  - `appToast.success(title, description?)`
  - `appToast.warning(title, description?)`
  - `appToast.error(title, description?)`
  - `appToast.info(title, description?)`
  - `appToast.loading(title, description?)` -> returns toast ID
  - `appToast.dismiss(id?)`

---

## 5. UI Primitives (`@/components/ui`)

Constructed using Shadcn UI standards, Radix primitives, and `class-variance-authority`:

- **`Button`**: `variant`: `'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'`. `size`: `'default' | 'sm' | 'lg' | 'icon'`.
- **`Badge`**: `variant`: `'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'`.
- **`Card`**: Subcomponents `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
- **`Checkbox`**: Accessible toggle based on `@radix-ui/react-checkbox`.
- **`DropdownMenu`**: Full Radix dropdown system with items, triggers, and separators.
- **`Table`**: Structured standard HTML5 table styled with responsive overflow wrappers and muted header backgrounds.

---

## 6. Viewport-Locked Split-Screen Layout Pattern

When designing documentation, component showcases, or dual-pane dashboard editors:

### Core Requirements
1. **Zero Window-Level Scrolling**: The entire page must fit strictly inside the browser viewport without causing the window body to scroll.
2. **Fixed Navigation Sidebar**: The left sidebar stays anchored within the viewport. Its search input remains pinned at the top, and its category navigation list can scroll internally (`overflow-y-auto`) if items exceed screen height.
3. **Independently Scrollable Content Area**: The right pane (`<main>`) handles all vertical scrolling for documentation and forms.

### Exact Implementation Pattern

```tsx
export default function DualPanePage() {
    return (
        /* Root container accounts for dashboard header (4rem / 64px) to prevent body scroll */
        <div className="flex h-[calc(100svh-4rem)] max-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-background">
            {/* 1. Compact Top Bar (Pinned) */}
            <header className="h-12 shrink-0 border-b border-border bg-card px-4 sm:px-6 flex items-center justify-between z-10">
                <h1 className="text-sm font-bold">Documentation & Showcase</h1>
                <div className="flex items-center gap-2">
                    <Button size="sm">Save</Button>
                </div>
            </header>

            {/* 2. Split Body (min-h-0 prevents flex children from expanding parent) */}
            <div className="flex flex-1 min-h-0 overflow-hidden">
                {/* 3. Left Sidebar (Fixed in viewport, never scrolls off-screen) */}
                <aside className="w-60 sm:w-68 shrink-0 border-r border-border bg-card flex flex-col h-full overflow-hidden">
                    {/* Search pinned at top */}
                    <div className="p-2.5 border-b border-border shrink-0">
                        <input
                            type="search"
                            placeholder="Search..."
                            className="h-8 w-full rounded-lg border px-2.5 text-xs outline-none"
                        />
                    </div>

                    {/* Nav list scrolls internally if items exceed available height */}
                    <nav className="flex-1 overflow-y-auto p-2 space-y-3" aria-label="Navigation">
                        {/* Categorized menu buttons */}
                    </nav>

                    {/* Footer pinned at bottom */}
                    <div className="p-2.5 border-t border-border shrink-0 text-[10px]">
                        Status: Ready
                    </div>
                </aside>

                {/* 4. Right Content Area (Only this pane scrolls) */}
                <main className="flex-1 h-full overflow-y-auto p-4 sm:p-5 lg:p-6 space-y-5 bg-background">
                    {/* Documentation & interactive form components */}
                </main>
            </div>
        </div>
    );
}
```

### Critical CSS Properties
- `h-[calc(100svh-4rem)] max-h-[calc(100svh-4rem)]`: Deducts `h-16` (4rem) of `AppSidebarHeader` from viewport height `100svh`.
- `min-h-0`: Forces flex items to respect the bounded container height instead of defaulting to `min-height: auto`.
- `overflow-hidden` on parent container: Eliminates window-level scrollbars.
- `overflow-y-auto` on `<main>`: Restricts scrolling strictly to the right content pane.

---

## 7. Interactive Showcase & Documentation Page Design Skill

The pattern demonstrated in `resources/js/pages/example.tsx` is the gold standard for component showcases, documentation browsers, and multi-step complex form editors in this application.

### Key Architectural Pillars

1. **Categorized Menu Data Model**:
   Store category navigation in a typed `MenuItem[]` array containing:
   - `id`: unique tab identifier.
   - `title`: human-readable label.
   - `category`: grouping header (e.g. `Inputs & Text`, `Selection & Choices`).
   - `componentName` & `importPath`: for self-documenting code banners.
   - `keywords`: array of search synonyms (e.g. `["password", "lock", "security"]`).
   - `fieldKeys`: list of form state keys belonging to this section.
   - `exampleCode`: copyable TSX usage snippet.
   - `propsList`: array of `{ name, type, desc }`.

2. **Real-Time Client-Side Search Filter**:
   Filter menu items seamlessly using `useMemo`:
   ```ts
   const filteredMenuItems = useMemo(() => {
       const query = searchQuery.trim().toLowerCase();
       if (!query) return menuItems;
       return menuItems.filter((item) =>
           item.title.toLowerCase().includes(query) ||
           item.description.toLowerCase().includes(query) ||
           item.category.toLowerCase().includes(query) ||
           item.keywords.some((kw) => kw.toLowerCase().includes(query))
       );
   }, [searchQuery]);
   ```

3. **Inline API Documentation Cards (`ComponentDocsCard`)**:
   Render an API & usage reference directly above every interactive component:
   - Component name & category badge.
   - Canonical import path in a monospace tag.
   - Copyable code snippet with a one-click clipboard copy button and toast feedback.
   - Props table outlining available configurations and types.

4. **Autofill Mock Data Testing Pattern (`handleFillSampleData`)**:
   Provide a single-click "Fill Sample" button that hydrates all fields with realistic mock data, allowing users and developers to test form validation and submission without filling dozens of inputs manually.


