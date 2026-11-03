# Component Showcase & Documentation Page Reference

This document provides a comprehensive guide to the architecture, live output, interactive states, and component sections of the **Component Showcase & Documentation Page** ([`resources/js/pages/example.tsx`](file:///home/dev/Desktop/code/chore-repo-standards-and-restructure-laravel/resources/js/pages/example.tsx)).

---

## 1. Page Architecture & Layout Overview

The page is designed as an interactive design system documentation application using a **Viewport-Locked Split-Screen Layout**:

```
+----------------------------------------------------------------------------------------------------+
| Top Header: Title, v2.0 Badge                        [Fill Sample]  [Reset]  [Save All Form Data] |
+------------------------------------+---------------------------------------------------------------+
| LEFT SIDEBAR (Viewport-Locked)     | RIGHT CONTENT PANE (Independently Scrollable)                 |
| - Search Input & Match Counter     | - Active Section Header (Title, Category, Component Name)     |
| - Pinned Category Navigation:      | - Component API & Usage Docs Card (Import, Snippet, Props)    |
|   * Inputs & Text (3)              | - Interactive Component Live Preview & Form Fields            |
|   * Styling & Variants (2)         |                                                               |
|   * Selection & Choices (3)        |                                                               |
|   * Composites & Layouts (1)       |                                                               |
|   * Components & Overlays (3)      |                                                               |
|   * Data & Output (2)              |                                                               |
| - Footer (Validation & Field Count)|                                                               |
+------------------------------------+---------------------------------------------------------------+
```

### Key Layout Behaviors
- **Zero Window Scroll**: The outer container uses `h-[calc(100svh-4rem)] max-h-[calc(100svh-4rem)] overflow-hidden` to perfectly fit beneath the dashboard header (`h-16`) without triggering browser body scrollbars.
- **Fixed Sidebar**: `<aside>` has `w-60 sm:w-68 shrink-0 h-full overflow-hidden flex flex-col`. The search input is pinned at the top and the status footer at the bottom. Only the navigation item list scrolls internally if categories exceed the screen height.
- **Independent Right-Side Scrolling**: `<main>` has `flex-1 h-full overflow-y-auto`, allowing smooth scrolling across component previews and documentation tables.

---

## 2. Top Header & Global Actions

| Action | Icon | Functionality |
|---|---|---|
| **Fill Sample** | `Sparkles` | Populates all 40+ fields with realistic dummy data for instant testing without manual input. |
| **Reset** | `RotateCcw` | Resets all fields back to blank initial values, clears errors, and increments `resetCount` to remount file uploaders. |
| **Save All** | `Save` | Executes form validation across all fields. Displays a Sonner toast error if required fields are missing or saves a state snapshot on success. |

---

## 3. Left Sidebar Navigation & Search

- **Real-Time Search**: Filters menus across category names, titles, descriptions, and component keywords.
- **Active State Indicator**: Highlights the selected item with `bg-primary text-primary-foreground`.
- **Validation Indicator**: If a user submits the form with missing required fields, a pulsating red dot appears next to every menu containing errors.
- **Counter Badges**: Each menu item displays a count of the interactive fields contained within it.
- **Sidebar Footer**: Displays whether the form is `Ready` or shows the count of validation errors, plus a live counter of filled vs total fields.

---

## 4. Current Output of All 14 Component Sections

### Section 1: Text & Basic Inputs (`basic-inputs`)
- **Component**: `<BrandField />`
- **Import**: `@/components/BrandField/BrandField`
- **Output Fields**:
  - `Name`: Standard single-line text input.
  - `Email`: Email input with leading `Mail` icon.
  - `Password`: Password field with leading `Lock` icon and trailing interactive show/hide visibility toggle (`Eye` / `EyeOff`).
  - `Search`: Search field with leading `Search` icon.
  - `Website`: URL input with leading `Globe` icon.
  - `Phone`: Telephone field with leading `Phone` icon.
  - `Quantity`: Number input with `min={1}` and `max={100}` bounds.
  - `Year`: Year input with `min={1900}` and `max={2035}`.

---

### Section 2: Date & Time Pickers (`date-time`)
- **Component**: `<BrandField type="..." />`
- **Import**: `@/components/BrandField/BrandField`
- **Output Fields**:
  - `Date of Birth`: Date picker with leading `Calendar` icon.
  - `Appointment Time`: Time picker with leading `Clock` icon.
  - `Event Date & Time`: Native `datetime-local` input.
  - `Billing Month`: Native `month` selector.
  - `Target Week`: Native `week` picker.
  - `Standard Date` & `Standard Time`: Basic temporal inputs.
  - `Full Timestamp`: Comprehensive date and time picker.
  - `Fiscal Month` & `Reporting Week`: Temporal grouping pickers.
  - `Budget Year`: Year picker bounded between `2000` and `2035`.

---

### Section 3: Textarea & Multiline (`textareas`)
- **Component**: `<BrandField type="textarea" />`
- **Import**: `@/components/BrandField/BrandField`
- **Output Fields**:
  - `Description (with counter)`: 4 rows with dynamic character counter (`maxLength={1000}`, `showCount`).
  - `Short Description (non-resizable)`: 4 rows, `resizable={false}`, `maxLength={300}`.
  - `Default Textarea`: Standard 3-row multiline field.
  - `Expanded Textarea (6 Rows)`: Configured with `rows={6}`.
  - `Character Limit (Max 200)`: Fixed boundary multiline field.
  - `Fixed Geometry Textarea`: Prevents manual resize cursor drag.
  - `Textarea with Validation Error`: Shows red border and destructive error message.
  - `Textarea with Helpful Hint`: Shows muted secondary hint text.

---

### Section 4: Icons, Sizes & Variants (`input-styles`)
- **Component**: `<BrandField size="..." variant="..." leftIcon={...} />`
- **Import**: `@/components/BrandField/BrandField`
- **Output Fields**:
  - `Leading Icons`: Prefix icons for Username (`User`), Email (`Mail`), Website (`Link`), Phone (`Phone`), Search (`Search`), Quantity (`Hash`).
  - `Sizes`: Small (`size="sm"`), Medium (`size="md"`, default), Large (`size="lg"`).
  - `Variants`: Default (`variant="default"`), Filled (`variant="filled"` with subtle background), Ghost (`variant="ghost"` with transparent border).

---

### Section 5: Validation & States (`validation-states`)
- **Component**: `<BrandField error={...} helperText={...} />`
- **Import**: `@/components/BrandField/BrandField`
- **Output Fields**:
  - `Required Field`: Displays red asterisk and validates upon form submission.
  - `Email with Error`: Shows static validation message *"Please enter a valid company email address."*
  - `Username with Hint`: Shows muted guidance text *"Must be at least 5 characters."*
  - `Username with Error & Hint`: Demonstrates simultaneous error text and helper text.
  - `Disabled Field`: Shows disabled cursor and reduced opacity.
  - `Read-Only Field`: Non-editable input maintaining readable text.
  - `Character Limit Counters`: Product Title (max 100) and Bio (max 500) with live count badges.

---

### Section 6: Select & Multi-Select (`search-selects`)
- **Component**: `<BrandFieldSearchSelect />`
- **Import**: `@/components/BrandField/BrandFieldSearchSelect`
- **Output Fields**:
  - `Department`: Searchable single-select (Cardiology, Neurology, Orthopedics, Pediatrics, etc.).
  - `Gender`: Searchable single-select (Male, Female, Other).
  - `Marital Status`: Searchable single-select (Single, Married, Divorced, Widowed).
  - `Nationality`: Searchable single-select (Bangladeshi, Indian, Pakistani, Sri Lankan).
  - `Skills & Technologies (Multi-Select)`: Chip tag multi-selector for JavaScript, TypeScript, PHP, Laravel, and React with inline removal triggers.

---

### Section 7: File Uploads (`file-uploads`)
- **Components**: `<FormSingleFileUpload />` & `<FormMultipleFileUpload />`
- **Imports**: `@/components/BrandField/BrandSingleFile` & `@/components/BrandField/BrandMultipleFile`
- **Output Fields**:
  - `Profile Picture`: Single image file dropzone with preview.
  - `Supporting Documents`: Multi-file upload zone accepting `.pdf,.jpg,.jpeg,.png` with file size enforcement (max 5 MB).

---

### Section 8: Checkboxes & Radios (`checkboxes-radios`)
- **Components**: `<Checkbox />`, `<Label />`, `Radio Cards`
- **Imports**: `@/components/ui/checkbox` & `@/components/ui/label`
- **Output Fields**:
  - `Standard Checkboxes`: Terms & conditions, Email updates, Disabled checkbox, Checked & disabled checkbox.
  - `Card-Style Checkbox`: Highlighting the "Weekly Tech Digest" with custom border and description.
  - `Subscription Tier Radio Cards`: Interactive cards for **Starter** (Free), **Pro** ($29/mo), and **Enterprise** ($99/mo).

---

### Section 9: Registration Form Layout (`form-grid`)
- **Component**: Multi-column composite form layout
- **Output Fields**:
  - Multi-column grid containing Profile Summary, Work Email, Directory Search, Short Bio, Account Handle, Full Name, Personal Email, Contact Number, Date of Birth, Shift Start Time, and Enrollment Timestamp.

---

### Section 10: Buttons & Actions (`buttons`)
- **Component**: `<Button />`
- **Import**: `@/components/ui/button`
- **Output Variants**:
  - `Icon Only`: Save, Download, Upload, Delete, Edit.
  - `Small (sm)`: Save, Add New, Export.
  - `Standard (default)`: Save Changes, Create, Delete.
  - `Large (lg)`: Publish, Upload.

---

### Section 11: Modals & Dialogs (`modals-dialogs`)
- **Components**: `<Modal />` & `<DeleteAlert />`
- **Imports**: `@/components/shared/modal` & `@/components/shared/delete-alert`
- **Output Features**:
  - `UserModalDemo`: Responsive dialog with draft profile state (Name and Email fields), Save changes trigger, and Cancel rollback.
  - `DeleteAlert`: Destructive action verification alert prompt.

---

### Section 12: Toast Notifications (`toast-alerts`)
- **Component**: `appToast` (Sonner)
- **Import**: `@/components/shared/toast`
- **Output Triggers**:
  - `Success Toast`: Green checkmark toast.
  - `Warning Toast`: Amber warning alert.
  - `Error Toast`: Red destructive alert.
  - `Info Toast`: Blue informative toast.
  - `Loading Toast (2s)`: Animated spinner toast that resolves into a success notification after 2 seconds.

---

### Section 13: Data Table Showcase (`tables-display`)
- **Component**: Responsive Table with `<Badge />`
- **Output Features**:
  - Search filter input to query table rows in real-time.
  - Displays user ID, Name & Email, Department & Role, Status Badge (`Active`, `Pending`, `Inactive`), and a row "Select" action button that triggers a toast notification.

---

### Section 14: Form State & Snapshot (`live-state`)
- **Component**: Master Form State Inspector
- **Output Features**:
  - `Active Form State`: Real-time JSON formatting of all active fields (passwords safely masked to `••••••••` and files serialized to metadata).
  - `Captured Snapshot`: Displays frozen state captured upon clicking "Save Snapshot" or "Save All".
  - Quick "Reset" and "Save Snapshot" action triggers.

---

## 5. State Management & Form Lifecycle

```ts
// 1. Single Master Form State Object
const [values, setValues] = useState<FormValues>(initialValues);

// 2. Generic Typed Field Setter
const setField = <K extends FieldKey>(key: K, value: FormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

// 3. Pure Derived Validation
const errors = useMemo(() => validate(values), [values]);

// 4. Safe Serialization for Snapshots & Logs
function serialize(values: FormValues) {
    return {
        ...values,
        password: values.password ? "••••••••" : "",
        profile_picture: values.profile_picture ? { name: values.profile_picture.name, size: values.profile_picture.size } : null,
        medical_documents: values.medical_documents.map(f => ({ name: f.name, size: f.size })),
    };
}
```
