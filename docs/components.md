# Component Catalogue & API Reference

Comprehensive reference documentation for all reusable components in `resources/js/components/`.

---

## Table of Contents
1. [BrandField Form Controls](#1-brandfield-form-controls)
2. [Shared Composite Components](#2-shared-composite-components)
3. [Base UI Primitives](#3-base-ui-primitives)
4. [Dashboard & Navigation Components](#4-dashboard--navigation-components)
5. [Security & Authentication Components](#5-security--authentication-components)
6. [Product Components](#6-product-components)

---

## 1. BrandField Form Controls

### BrandField
Primary enterprise input component supporting single-line inputs and multiline textareas.

- **Import**: `import { BrandField } from "@/components/BrandField/BrandField";`
- **Path**: `resources/js/components/BrandField/BrandField.tsx`

#### Supported Types
`'text'` | `'email'` | `'password'` | `'search'` | `'url'` | `'tel'` | `'number'` | `'date'` | `'time'` | `'datetime-local'` | `'month'` | `'week'` | `'year'` | `'range'` | `'textarea'`

#### Props Table
| Prop | Type | Default | Description |
|---|---|---|---|
| `id` | `string` | — | HTML element identifier |
| `name` | `string` | — | Form field name |
| `type` | `BrandFieldType` | `'text'` | Input format type |
| `label` | `ReactNode` | — | Label rendered above input |
| `placeholder` | `string` | — | Native placeholder text |
| `value` | `string \| number` | — | Controlled input value |
| `onChange` | `(e: ChangeEvent) => void` | — | Change event handler |
| `leftIcon` | `ReactNode` | — | Prefix icon rendered inside input |
| `rightAction` | `ReactNode` | — | Suffix action (e.g. password toggle button) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Field height and font scaling |
| `variant` | `'default' \| 'filled' \| 'ghost'` | `'default'` | Background and border visual style |
| `required` | `boolean` | `false` | Renders red asterisk next to label |
| `disabled` | `boolean` | `false` | Disables field interaction |
| `readOnly` | `boolean` | `false` | Sets input to read-only mode |
| `error` | `ReactNode` | — | Destructive validation error message |
| `helperText` | `ReactNode` | — | Secondary guidance text below input |
| `showCount` | `boolean` | `false` | Displays character counter (requires `maxLength`) |
| `maxLength` | `number` | — | Maximum allowed character length |
| `rows` | `number` | `4` | Rows count when `type="textarea"` |
| `resizable` | `boolean` | `true` | Locks textarea resizing when `false` |

```tsx
<BrandField
  id="user-email"
  type="email"
  label="Work Email"
  placeholder="alex@company.com"
  leftIcon={<Mail className="size-4" />}
  required
  error={errors.email}
  helperText="We will send your verification link here."
/>
```

---

### BrandFieldSearchSelect
Single and multi-select dropdown with searchable filtering and chip tags.

- **Import**: `import { BrandFieldSearchSelect } from "@/components/BrandField/BrandFieldSearchSelect";`
- **Path**: `resources/js/components/BrandField/BrandFieldSearchSelect.tsx`

#### Props Table
| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `ReactNode` | — | Label above selector |
| `options` | `Array<{ label: string; value: string }>` | `[]` | List of options |
| `value` | `string \| string[]` | — | Selected value or array of values |
| `onValueChange` | `(value: any) => void` | — | Selection change handler |
| `multiple` | `boolean` | `false` | Enables multi-select tag chips mode |
| `searchPlaceholder` | `string` | `'Search...'` | Input placeholder for search filter |
| `emptyMessage` | `string` | `'No results found.'` | Text shown when no results match |
| `placeholder` | `string` | `'Select...'` | Trigger placeholder text |
| `required` | `boolean` | `false` | Asterisk indicator |
| `error` | `ReactNode` | — | Destructive error text |

```tsx
<BrandFieldSearchSelect
  label="Department"
  required
  options={[
    { label: "Engineering", value: "eng" },
    { label: "Design", value: "design" },
  ]}
  value={department}
  onValueChange={setDepartment}
/>
```

---

### BrandSingleFile & BrandMultipleFile
Drag-and-drop file uploaders with file size and type validations.

- **Import**:
  - `import { FormSingleFileUpload } from "@/components/BrandField/BrandSingleFile";`
  - `import { FormMultipleFileUpload } from "@/components/BrandField/BrandMultipleFile";`
- **Paths**:
  - `resources/js/components/BrandField/BrandSingleFile.tsx`
  - `resources/js/components/BrandField/BrandMultipleFile.tsx`

```tsx
<FormSingleFileUpload
  id="avatar"
  name="avatar"
  label="Profile Picture"
  required
/>

<FormMultipleFileUpload
  label="Supporting Documents"
  accept=".pdf,.png,.jpg"
  description="Upload PDF or image files up to 5 MB each"
/>
```

---

### BrandButton
Gradient-themed interactive button with built-in tooltips and loading spinners.

- **Import**: `import { BrandButton } from "@/components/BrandField/BrandButton";`
- **Path**: `resources/js/components/BrandField/BrandButton.tsx`
- **Themes**: `'blue'` | `'lime'` | `'green'` | `'emerald'` | `'red'` | `'purple'` | `'amber'` | `'indigo'` | `'zinc'` | `'black'` | `'gray'`

```tsx
<BrandButton
  theme="emerald"
  icon={<Save />}
  title="Save record to database"
  isLoading={isSaving}
  onClick={handleSave}
>
  Save Changes
</BrandButton>
```

---

### BrandBadge
Status badge supporting dynamic color mapping, icons, and pill shapes.

- **Import**: `import BrandBadge from "@/components/BrandField/BrandBadge";`
- **Path**: `resources/js/components/BrandField/BrandBadge.tsx`

```tsx
<BrandBadge
  value="active"
  values={["active", "pending", "inactive"]}
  labels={["Active", "Pending Review", "Deactivated"]}
  tailwindColors={["green", "amber", "gray"]}
  pill
/>
```

---

### BrandRadioGroup
Styled radio selection group supporting horizontal and vertical orientations.

- **Import**: `import { BrandRadioGroup } from "@/components/BrandField/BrandRadioGroup";`
- **Path**: `resources/js/components/BrandField/BrandRadioGroup.tsx`

```tsx
<BrandRadioGroup
  label="Subscription Plan"
  value={plan}
  options={["Starter", "Professional", "Enterprise"]}
  onChange={setPlan}
  orientation="horizontal"
/>
```

---

### BrandSwitch
Accessible toggle switch for boolean preferences.

- **Import**: `import { BrandSwitch } from "@/components/BrandField/BrandSwitch";`
- **Path**: `resources/js/components/BrandField/BrandSwitch.tsx`

```tsx
<BrandSwitch
  label="Push Notifications"
  description="Receive instant alerts on assignment updates."
  checked={enabled}
  onChange={setEnabled}
/>
```

---

### BrandOTPInput
Segmented One-Time Password verification input.

- **Import**: `import { BrandOTPInput } from "@/components/BrandField/BrandOTPInput";`
- **Path**: `resources/js/components/BrandField/BrandOTPInput.tsx`

```tsx
<BrandOTPInput
  label="Security Code"
  length={6}
  value={otp}
  onChange={setOtp}
/>
```

---

## 2. Shared Composite Components

### Modal (Responsive Dialog / Drawer)
Responsive overlay that renders a Radix Dialog on desktop and a bottom drawer on mobile.

- **Import**: `import { Modal } from "@/components/shared/modal";`
- **Path**: `resources/js/components/shared/modal.tsx`

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit Profile"
  maxWidth="md"
  footer={
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button onClick={saveProfile}>Save</Button>
    </div>
  }
>
  <p>Form inputs go here.</p>
</Modal>
```

---

### DeleteAlert
Destructive action confirmation dialog with confirm and cancel triggers.

- **Import**: `import DeleteAlert from "@/components/shared/delete-alert";`
- **Path**: `resources/js/components/shared/delete-alert.tsx`

---

### appToast
Sonner toast wrapper with pre-configured icons and variant styles.

- **Import**: `import { appToast } from "@/components/shared/toast";`
- **Path**: `resources/js/components/shared/toast.tsx`

```tsx
appToast.success("Success", "Record updated successfully.");
appToast.warning("Warning", "Please verify your input fields.");
appToast.error("Error", "Could not complete operation.");
appToast.info("Info", "New version available.");
const id = appToast.loading("Syncing...", "Please wait.");
appToast.dismiss(id);
```

---

### Pagination
Accessible data table and record list pagination controls.

- **Import**: `import Pagination from "@/components/shared/pagination";`
- **Path**: `resources/js/components/shared/pagination.tsx`

---

## 3. Base UI Primitives (`@/components/ui`)

| Component | Path | Key Props | Description |
|---|---|---|---|
| `Button` | `ui/button.tsx` | `variant`, `size`, `asChild` | Standard button with 6 variants and 4 sizes |
| `Badge` | `ui/badge.tsx` | `variant`, `asChild` | Status chip with primary, secondary, destructive styles |
| `Card` | `ui/card.tsx` | `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` | Modular surface container |
| `Checkbox` | `ui/checkbox.tsx` | `checked`, `onCheckedChange`, `disabled` | Accessible Radix checkbox |
| `Dialog` | `ui/dialog.tsx` | `DialogContent`, `DialogHeader`, `DialogTitle` | Desktop modal dialog primitives |
| `Drawer` | `ui/drawer.tsx` | `DrawerContent`, `DrawerHeader`, `DrawerTitle` | Mobile sheet drawer primitive (Vaul) |
| `DropdownMenu` | `ui/dropdown-menu.tsx` | `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem` | Action dropdown list |
| `Popover` | `ui/popover.tsx` | `PopoverTrigger`, `PopoverContent` | Floating contextual popover container |
| `RadioGroup` | `ui/radio-group.tsx` | `value`, `onValueChange` | Radix radio primitive |
| `Select` | `ui/select.tsx` | `SelectTrigger`, `SelectContent`, `SelectItem` | Custom stylized native-like select |
| `Separator` | `ui/separator.tsx` | `orientation`: `'horizontal' \| 'vertical'` | Visual divider |
| `Skeleton` | `ui/skeleton.tsx` | `className` | Animated loading placeholder |
| `Sonner` | `ui/sonner.tsx` | `<Toaster />` | Global toaster provider mount |
| `Switch` | `ui/switch.tsx` | `checked`, `onCheckedChange` | Radix toggle switch primitive |
| `Tooltip` | `ui/tooltip.tsx` | `TooltipProvider`, `TooltipTrigger`, `TooltipContent` | Hover info tooltip |

---

## 4. Dashboard & Navigation Components

Located in `resources/js/components/dashboard/`:

- **`AppShell`**: Master dashboard layout providing sidebar, main container, and responsive navigation wrapper.
- **`AppHeader`**: Top navigation header bar with breadcrumbs and user profile menu.
- **`AppSidebar`**: Collapsible dashboard sidebar hosting `NavMain`, `NavFooter`, and application branding.
- **`Breadcrumbs`**: Route hierarchy trail.
- **`NavMain`**: Primary navigation items list with icons and active route detection.
- **`NavUser`**: Bottom sidebar user card with avatar, role, and logout trigger.

---

## 5. Security & Authentication Components

Located in `resources/js/components/security/`:

- **`ManagePasskeys`**: WebAuthn biometric and security key management list.
- **`ManageTwoFactor`**: Two-factor authentication (TOTP) status and management panel.
- **`TwoFactorSetupModal`**: QR code generation and 6-digit confirmation modal.
- **`TwoFactorRecoveryCodes`**: Backup recovery codes viewer and regeneration controls.

---

## 6. Product Components

Located in `resources/js/components/products/`:

- **`ProductCard`**: E-commerce card rendering product thumbnail image, title, price, category badges, and "Add to Cart" action button.
