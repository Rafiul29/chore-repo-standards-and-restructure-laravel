import {
    Plus,
    Download,
    Trash2,
    Upload,
    Save,
    Edit,
    Mail,
    User,
    SearchIcon,
    Clock,
    Calendar,
    Search,
    Phone,
    Link,
    Hash,
    Globe,
    Lock,
    EyeOff,
    Eye,
    X,
    FileText,
    AlignLeft,
    Sliders,
    AlertCircle,
    ListFilter,
    UploadCloud,
    CheckSquare,
    Layers,
    MousePointer,
    Maximize2,
    Bell,
    Table as TableIcon,
    Code2,
    RotateCcw,
    Sparkles,
    Check,
    Copy,
} from "lucide-react";

import {
    useMemo,
    useState,
    type ChangeEvent,
    type FormEvent,
    type ReactNode,
} from "react";


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import { Modal } from "@/components/shared/Modal";
import { BrandField } from "@/components/BrandField/BrandField";
import { cn } from "@/lib/utils";
import { BrandFieldSearchSelect } from "@/components/BrandField/BrandFieldSearchSelect";
import { BrandSingleFile } from "@/components/BrandField/BrandSingleFile";
import { BrandMultipleFile } from "@/components/BrandField/BrandMultipleFile";
import { AppToast } from "@/components/shared/AppToast";

const gridClass =
    "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

/* -------------------------------------------------------------------------- */
/* Options                                                                    */
/* -------------------------------------------------------------------------- */

const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
];

const departmentOptions = [
    { label: "Cardiology", value: "cardiology" },
    { label: "Neurology", value: "neurology" },
    { label: "Orthopedics", value: "orthopedics" },
    { label: "Pediatrics", value: "pediatrics" },
    { label: "Gynecology & Obstetrics", value: "gynecology_obstetrics" },
    { label: "General Medicine", value: "general_medicine" },
    { label: "General Surgery", value: "general_surgery" },
    { label: "Dermatology", value: "dermatology" },
    { label: "ENT", value: "ent" },
    { label: "Ophthalmology", value: "ophthalmology" },
];

const maritalStatusOptions = [
    { label: "Single", value: "single" },
    { label: "Married", value: "married" },
    { label: "Divorced", value: "divorced" },
    { label: "Widowed", value: "widowed" },
];

const nationalityOptions = [
    { label: "Bangladeshi", value: "bangladeshi" },
    { label: "Indian", value: "indian" },
    { label: "Pakistani", value: "pakistani" },
    { label: "Sri Lankan", value: "sri-lankan" },
];

const skillOptions = [
    { label: "JavaScript", value: "js" },
    { label: "TypeScript", value: "ts" },
    { label: "PHP", value: "php" },
    { label: "Laravel", value: "laravel" },
    { label: "React", value: "react" },
];

const planOptions = [
    {
        id: "starter",
        name: "Starter",
        price: "Free",
        desc: "Ideal for personal projects and quick component experimentation.",
    },
    {
        id: "pro",
        name: "Pro",
        price: "$29/mo",
        desc: "Best for growing teams needing full customization & premium templates.",
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: "$99/mo",
        desc: "Dedicated support, audit logs, custom SSO, and unlimited workspaces.",
    },
];

const sampleTableData = [
    {
        id: "USR-001",
        name: "Sarah Connor",
        email: "sarah.connor@example.com",
        role: "Lead Engineer",
        dept: "Engineering",
        status: "Active",
    },
    {
        id: "USR-002",
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        role: "Product Designer",
        dept: "Design",
        status: "Active",
    },
    {
        id: "USR-003",
        name: "Johnathan Smith",
        email: "j.smith@example.com",
        role: "DevOps Architect",
        dept: "Infrastructure",
        status: "Pending",
    },
    {
        id: "USR-004",
        name: "Elena Rostova",
        email: "elena.r@example.com",
        role: "QA Specialist",
        dept: "Quality Assurance",
        status: "Active",
    },
    {
        id: "USR-005",
        name: "Marcus Vance",
        email: "marcus.v@example.com",
        role: "Technical Writer",
        dept: "Documentation",
        status: "Inactive",
    },
];

/* -------------------------------------------------------------------------- */
/* Form state: ONE object holds every field on the page                       */
/* -------------------------------------------------------------------------- */

const initialValues = {
    /* All input types */
    name: "",
    email: "",
    password: "",
    search: "",
    website: "",
    phone: "",
    quantity: "",
    year: "",
    birth_date: "",
    appointment_time: "",
    event_date: "",
    billing_month: "",
    week: "",
    description: "",
    short_description: "",

    /* Icons */
    icon_username: "",
    icon_email: "",
    icon_website: "",
    icon_phone: "",
    icon_search: "",
    icon_number: "",

    /* Sizes and variants */
    size_sm: "",
    size_md: "",
    size_lg: "",
    variant_default: "",
    variant_filled: "",
    variant_ghost: "",

    /* Character count */
    product_title: "",
    bio: "",

    /* Validation and states */
    required_field: "",
    validation_email: "",
    validation_username: "",
    validation_username_taken: "",
    disabled_field: "",

    /* Textarea variations */
    textarea_default: "",
    textarea_rows: "",
    textarea_limit: "",
    textarea_no_resize: "",
    textarea_error: "",
    textarea_helper: "",

    /* Date / time */
    date: "",
    time: "",
    datetime: "",
    month: "",
    temporal_week: "",
    temporal_year: "",

    /* Form components */
    grid_description: "",
    grid_email: "",
    grid_search: "",
    grid_bio: "",
    grid_username_error: "",
    grid_full_name: "",
    grid_email_address: "",
    grid_username: "",
    contact: "",
    date_of_birth: "",
    registration_time: "",
    registration_datetime: "",

    /* Selects */
    gender: "",
    department: "",
    gender_search: "",
    marital_status: "",
    nationality: "",
    skills: [] as string[],

    /* Textarea components */
    address: "",
    additional_notes: "",

    /* Files */
    profile_picture: null as File | null,
    medical_documents: [] as File[],

    /* Checkboxes */
    accept_terms: false,
    receive_updates: true,
    newsletter: false,

    /* Radio */
    plan_tier: "pro",
};

type FormValues = typeof initialValues;
type FieldKey = keyof FormValues;
type FormErrors = Partial<Record<FieldKey, string>>;

type TextKey = {
    [K in FieldKey]: FormValues[K] extends string ? K : never;
}[FieldKey];

type SingleSelectKey = Extract<
    TextKey,
    "gender_search" | "department" | "marital_status" | "nationality"
>;

/* -------------------------------------------------------------------------- */
/* Validation                                                                 */
/* -------------------------------------------------------------------------- */

const requiredFields: FieldKey[] = [
    "required_field",
    "grid_email",
    "grid_full_name",
    "grid_email_address",
    "grid_username",
    "gender_search",
    "department",
    "marital_status",
    "nationality",
    "profile_picture",
    "medical_documents",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isEmpty(value: unknown) {
    if (Array.isArray(value)) return value.length === 0;
    return value === null || value === undefined || value === "";
}

function validate(values: FormValues): FormErrors {
    const errors: FormErrors = {};

    for (const key of requiredFields) {
        if (isEmpty(values[key])) {
            errors[key] = "This field is required.";
        }
    }

    for (const key of ["grid_email", "grid_email_address"] as const) {
        if (values[key] && !emailPattern.test(values[key])) {
            errors[key] = "Please enter a valid email address.";
        }
    }

    return errors;
}

function serialize(values: FormValues) {
    return {
        ...values,
        password: values.password
            ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
            : "",
        profile_picture: values.profile_picture
            ? {
                  name: values.profile_picture.name,
                  size: values.profile_picture.size,
              }
            : null,
        medical_documents: values.medical_documents.map((file) => ({
            name: file.name,
            size: file.size,
        })),
    };
}

/* -------------------------------------------------------------------------- */
/* Menu item definition                                                       */
/* -------------------------------------------------------------------------- */

interface MenuItem {
    id: string;
    title: string;
    category: string;
    description: string;
    componentName: string;
    importPath: string;
    icon: React.ComponentType<{ className?: string }>;
    fieldCount?: number;
    keywords: string[];
    fieldKeys?: FieldKey[];
    exampleCode: string;
    propsList: Array<{ name: string; type: string; desc: string }>;
}

const menuItems: MenuItem[] = [
    {
        id: "basic-inputs",
        title: "Text & Basic Inputs",
        category: "Inputs & Text",
        description:
            "Versatile single-line input field supporting text, email, password, phone, numbers, search, and URL.",
        componentName: "BrandField",
        importPath: "@/components/BrandField/BrandField",
        icon: FileText,
        fieldCount: 8,
        fieldKeys: [
            "name",
            "email",
            "password",
            "search",
            "website",
            "phone",
            "quantity",
            "year",
        ],
        keywords: [
            "name",
            "email",
            "password",
            "search",
            "website",
            "phone",
            "quantity",
            "number",
            "year",
            "text",
            "url",
            "tel",
        ],
        exampleCode: `<BrandField
  id="email"
  type="email"
  label="Email Address"
  placeholder="user@example.com"
  leftIcon={<Mail className="size-4" />}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>`,
        propsList: [
            {
                name: "type",
                type: "'text' | 'email' | 'password' | 'search' | 'url' | 'tel' | 'number'",
                desc: "Native input type definition",
            },
            {
                name: "label",
                type: "ReactNode",
                desc: "Form label rendered above the input",
            },
            {
                name: "leftIcon",
                type: "ReactNode",
                desc: "Leading prefix icon inside the input",
            },
            {
                name: "rightAction",
                type: "ReactNode",
                desc: "Trailing interactive button (e.g. password toggle)",
            },
        ],
    },
    {
        id: "date-time",
        title: "Date & Time Pickers",
        category: "Inputs & Text",
        description:
            "Temporal picker inputs for dates, appointment times, event timestamps, months, weeks, and years.",
        componentName: "BrandField (Temporal)",
        importPath: "@/components/BrandField/BrandField",
        icon: Calendar,
        fieldCount: 11,
        fieldKeys: [
            "birth_date",
            "appointment_time",
            "event_date",
            "billing_month",
            "week",
            "date",
            "time",
            "datetime",
            "month",
            "temporal_week",
            "temporal_year",
        ],
        keywords: [
            "date",
            "time",
            "datetime",
            "calendar",
            "clock",
            "month",
            "week",
            "year",
            "temporal",
            "appointment",
        ],
        exampleCode: `<BrandField
  id="birth_date"
  type="date"
  label="Birth Date"
  leftIcon={<Calendar className="size-4" />}
  value={birthDate}
  onChange={(e) => setBirthDate(e.target.value)}
/>`,
        propsList: [
            {
                name: "type",
                type: "'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'year'",
                desc: "Specifies temporal picker format",
            },
            {
                name: "min / max",
                type: "string | number",
                desc: "Optional boundary constraints for dates or years",
            },
            {
                name: "leftIcon",
                type: "ReactNode",
                desc: "Calendar or Clock icon indicator",
            },
        ],
    },
    {
        id: "textareas",
        title: "Textarea & Multiline",
        category: "Inputs & Text",
        description:
            "Multiline textarea with custom row count, live character counter, locked geometry, and error states.",
        componentName: "BrandField (Textarea)",
        importPath: "@/components/BrandField/BrandField",
        icon: AlignLeft,
        fieldCount: 8,
        fieldKeys: [
            "description",
            "short_description",
            "textarea_default",
            "textarea_rows",
            "textarea_limit",
            "textarea_no_resize",
            "textarea_error",
            "textarea_helper",
        ],
        keywords: [
            "textarea",
            "description",
            "rows",
            "character count",
            "limit",
            "resize",
            "bio",
            "notes",
        ],
        exampleCode: `<BrandField
  id="description"
  type="textarea"
  label="Description"
  rows={5}
  maxLength={500}
  showCount
  placeholder="Write detailed description..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>`,
        propsList: [
            {
                name: "rows",
                type: "number",
                desc: "Number of visible text rows (default: 4)",
            },
            {
                name: "showCount",
                type: "boolean",
                desc: "Displays live character counter badge",
            },
            {
                name: "maxLength",
                type: "number",
                desc: "Maximum character length limit",
            },
            {
                name: "resizable",
                type: "boolean",
                desc: "Whether user can drag-resize the field (default: true)",
            },
        ],
    },
    {
        id: "input-styles",
        title: "Icons, Sizes & Variants",
        category: "Styling & Variants",
        description:
            "Styling variations: leading prefix icons, sizes (sm, md, lg), and visual variant styles (default, filled, ghost).",
        componentName: "BrandField (Variants)",
        importPath: "@/components/BrandField/BrandField",
        icon: Sliders,
        fieldCount: 12,
        fieldKeys: [
            "icon_username",
            "icon_email",
            "icon_website",
            "icon_phone",
            "icon_search",
            "icon_number",
            "size_sm",
            "size_md",
            "size_lg",
            "variant_default",
            "variant_filled",
            "variant_ghost",
        ],
        keywords: [
            "icons",
            "sizes",
            "variants",
            "small",
            "medium",
            "large",
            "filled",
            "ghost",
            "prefix",
        ],
        exampleCode: `<BrandField
  size="sm"
  variant="filled"
  label="Compact Input"
  placeholder="Small filled input"
  leftIcon={<User className="size-4" />}
/>`,
        propsList: [
            {
                name: "size",
                type: "'sm' | 'md' | 'lg'",
                desc: "Input height and padding scale (default: 'md')",
            },
            {
                name: "variant",
                type: "'default' | 'filled' | 'ghost'",
                desc: "Visual surface style (default: 'default')",
            },
            {
                name: "leftIcon",
                type: "ReactNode",
                desc: "Icon component rendered at the start of input",
            },
        ],
    },
    {
        id: "validation-states",
        title: "Validation & States",
        category: "Styling & Variants",
        description:
            "Real-time validation error feedback, helper text hints, character limits, disabled, and read-only states.",
        componentName: "BrandField (Feedback)",
        importPath: "@/components/BrandField/BrandField",
        icon: AlertCircle,
        fieldCount: 7,
        fieldKeys: [
            "required_field",
            "validation_email",
            "validation_username",
            "validation_username_taken",
            "disabled_field",
            "product_title",
            "bio",
        ],
        keywords: [
            "validation",
            "required",
            "error",
            "helper text",
            "disabled",
            "read only",
            "counter",
        ],
        exampleCode: `<BrandField
  required
  error={hasError ? "Username already taken." : undefined}
  helperText="Try appending a number or initials."
  label="Username"
/>`,
        propsList: [
            {
                name: "required",
                type: "boolean",
                desc: "Renders red asterisk indicating mandatory field",
            },
            {
                name: "error",
                type: "ReactNode",
                desc: "Displays red validation message below input",
            },
            {
                name: "helperText",
                type: "ReactNode",
                desc: "Displays muted guidance hint below input",
            },
            {
                name: "disabled",
                type: "boolean",
                desc: "Disables interaction and applies muted opacity",
            },
            {
                name: "readOnly",
                type: "boolean",
                desc: "Allows focus/copying but prevents editing",
            },
        ],
    },
    {
        id: "search-selects",
        title: "Select & Multi-Select",
        category: "Selection & Choices",
        description:
            "Searchable single-select dropdowns and multi-select chip tags with item removal.",
        componentName: "BrandFieldSearchSelect",
        importPath: "@/components/BrandField/BrandFieldSearchSelect",
        icon: ListFilter,
        fieldCount: 5,
        fieldKeys: [
            "department",
            "gender_search",
            "marital_status",
            "nationality",
            "skills",
        ],
        keywords: [
            "select",
            "searchable",
            "dropdown",
            "department",
            "gender",
            "marital status",
            "skills",
            "chips",
        ],
        exampleCode: `<BrandFieldSearchSelect
  label="Department"
  required
  placeholder="Select department"
  searchPlaceholder="Search departments..."
  options={departmentOptions}
  value={department}
  onValueChange={setDepartment}
/>`,
        propsList: [
            {
                name: "options",
                type: "Array<{ label: string, value: string }>",
                desc: "List of available options",
            },
            {
                name: "multiple",
                type: "boolean",
                desc: "Enables multi-select tag chips mode",
            },
            {
                name: "searchPlaceholder",
                type: "string",
                desc: "Placeholder text for dropdown search filter",
            },
            {
                name: "emptyMessage",
                type: "string",
                desc: "Text shown when no matching option is found",
            },
        ],
    },
    {
        id: "file-uploads",
        title: "File Uploads",
        category: "Selection & Choices",
        description:
            "Drag-and-drop file uploaders for single profile picture and multiple supporting document attachments.",
        componentName: "FormSingleFileUpload / FormMultipleFileUpload",
        importPath: "@/components/BrandField/BrandSingleFile",
        icon: UploadCloud,
        fieldCount: 2,
        fieldKeys: ["profile_picture", "medical_documents"],
        keywords: [
            "file",
            "upload",
            "single file",
            "multiple files",
            "profile picture",
            "documents",
            "dropzone",
        ],
        exampleCode: `<FormSingleFileUpload
  id="profile-picture"
  name="profile_picture"
  label="Profile Picture"
  required
/>`,
        propsList: [
            {
                name: "accept",
                type: "string",
                desc: "Comma-separated accepted file extensions (e.g. '.pdf,.png')",
            },
            {
                name: "required",
                type: "boolean",
                desc: "Enforces file selection before submit",
            },
            {
                name: "description",
                type: "string",
                desc: "Guidance subtitle describing formats and size limits",
            },
        ],
    },
    {
        id: "checkboxes-radios",
        title: "Checkboxes & Radios",
        category: "Selection & Choices",
        description:
            "Standard checkbox toggles, card-style checkbox options, and selectable subscription plan radio cards.",
        componentName: "Checkbox & Radio Cards",
        importPath: "@/components/ui/checkbox",
        icon: CheckSquare,
        fieldCount: 4,
        fieldKeys: [
            "accept_terms",
            "receive_updates",
            "newsletter",
            "plan_tier",
        ],
        keywords: [
            "checkbox",
            "radio",
            "check",
            "toggle",
            "card checkbox",
            "terms",
            "newsletter",
            "plan",
        ],
        exampleCode: `<div className="flex items-center gap-2">
  <Checkbox id="terms" checked={terms} onCheckedChange={setTerms} />
  <Label htmlFor="terms">Accept terms & conditions</Label>
</div>`,
        propsList: [
            {
                name: "checked",
                type: "boolean",
                desc: "Current boolean state of checkbox",
            },
            {
                name: "onCheckedChange",
                type: "(checked: boolean) => void",
                desc: "Callback when checked state toggles",
            },
            {
                name: "disabled",
                type: "boolean",
                desc: "Disables checkbox input",
            },
        ],
    },
    {
        id: "form-grid",
        title: "Registration Form Layout",
        category: "Composites & Layouts",
        description:
            "Production-ready multi-column layout demonstrating composite registration fields and responsive grid sizing.",
        componentName: "Form Composite Grid",
        importPath: "@/components/BrandField/BrandField",
        icon: Layers,
        fieldCount: 12,
        fieldKeys: [
            "grid_full_name",
            "grid_email_address",
            "grid_username",
            "contact",
            "date_of_birth",
            "registration_time",
            "registration_datetime",
            "grid_description",
            "grid_email",
            "grid_search",
            "grid_bio",
            "grid_username_error",
        ],
        keywords: [
            "grid",
            "registration",
            "composite",
            "full name",
            "contact",
            "date of birth",
            "full form",
        ],
        exampleCode: `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <div className="sm:col-span-2">
    <BrandField id="bio" type="textarea" label="Bio" />
  </div>
  <BrandField id="name" label="Full Name" required />
  <BrandField id="email" type="email" label="Email" required />
</div>`,
        propsList: [
            {
                name: "className",
                type: "string",
                desc: "Responsive column spanning (e.g. sm:col-span-2)",
            },
            {
                name: "noValidate",
                type: "boolean",
                desc: "Prevents default browser HTML5 validation bubbles",
            },
        ],
    },
    {
        id: "buttons",
        title: "Buttons & Actions",
        category: "Components & Overlays",
        description:
            "Action triggers with multiple visual variants (default, secondary, destructive, outline, ghost) and sizes.",
        componentName: "Button",
        importPath: "@/components/ui/button",
        icon: MousePointer,
        keywords: [
            "button",
            "variants",
            "icon button",
            "sizes",
            "secondary",
            "destructive",
            "outline",
        ],
        exampleCode: `<Button variant="secondary" size="sm">
  <Plus className="size-3.5" />
  Add New Item
</Button>`,
        propsList: [
            {
                name: "variant",
                type: "'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'",
                desc: "Visual appearance style",
            },
            {
                name: "size",
                type: "'sm' | 'default' | 'lg' | 'icon'",
                desc: "Button dimensions and padding scale",
            },
            {
                name: "disabled",
                type: "boolean",
                desc: "Disables interaction and click events",
            },
        ],
    },
    {
        id: "modals-dialogs",
        title: "Modals & Dialogs",
        category: "Components & Overlays",
        description:
            "Responsive dialog modals with form inputs and destructive action confirmation alerts.",
        componentName: "Modal & DeleteAlert",
        importPath: "@/components/shared/modal",
        icon: Maximize2,
        keywords: [
            "modal",
            "dialog",
            "drawer",
            "popup",
            "delete alert",
            "profile modal",
            "confirm",
        ],
        exampleCode: `<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit Profile"
  maxWidth="md"
  footer={<Button onClick={save}>Save Changes</Button>}
>
  <p>Modal body content...</p>
</Modal>`,
        propsList: [
            {
                name: "isOpen",
                type: "boolean",
                desc: "Controls visibility of the modal dialog",
            },
            {
                name: "onClose",
                type: "() => void",
                desc: "Callback when modal backdrop or cancel is triggered",
            },
            {
                name: "maxWidth",
                type: "'sm' | 'md' | 'lg' | 'xl' | '2xl'",
                desc: "Maximum modal width constraint",
            },
            {
                name: "footer",
                type: "ReactNode",
                desc: "Action buttons rendered at bottom of modal",
            },
        ],
    },
    {
        id: "toast-alerts",
        title: "Toast Notifications",
        category: "Components & Overlays",
        description:
            "Sonner-powered notification alerts for success, warning, error, info, and loading states.",
        componentName: "appToast",
        importPath: "@/components/shared/toast",
        icon: Bell,
        keywords: [
            "toast",
            "notifications",
            "alerts",
            "success",
            "warning",
            "error",
            "info",
            "loading",
        ],
        exampleCode: `import { appToast } from "@/components/shared/toast";

// Trigger a toast notification
appToast.success("Profile Updated", "Changes saved successfully.");
appToast.error("Failed", "Please check your network connection.");`,
        propsList: [
            {
                name: "appToast.success(title, desc?)",
                type: "function",
                desc: "Fires green checkmark toast alert",
            },
            {
                name: "appToast.warning(title, desc?)",
                type: "function",
                desc: "Fires amber warning alert",
            },
            {
                name: "appToast.error(title, desc?)",
                type: "function",
                desc: "Fires red destructive error toast",
            },
            {
                name: "appToast.loading(title, desc?)",
                type: "function",
                desc: "Fires spinning loader toast and returns id",
            },
            {
                name: "appToast.dismiss(id?)",
                type: "function",
                desc: "Dismisses active loading toast",
            },
        ],
    },
    {
        id: "tables-display",
        title: "Data Table Showcase",
        category: "Data & Output",
        description:
            "Compact responsive data table displaying user records with status badges and action buttons.",
        componentName: "Data Table",
        importPath: "@/components/ui/badge",
        icon: TableIcon,
        keywords: [
            "table",
            "data",
            "records",
            "rows",
            "columns",
            "display",
            "users",
        ],
        exampleCode: `<div className="overflow-x-auto rounded-xl border">
  <table className="w-full text-left text-xs">
    <thead className="bg-muted/50">...</thead>
    <tbody>...</tbody>
  </table>
</div>`,
        propsList: [
            {
                name: "overflow-x-auto",
                type: "class",
                desc: "Ensures horizontal scroll on smaller viewports",
            },
            {
                name: "Badge",
                type: "component",
                desc: "Used for status chips ('Active', 'Pending', 'Inactive')",
            },
        ],
    },
    {
        id: "live-state",
        title: "Form State & Snapshot",
        category: "Data & Output",
        description:
            "Inspect the complete reactive form state, test serialization, and compare saved snapshots.",
        componentName: "State Inspector",
        importPath: "@/pages/example.tsx",
        icon: Code2,
        keywords: [
            "state",
            "json",
            "inspector",
            "live state",
            "snapshot",
            "save",
            "reset",
        ],
        exampleCode: `// Serialize helper cleans password & converts files to metadata
const serialized = serialize(values);
console.log(JSON.stringify(serialized, null, 2));`,
        propsList: [
            {
                name: "values",
                type: "FormValues",
                desc: "Single master reactive state object",
            },
            {
                name: "savedValues",
                type: "FormValues | null",
                desc: "Frozen snapshot captured upon valid form submit",
            },
            {
                name: "validate(values)",
                type: "function",
                desc: "Pure validation function returning FormErrors",
            },
        ],
    },
];

/* -------------------------------------------------------------------------- */
/* Small helpers                                                              */
/* -------------------------------------------------------------------------- */

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return (
        <p role="alert" className="text-destructive mt-1 text-xs">
            {message}
        </p>
    );
}

function CaptureChange({
    onCapture,
    className = "contents",
    children,
}: {
    onCapture: (element: HTMLInputElement | HTMLTextAreaElement) => void;
    className?: string;
    children: ReactNode;
}) {
    return (
        <div
            className={className}
            onChange={(event) =>
                onCapture(
                    event.target as HTMLInputElement | HTMLTextAreaElement,
                )
            }
        >
            {children}
        </div>
    );
}

/**
 * Modal Example (keeps its own saved profile; the draft is discarded on Cancel)
 */
export function UserModalDemo({
    onSaveSuccess,
}: {
    onSaveSuccess?: (name: string) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john@example.com",
    });

    const [draft, setDraft] = useState(profile);

    const openModal = () => {
        setDraft(profile);
        setIsOpen(true);
    };

    const saveProfile = () => {
        setProfile(draft);
        setIsOpen(false);
        AppToast.success("Profile updated", `Saved ${draft.name}.`);
        onSaveSuccess?.(draft.name);
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" onClick={openModal}>
                Open Modal
            </Button>

            <span className="text-muted-foreground text-xs">
                Saved: {profile.name} ({profile.email})
            </span>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Edit Profile"
                description="Make changes to your profile here. Click save when you're done."
                maxWidth="md"
                footer={
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button size="sm" onClick={saveProfile}>
                            Save changes
                        </Button>
                    </div>
                }
            >
                <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2">
                    <BrandField
                        id="modal-name"
                        name="modal-name"
                        type="text"
                        label="Name"
                        value={draft.name}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setDraft((previous) => ({
                                ...previous,
                                name: event.target.value,
                            }))
                        }
                    />

                    <BrandField
                        id="modal-email"
                        name="modal-email"
                        type="email"
                        label="Email"
                        value={draft.email}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setDraft((previous) => ({
                                ...previous,
                                email: event.target.value,
                            }))
                        }
                    />
                </div>
            </Modal>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Component Documentation Card                                               */
/* -------------------------------------------------------------------------- */

function ComponentDocsCard({
    componentName,
    importPath,
    propsList,
    exampleCode,
    snippetId,
    copiedSnippet,
    onCopySnippet,
}: {
    componentName: string;
    importPath: string;
    propsList: Array<{ name: string; type: string; desc: string }>;
    exampleCode: string;
    snippetId: string;
    copiedSnippet: string | null;
    onCopySnippet: (code: string, id: string) => void;
}) {
    return (
        <div className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2.5">
                <div className="flex items-center gap-2">
                    <Code2 className="size-4 text-primary" />
                    <span className="font-semibold text-xs tracking-tight">
                        Component API & Usage
                    </span>
                    <Badge
                        variant="outline"
                        className="font-mono text-[10px] py-0 px-1.5"
                    >
                        {componentName}
                    </Badge>
                </div>
                <div className="font-mono text-[11px] text-muted-foreground bg-muted/60 px-2 py-0.5 rounded">
                    {importPath}
                </div>
            </div>

            {/* Quick Code Example */}
            <div className="relative group">
                <pre className="overflow-x-auto rounded-lg bg-muted/50 p-3 font-mono text-[11px] text-foreground/90 border border-border/50">
                    {exampleCode}
                </pre>
                <button
                    type="button"
                    onClick={() => onCopySnippet(exampleCode, snippetId)}
                    className="absolute top-2 right-2 rounded bg-background/90 hover:bg-background border border-border p-1 text-muted-foreground hover:text-foreground transition text-xs flex items-center gap-1 px-1.5 py-0.5"
                    title="Copy Code"
                >
                    {copiedSnippet === snippetId ? (
                        <>
                            <Check className="size-3 text-emerald-500" />
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
                                Copied
                            </span>
                        </>
                    ) : (
                        <>
                            <Copy className="size-3" />
                            <span className="text-[10px]">Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Props Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                    <thead className="text-muted-foreground border-b border-border/60">
                        <tr>
                            <th className="py-1.5 pr-3 font-semibold">Prop</th>
                            <th className="py-1.5 pr-3 font-semibold">Type</th>
                            <th className="py-1.5 font-semibold">
                                Description
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                        {propsList.map((p) => (
                            <tr key={p.name}>
                                <td className="py-1.5 pr-3 font-mono font-medium text-primary">
                                    {p.name}
                                </td>
                                <td className="py-1.5 pr-3 font-mono text-muted-foreground">
                                    {p.type}
                                </td>
                                <td className="py-1.5 text-muted-foreground">
                                    {p.desc}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Main Components Showcase Page                                              */
/* -------------------------------------------------------------------------- */

export default function ComponentsExample() {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [submitted, setSubmitted] = useState(false);
    const [savedValues, setSavedValues] = useState<FormValues | null>(null);
    const [resetCount, setResetCount] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    /* Navigation & Search State */
    const [activeTab, setActiveTab] = useState<string>("basic-inputs");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

    /* Table search and selected item */
    const [tableSearch, setTableSearch] = useState<string>("");

    const errors = useMemo(() => validate(values), [values]);

    const setField = <K extends FieldKey>(key: K, value: FormValues[K]) =>
        setValues((previous) => ({ ...previous, [key]: value }));

    const errorFor = (key: FieldKey) => (submitted ? errors[key] : undefined);

    const text = (key: TextKey) => ({
        name: key,
        value: values[key],
        onChange: (
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => setField(key, event.target.value),
    });

    const single = (key: SingleSelectKey) => ({
        name: key,
        value: values[key],
        onValueChange: (value: string) => setField(key, value),
        error: errorFor(key),
    });

    const handleCopySnippet = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopiedSnippet(id);
        AppToast.success("Copied to clipboard", "Code snippet copied.");
        setTimeout(() => setCopiedSnippet(null), 2000);
    };

    const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
        if (event) event.preventDefault();
        setSubmitted(true);

        if (Object.keys(errors).length > 0) {
            AppToast.error(
                "Check the form",
                `Please fix the ${Object.keys(errors).length} highlighted field(s).`,
            );
            return;
        }

        setSavedValues(values);
        AppToast.success(
            "Saved",
            "All field values were successfully captured.",
        );
    };

    const handleReset = () => {
        setValues(initialValues);
        setSubmitted(false);
        setSavedValues(null);
        setShowPassword(false);
        setResetCount((count) => count + 1);
        AppToast.info("Form reset", "All fields have been reset to defaults.");
    };

    const handleFillSampleData = () => {
        setValues({
            name: "Alex Morgan",
            email: "alex.morgan@example.com",
            password: "SecurePassword123!",
            search: "High-performance components",
            website: "https://example.com/alex",
            phone: "+1 555-019-2834",
            quantity: "12",
            year: "2026",
            birth_date: "1994-06-15",
            appointment_time: "14:30",
            event_date: "2026-11-20T10:00",
            billing_month: "2026-11",
            week: "2026-W46",
            description:
                "Experienced full-stack engineer passionate about building accessible, performant design systems and Laravel applications.",
            short_description: "Full-stack engineer & open-source enthusiast.",
            icon_username: "alexmorgan",
            icon_email: "alex@example.com",
            icon_website: "https://alex.design",
            icon_phone: "+1 555-987-6543",
            icon_search: "Laravel 12 Boost",
            icon_number: "42",
            size_sm: "Compact input value",
            size_md: "Standard input value",
            size_lg: "Prominent input value",
            variant_default: "Default styled text",
            variant_filled: "Filled styled text",
            variant_ghost: "Ghost styled text",
            product_title: "Ultra Ergonomic Keyboard",
            bio: "Building thoughtful web experiences with React and Laravel.",
            required_field: "Valid input provided",
            validation_email: "valid.user@company.com",
            validation_username: "valid_username_123",
            validation_username_taken: "alexmorgan_unique",
            disabled_field: "Disabled state value",
            textarea_default:
                "This is a default textarea with multiple lines of sample text.",
            textarea_rows:
                "Textarea configured with 8 rows for longer formatted essays.",
            textarea_limit: "Within the 200 character limit constraint.",
            textarea_no_resize:
                "Non-resizable textarea example with locked dimensions.",
            textarea_error: "Clean descriptive text without issues.",
            textarea_helper: "Product specifications and requirements.",
            date: "2026-11-03",
            time: "10:30",
            datetime: "2026-11-03T10:30",
            month: "2026-11",
            temporal_week: "2026-W45",
            temporal_year: "2026",
            grid_description:
                "Comprehensive multi-column registration profile for company records.",
            grid_email: "alex.grid@example.com",
            grid_search: "Cardiology department",
            grid_bio: "Frontend architect and tech lead.",
            grid_username_error: "alex_architect",
            grid_full_name: "Alex Morgan",
            grid_email_address: "alex.morgan@example.com",
            grid_username: "alexmorgan",
            contact: "+1 555-019-2834",
            date_of_birth: "1994-06-15",
            registration_time: "09:00",
            registration_datetime: "2026-11-03T09:00",
            gender: "female",
            department: "cardiology",
            gender_search: "female",
            marital_status: "single",
            nationality: "bangladeshi",
            skills: ["ts", "laravel", "react"],
            address: "123 Innovation Boulevard, Suite 400",
            additional_notes:
                "Prefers morning meetings and async code reviews.",
            profile_picture: null,
            medical_documents: [],
            accept_terms: true,
            receive_updates: true,
            newsletter: true,
            plan_tier: "pro",
        });
        setSubmitted(false);
        AppToast.success(
            "Sample Data Loaded",
            "All fields populated with sample values.",
        );
    };

    /* Filter menu items based on user search */
    const filteredMenuItems = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return menuItems;

        return menuItems.filter((item) => {
            const matchesTitle = item.title.toLowerCase().includes(query);
            const matchesDesc = item.description.toLowerCase().includes(query);
            const matchesCategory = item.category.toLowerCase().includes(query);
            const matchesKeywords = item.keywords.some((kw) =>
                kw.toLowerCase().includes(query),
            );
            return (
                matchesTitle ||
                matchesDesc ||
                matchesCategory ||
                matchesKeywords
            );
        });
    }, [searchQuery]);

    /* Group menu items by category */
    const categorizedMenu = useMemo(() => {
        const groups: Record<string, MenuItem[]> = {};
        for (const item of filteredMenuItems) {
            if (!groups[item.category]) {
                groups[item.category] = [];
            }
            groups[item.category].push(item);
        }
        return groups;
    }, [filteredMenuItems]);

    /* Active menu object */
    const currentMenuItem = useMemo(() => {
        return menuItems.find((item) => item.id === activeTab) ?? menuItems[0];
    }, [activeTab]);

    /* Filtered table records */
    const filteredTableRecords = useMemo(() => {
        const query = tableSearch.trim().toLowerCase();
        if (!query) return sampleTableData;

        return sampleTableData.filter(
            (row) =>
                row.name.toLowerCase().includes(query) ||
                row.email.toLowerCase().includes(query) ||
                row.role.toLowerCase().includes(query) ||
                row.dept.toLowerCase().includes(query) ||
                row.status.toLowerCase().includes(query),
        );
    }, [tableSearch]);

    return (
        /* FIXED VIEWPORT CONTAINER: Left sidebar locked in viewport, right side scrolls independently */
        <div className="flex h-[calc(100svh-4rem)] max-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-background">
            {/* ================================================================
                COMPACT TOP HEADER
            ================================================================= */}
            <header className="h-12 shrink-0 border-b border-border bg-card px-4 sm:px-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-2.5">
                    <h1 className="text-sm sm:text-base font-bold tracking-tight">
                        Components Documentation & Showcase
                    </h1>
                    <Badge
                        variant="secondary"
                        className="font-mono text-[10px] py-0 px-1.5 hidden sm:inline-flex"
                    >
                        v2.0
                    </Badge>
                </div>

                {/* Compact Actions */}
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleFillSampleData}
                        className="h-8 gap-1.5 text-xs px-2.5"
                    >
                        <Sparkles className="size-3.5 text-amber-500" />
                        <span className="hidden sm:inline">Fill Sample</span>
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        className="h-8 gap-1.5 text-xs px-2.5"
                    >
                        <RotateCcw className="size-3.5" />
                        <span className="hidden sm:inline">Reset</span>
                    </Button>

                    <Button
                        type="button"
                        size="sm"
                        onClick={() => handleSubmit()}
                        className="h-8 gap-1.5 text-xs px-2.5"
                    >
                        <Save className="size-3.5" />
                        Save All
                    </Button>
                </div>
            </header>

            {/* ================================================================
                SPLIT VIEWPORT: LEFT LOCKED MENU | RIGHT SCROLLABLE CONTENT
            ================================================================= */}
            <div className="flex flex-1 min-h-0 overflow-hidden p-4 sm:p-5 lg:p-6  gap-5 sm:gap-6">
                {/* ------------------------------------------------------------
                    LEFT SIDEBAR: Stays within viewport, does not scroll page
                ------------------------------------------------------------- */}
                <aside className="w-60 sm:w-68 shrink-0 border  border-border bg-card flex flex-col h-full overflow-hidden rounded-xl">
                    {/* Search Menu Input */}
                    <div className="p-4 border-b border-border shrink-0">
                        <div className="relative">
                            <Search className="text-muted-foreground pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2" />
                            <input
                                id="menu-search-input"
                                type="search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search components..."
                                aria-label="Search components and menus"
                                className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px] h-8 w-full rounded-lg border bg-background pl-8 pr-7 text-xs outline-none transition"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="text-muted-foreground hover:text-foreground absolute right-2 top-1/2 -translate-y-1/2 p-0.5"
                                    aria-label="Clear search"
                                >
                                    <X className="size-3" />
                                </button>
                            )}
                        </div>

                        <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] text-muted-foreground">
                            <span>
                                {searchQuery ? (
                                    <>
                                        Found {filteredMenuItems.length} item
                                        {filteredMenuItems.length !== 1
                                            ? "s"
                                            : ""}
                                    </>
                                ) : (
                                    <>{menuItems.length} components</>
                                )}
                            </span>
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="text-primary hover:underline font-medium"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Navigation list: internal scroll only if items exceed viewport */}
                    <nav
                        className="flex-1 overflow-y-auto p-2 space-y-3"
                        aria-label="Component categories"
                    >
                        {filteredMenuItems.length === 0 ? (
                            <div className="rounded-lg border border-dashed border-border p-4 text-center">
                                <Search className="mx-auto mb-1.5 size-5 text-muted-foreground/50" />
                                <p className="text-xs font-semibold">
                                    No matches
                                </p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mt-2 h-6 text-[10px] px-2"
                                    onClick={() => setSearchQuery("")}
                                >
                                    Clear
                                </Button>
                            </div>
                        ) : (
                            Object.entries(categorizedMenu).map(
                                ([categoryName, items]) => (
                                    <div
                                        key={categoryName}
                                        className="space-y-0.5"
                                    >
                                        <div className="px-2 pt-1 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                            {categoryName}
                                        </div>

                                        {items.map((item) => {
                                            const Icon = item.icon;
                                            const isActive =
                                                activeTab === item.id;
                                            const hasError =
                                                submitted &&
                                                item.fieldKeys?.some(
                                                    (k) => !!errors[k],
                                                );

                                            return (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    onClick={() =>
                                                        setActiveTab(item.id)
                                                    }
                                                    className={cn(
                                                        "group flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition",
                                                        isActive
                                                            ? "bg-primary text-primary-foreground shadow-xs font-medium"
                                                            : "hover:bg-muted text-foreground/80 hover:text-foreground",
                                                    )}
                                                >
                                                    <div className="flex min-w-0 items-center gap-2">
                                                        <Icon
                                                            className={cn(
                                                                "size-3.5 shrink-0 transition-colors",
                                                                isActive
                                                                    ? "text-primary-foreground"
                                                                    : "text-muted-foreground group-hover:text-foreground",
                                                            )}
                                                        />
                                                        <span className="truncate">
                                                            {item.title}
                                                        </span>
                                                    </div>

                                                    <div className="flex shrink-0 items-center gap-1">
                                                        {hasError && (
                                                            <span
                                                                className="size-1.5 rounded-full bg-destructive animate-pulse"
                                                                title="Has errors"
                                                            />
                                                        )}
                                                        {item.fieldCount !==
                                                            undefined && (
                                                            <span
                                                                className={cn(
                                                                    "rounded px-1 py-0.2 text-[9px] font-mono",
                                                                    isActive
                                                                        ? "bg-primary-foreground/20 text-primary-foreground"
                                                                        : "bg-muted text-muted-foreground",
                                                                )}
                                                            >
                                                                {
                                                                    item.fieldCount
                                                                }
                                                            </span>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ),
                            )
                        )}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-2.5 border-t border-border shrink-0 text-[10px] text-muted-foreground flex items-center justify-between">
                        <span>
                            {submitted && Object.keys(errors).length > 0 ? (
                                <span className="text-destructive font-medium">
                                    {Object.keys(errors).length} error(s)
                                </span>
                            ) : (
                                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                    Ready
                                </span>
                            )}
                        </span>
                        <span className="font-mono">
                            {
                                Object.values(values).filter(
                                    (v) =>
                                        v !== "" &&
                                        v !== null &&
                                        (!Array.isArray(v) || v.length > 0),
                                ).length
                            }{" "}
                            / {Object.keys(values).length} filled
                        </span>
                    </div>
                </aside>

                {/* ------------------------------------------------------------
                    RIGHT CONTENT AREA: Scrollable independently
                ------------------------------------------------------------- */}
                <main className="flex-1 h-full overflow-y-auto  bg-background space-y-5">
                    {/* Active Section Header (Compact) */}
                    <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant="outline"
                                        className="text-[10px] py-0 px-1.5"
                                    >
                                        {currentMenuItem.category}
                                    </Badge>
                                    <span className="text-muted-foreground text-[10px] font-mono">
                                        {currentMenuItem.componentName}
                                    </span>
                                </div>
                                <h2 className="text-lg font-bold tracking-tight sm:text-xl flex items-center gap-2">
                                    <currentMenuItem.icon className="size-5 text-primary" />
                                    {currentMenuItem.title}
                                </h2>
                                <p className="text-muted-foreground text-xs">
                                    {currentMenuItem.description}
                                </p>
                            </div>

                            <Button
                                type="button"
                                size="sm"
                                onClick={() => handleSubmit()}
                                className="h-8 gap-1.5 text-xs shrink-0"
                            >
                                <Save className="size-3.5" />
                                Save Form
                            </Button>
                        </div>
                    </div>

                    {/* Component API & Usage Docs Card */}
                    <ComponentDocsCard
                        componentName={currentMenuItem.componentName}
                        importPath={currentMenuItem.importPath}
                        propsList={currentMenuItem.propsList}
                        exampleCode={currentMenuItem.exampleCode}
                        snippetId={currentMenuItem.id}
                        copiedSnippet={copiedSnippet}
                        onCopySnippet={handleCopySnippet}
                    />

                    {/* Interactive Component Showcase Card */}
                    <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-xs">
                        <form onSubmit={handleSubmit} noValidate>
                            {/* 1. TEXT & BASIC INPUTS */}
                            {activeTab === "basic-inputs" && (
                                <div className="space-y-4">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Interactive Component Preview
                                    </h3>

                                    <div className={gridClass}>
                                        <BrandField
                                            id="input-name"
                                            type="text"
                                            label="Name"
                                            placeholder="Enter your name"
                                            {...text("name")}
                                        />

                                        <BrandField
                                            id="input-email"
                                            type="email"
                                            label="Email"
                                            placeholder="example@email.com"
                                            leftIcon={
                                                <Mail className="size-4" />
                                            }
                                            {...text("email")}
                                        />

                                        <BrandField
                                            id="input-password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            label="Password"
                                            placeholder="Enter password"
                                            leftIcon={
                                                <Lock className="size-4" />
                                            }
                                            rightAction={
                                                <button
                                                    type="button"
                                                    aria-label={
                                                        showPassword
                                                            ? "Hide password"
                                                            : "Show password"
                                                    }
                                                    onClick={() =>
                                                        setShowPassword(
                                                            (v) => !v,
                                                        )
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="size-4" />
                                                    ) : (
                                                        <Eye className="size-4" />
                                                    )}
                                                </button>
                                            }
                                            {...text("password")}
                                        />

                                        <BrandField
                                            id="input-search"
                                            type="search"
                                            label="Search"
                                            placeholder="Search products..."
                                            leftIcon={
                                                <Search className="size-4" />
                                            }
                                            {...text("search")}
                                        />

                                        <BrandField
                                            id="input-website"
                                            type="url"
                                            label="Website"
                                            placeholder="https://example.com"
                                            leftIcon={
                                                <Globe className="size-4" />
                                            }
                                            {...text("website")}
                                        />

                                        <BrandField
                                            id="input-phone"
                                            type="tel"
                                            label="Phone"
                                            placeholder="+880 1XXXXXXXXX"
                                            leftIcon={
                                                <Phone className="size-4" />
                                            }
                                            {...text("phone")}
                                        />

                                        <BrandField
                                            id="input-quantity"
                                            type="number"
                                            label="Quantity"
                                            placeholder="Enter quantity"
                                            min={1}
                                            max={100}
                                            {...text("quantity")}
                                        />

                                        <BrandField
                                            id="input-year"
                                            type="year"
                                            label="Year"
                                            placeholder="2026"
                                            min={1900}
                                            max={2035}
                                            {...text("year")}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* 2. DATE & TIME PICKERS */}
                            {activeTab === "date-time" && (
                                <div className="space-y-4">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Interactive Component Preview
                                    </h3>

                                    <div className={gridClass}>
                                        <BrandField
                                            id="input-date"
                                            type="date"
                                            label="Date of Birth"
                                            leftIcon={
                                                <Calendar className="size-4" />
                                            }
                                            {...text("birth_date")}
                                        />

                                        <BrandField
                                            id="input-time"
                                            type="time"
                                            label="Appointment Time"
                                            leftIcon={
                                                <Clock className="size-4" />
                                            }
                                            {...text("appointment_time")}
                                        />

                                        <BrandField
                                            id="input-datetime"
                                            type="datetime-local"
                                            label="Event Date & Time"
                                            {...text("event_date")}
                                        />

                                        <BrandField
                                            id="input-month"
                                            type="month"
                                            label="Billing Month"
                                            {...text("billing_month")}
                                        />

                                        <BrandField
                                            id="input-week"
                                            type="week"
                                            label="Target Week"
                                            {...text("week")}
                                        />

                                        <BrandField
                                            id="temporal-date"
                                            type="date"
                                            label="Standard Date"
                                            leftIcon={
                                                <Calendar className="size-4" />
                                            }
                                            {...text("date")}
                                        />

                                        <BrandField
                                            id="temporal-time"
                                            type="time"
                                            label="Standard Time"
                                            leftIcon={
                                                <Clock className="size-4" />
                                            }
                                            {...text("time")}
                                        />

                                        <BrandField
                                            id="temporal-datetime"
                                            type="datetime-local"
                                            label="Full Timestamp"
                                            {...text("datetime")}
                                        />

                                        <BrandField
                                            id="temporal-month"
                                            type="month"
                                            label="Fiscal Month"
                                            {...text("month")}
                                        />

                                        <BrandField
                                            id="temporal-week"
                                            type="week"
                                            label="Reporting Week"
                                            {...text("temporal_week")}
                                        />

                                        <BrandField
                                            id="temporal-year"
                                            type="year"
                                            label="Budget Year"
                                            min={2000}
                                            max={2035}
                                            {...text("temporal_year")}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* 3. TEXTAREAS & MULTILINE */}
                            {activeTab === "textareas" && (
                                <div className="space-y-4">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Interactive Component Preview
                                    </h3>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <BrandField
                                            id="input-description"
                                            type="textarea"
                                            label="Description (with character counter)"
                                            placeholder="Write detailed description..."
                                            rows={4}
                                            maxLength={1000}
                                            showCount
                                            {...text("description")}
                                        />

                                        <BrandField
                                            id="input-short-description"
                                            type="textarea"
                                            label="Short Description (Non-resizable)"
                                            placeholder="Write brief summary..."
                                            rows={4}
                                            maxLength={300}
                                            showCount
                                            resizable={false}
                                            {...text("short_description")}
                                        />

                                        <BrandField
                                            id="textarea-default"
                                            type="textarea"
                                            label="Default Textarea"
                                            placeholder="Write something here..."
                                            rows={3}
                                            {...text("textarea_default")}
                                        />

                                        <BrandField
                                            id="textarea-rows"
                                            type="textarea"
                                            label="Expanded Textarea (6 Rows)"
                                            placeholder="Write longer essay..."
                                            rows={6}
                                            {...text("textarea_rows")}
                                        />

                                        <BrandField
                                            id="textarea-limit"
                                            type="textarea"
                                            label="Character Limit (Max 200)"
                                            placeholder="Type up to 200 characters..."
                                            rows={4}
                                            maxLength={200}
                                            showCount
                                            {...text("textarea_limit")}
                                        />

                                        <BrandField
                                            id="textarea-no-resize"
                                            type="textarea"
                                            label="Fixed Geometry Textarea"
                                            placeholder="This textarea cannot be resized..."
                                            rows={4}
                                            resizable={false}
                                            {...text("textarea_no_resize")}
                                        />

                                        <BrandField
                                            id="textarea-error"
                                            type="textarea"
                                            label="Textarea with Validation Error"
                                            placeholder="Enter description..."
                                            rows={3}
                                            error="Description is required."
                                            {...text("textarea_error")}
                                        />

                                        <BrandField
                                            id="textarea-helper"
                                            type="textarea"
                                            label="Textarea with Helpful Hint"
                                            placeholder="Enter description..."
                                            rows={3}
                                            helperText="Describe your product architecture."
                                            {...text("textarea_helper")}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* 4. ICONS, SIZES & VARIANTS */}
                            {activeTab === "input-styles" && (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Leading Icon Prefix Fields
                                        </h3>
                                        <div className={gridClass}>
                                            <BrandField
                                                id="icon-username"
                                                type="text"
                                                label="Username"
                                                placeholder="Enter username"
                                                leftIcon={
                                                    <User className="size-4" />
                                                }
                                                {...text("icon_username")}
                                            />

                                            <BrandField
                                                id="icon-email"
                                                type="email"
                                                label="Email"
                                                placeholder="Enter email"
                                                leftIcon={
                                                    <Mail className="size-4" />
                                                }
                                                {...text("icon_email")}
                                            />

                                            <BrandField
                                                id="icon-website"
                                                type="url"
                                                label="Website"
                                                placeholder="https://example.com"
                                                leftIcon={
                                                    <Link className="size-4" />
                                                }
                                                {...text("icon_website")}
                                            />

                                            <BrandField
                                                id="icon-phone"
                                                type="tel"
                                                label="Phone"
                                                placeholder="Phone number"
                                                leftIcon={
                                                    <Phone className="size-4" />
                                                }
                                                {...text("icon_phone")}
                                            />

                                            <BrandField
                                                id="icon-search"
                                                type="search"
                                                label="Search"
                                                placeholder="Search anything..."
                                                leftIcon={
                                                    <Search className="size-4" />
                                                }
                                                {...text("icon_search")}
                                            />

                                            <BrandField
                                                id="icon-number"
                                                type="number"
                                                label="Quantity Metric"
                                                placeholder="Enter number"
                                                leftIcon={
                                                    <Hash className="size-4" />
                                                }
                                                {...text("icon_number")}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3 border-t border-border pt-4">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Input Sizes (sm, md, lg)
                                        </h3>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                            <BrandField
                                                id="size-small"
                                                type="text"
                                                label="Small (sm)"
                                                placeholder="Small input field"
                                                size="sm"
                                                {...text("size_sm")}
                                            />

                                            <BrandField
                                                id="size-medium"
                                                type="text"
                                                label="Medium (md - default)"
                                                placeholder="Medium standard field"
                                                size="md"
                                                {...text("size_md")}
                                            />

                                            <BrandField
                                                id="size-large"
                                                type="text"
                                                label="Large (lg)"
                                                placeholder="Large prominent field"
                                                size="lg"
                                                {...text("size_lg")}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3 border-t border-border pt-4">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Visual Variants (default, filled,
                                            ghost)
                                        </h3>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                            <BrandField
                                                id="variant-default"
                                                type="text"
                                                label="Default"
                                                placeholder="Default variant"
                                                variant="default"
                                                {...text("variant_default")}
                                            />

                                            <BrandField
                                                id="variant-filled"
                                                type="text"
                                                label="Filled"
                                                placeholder="Filled variant"
                                                variant="filled"
                                                {...text("variant_filled")}
                                            />

                                            <BrandField
                                                id="variant-ghost"
                                                type="text"
                                                label="Ghost"
                                                placeholder="Ghost variant"
                                                variant="ghost"
                                                {...text("variant_ghost")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 5. VALIDATION & STATES */}
                            {activeTab === "validation-states" && (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Field States & Validation Feedback
                                        </h3>
                                        <div className={gridClass}>
                                            <BrandField
                                                id="validation-required"
                                                type="text"
                                                label="Required Field"
                                                placeholder="This field is required"
                                                required
                                                error={errorFor(
                                                    "required_field",
                                                )}
                                                {...text("required_field")}
                                            />

                                            <BrandField
                                                id="validation-error"
                                                type="email"
                                                label="Email with Error"
                                                placeholder="Enter email"
                                                error="Please enter a valid company email address."
                                                {...text("validation_email")}
                                            />

                                            <BrandField
                                                id="validation-helper"
                                                type="text"
                                                label="Username with Hint"
                                                placeholder="Enter username"
                                                helperText="Must be at least 5 characters."
                                                {...text("validation_username")}
                                            />

                                            <BrandField
                                                id="validation-error-helper"
                                                type="text"
                                                label="Username with Error & Hint"
                                                placeholder="Enter username"
                                                error="Username is already taken."
                                                helperText="Try another handle."
                                                {...text(
                                                    "validation_username_taken",
                                                )}
                                            />

                                            <BrandField
                                                id="state-disabled"
                                                type="text"
                                                label="Disabled Field"
                                                placeholder="Disabled from interaction"
                                                disabled
                                                {...text("disabled_field")}
                                            />

                                            <BrandField
                                                id="state-readonly"
                                                name="readonly"
                                                type="text"
                                                label="Read-Only Field"
                                                value="Locked value that cannot be altered"
                                                readOnly
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3 border-t border-border pt-4">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Character Limit Counters
                                        </h3>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <BrandField
                                                id="count-title"
                                                type="text"
                                                label="Product Title (Max 100)"
                                                placeholder="Enter product title..."
                                                maxLength={100}
                                                showCount
                                                {...text("product_title")}
                                            />

                                            <BrandField
                                                id="count-bio"
                                                type="textarea"
                                                label="Bio (Max 500)"
                                                placeholder="Write your professional bio..."
                                                rows={3}
                                                maxLength={500}
                                                showCount
                                                {...text("bio")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 6. SELECT & MULTI-SELECT */}
                            {activeTab === "search-selects" && (
                                <div className="space-y-4">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Interactive Component Preview
                                    </h3>

                                    <div className={gridClass}>
                                        <BrandFieldSearchSelect
                                            label="Department"
                                            required
                                            placeholder="Select a department"
                                            searchPlaceholder="Search departments..."
                                            emptyMessage="No department found."
                                            options={departmentOptions}
                                            {...single("department")}
                                        />

                                        <BrandFieldSearchSelect
                                            label="Gender"
                                            required
                                            placeholder="Select a gender"
                                            searchPlaceholder="Search genders..."
                                            emptyMessage="No gender found."
                                            options={genderOptions}
                                            {...single("gender_search")}
                                        />

                                        <BrandFieldSearchSelect
                                            label="Marital Status"
                                            required
                                            placeholder="Select marital status"
                                            searchPlaceholder="Search marital statuses..."
                                            emptyMessage="No marital status found."
                                            options={maritalStatusOptions}
                                            {...single("marital_status")}
                                        />

                                        <BrandFieldSearchSelect
                                            label="Nationality"
                                            required
                                            placeholder="Select nationality"
                                            searchPlaceholder="Search nationalities..."
                                            emptyMessage="No nationality found."
                                            options={nationalityOptions}
                                            {...single("nationality")}
                                        />

                                        <div className="sm:col-span-2 lg:col-span-4">
                                            <BrandFieldSearchSelect
                                                multiple
                                                name="skills[]"
                                                label="Skills & Technologies (Multi-Select)"
                                                placeholder="Select relevant skills"
                                                searchPlaceholder="Search skills..."
                                                emptyMessage="No matching skill found."
                                                options={skillOptions}
                                                value={values.skills}
                                                onValueChange={(val) =>
                                                    setField("skills", val)
                                                }
                                                helperText="Click chips to remove them or choose additional items from the dropdown list."
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 7. FILE UPLOADS */}
                            {activeTab === "file-uploads" && (
                                <div className="space-y-4">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Interactive Component Preview
                                    </h3>

                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                        <div>
                                            <CaptureChange
                                                onCapture={(element) => {
                                                    if (
                                                        element instanceof
                                                            HTMLInputElement &&
                                                        element.type === "file"
                                                    ) {
                                                        const file =
                                                            element
                                                                .files?.[0] ??
                                                            null;
                                                        setField(
                                                            "profile_picture",
                                                            file,
                                                        );
                                                    }
                                                }}
                                            >
                                                <BrandSingleFile
                                                    key={`profile-${resetCount}`}
                                                    id="profile-picture"
                                                    name="profile_picture"
                                                    label="Profile Picture"
                                                    required
                                                />
                                            </CaptureChange>

                                            <FieldError
                                                message={errorFor(
                                                    "profile_picture",
                                                )}
                                            />
                                        </div>

                                        <div>
                                            <CaptureChange
                                                onCapture={(element) => {
                                                    if (
                                                        element instanceof
                                                            HTMLInputElement &&
                                                        element.type === "file"
                                                    ) {
                                                        const files =
                                                            Array.from(
                                                                element.files ??
                                                                    [],
                                                            );
                                                        setField(
                                                            "medical_documents",
                                                            files,
                                                        );
                                                    }
                                                }}
                                            >
                                                <BrandMultipleFile
                                                    key={`documents-${resetCount}`}
                                                    label="Supporting Documents"
                                                    required
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    description="Upload one or more PDF, JPG, or PNG files (Max 2 MB each)"
                                                    maxFileSizeMB={2}
                                                    maxFiles={3}
                                                />
                                            </CaptureChange>

                                            <FieldError
                                                message={errorFor(
                                                    "medical_documents",
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 8. CHECKBOXES & RADIOS */}
                            {activeTab === "checkboxes-radios" && (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Checkbox Options
                                        </h3>

                                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                            <div className="space-y-3 rounded-xl border border-border p-3.5">
                                                <div className="flex items-center gap-2.5">
                                                    <Checkbox
                                                        id="check-terms"
                                                        name="accept_terms"
                                                        checked={
                                                            values.accept_terms
                                                        }
                                                        onCheckedChange={(
                                                            checked,
                                                        ) =>
                                                            setField(
                                                                "accept_terms",
                                                                checked ===
                                                                    true,
                                                            )
                                                        }
                                                    />
                                                    <Label
                                                        htmlFor="check-terms"
                                                        className="text-xs"
                                                    >
                                                        Accept terms & service
                                                        conditions
                                                    </Label>
                                                </div>

                                                <div className="flex items-center gap-2.5">
                                                    <Checkbox
                                                        id="check-updates"
                                                        name="receive_updates"
                                                        checked={
                                                            values.receive_updates
                                                        }
                                                        onCheckedChange={(
                                                            checked,
                                                        ) =>
                                                            setField(
                                                                "receive_updates",
                                                                checked ===
                                                                    true,
                                                            )
                                                        }
                                                    />
                                                    <Label
                                                        htmlFor="check-updates"
                                                        className="text-xs"
                                                    >
                                                        Receive product email
                                                        updates
                                                    </Label>
                                                </div>

                                                <div className="flex items-center gap-2.5">
                                                    <Checkbox
                                                        id="check-disabled"
                                                        disabled
                                                    />
                                                    <Label
                                                        htmlFor="check-disabled"
                                                        className="text-muted-foreground text-xs"
                                                    >
                                                        Disabled checkbox
                                                    </Label>
                                                </div>

                                                <div className="flex items-center gap-2.5">
                                                    <Checkbox
                                                        id="check-checked-disabled"
                                                        defaultChecked
                                                        disabled
                                                    />
                                                    <Label
                                                        htmlFor="check-checked-disabled"
                                                        className="text-muted-foreground text-xs"
                                                    >
                                                        Checked & disabled
                                                        option
                                                    </Label>
                                                </div>
                                            </div>

                                            <div className="space-y-3 rounded-xl border border-border p-3.5">
                                                <label className="hover:border-primary/50 flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition">
                                                    <Checkbox
                                                        name="newsletter"
                                                        checked={
                                                            values.newsletter
                                                        }
                                                        onCheckedChange={(
                                                            checked,
                                                        ) =>
                                                            setField(
                                                                "newsletter",
                                                                checked ===
                                                                    true,
                                                            )
                                                        }
                                                        className="mt-0.5"
                                                    />
                                                    <div className="space-y-0.5">
                                                        <p className="text-xs font-semibold">
                                                            Weekly Tech Digest
                                                        </p>
                                                        <p className="text-muted-foreground text-[11px] leading-relaxed">
                                                            Receive updates and
                                                            releases every
                                                            Monday.
                                                        </p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Radio Group */}
                                    <div className="space-y-3 border-t border-border pt-4">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Radio Group: Subscription Tier
                                        </h3>

                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                            {planOptions.map((plan) => {
                                                const isSelected =
                                                    values.plan_tier ===
                                                    plan.id;
                                                return (
                                                    <label
                                                        key={plan.id}
                                                        onClick={() => {
                                                            setField(
                                                                "plan_tier",
                                                                plan.id,
                                                            );
                                                        }}
                                                        className={cn(
                                                            "relative flex cursor-pointer flex-col justify-between rounded-xl border p-3.5 transition",
                                                            isSelected
                                                                ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary"
                                                                : "border-border hover:border-border/80 bg-card",
                                                        )}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-semibold text-xs">
                                                                {plan.name}
                                                            </span>
                                                            <div
                                                                className={cn(
                                                                    "size-3.5 rounded-full border flex items-center justify-center",
                                                                    isSelected
                                                                        ? "border-primary bg-primary"
                                                                        : "border-muted-foreground/40",
                                                                )}
                                                            >
                                                                {isSelected && (
                                                                    <div className="size-1.5 rounded-full bg-white" />
                                                                )}
                                                            </div>
                                                        </div>

                                                        <p className="text-[11px] text-muted-foreground my-1.5 leading-relaxed">
                                                            {plan.desc}
                                                        </p>

                                                        <div className="mt-1 text-xs font-bold text-primary">
                                                            {plan.price}
                                                        </div>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 9. REGISTRATION FORM GRID */}
                            {activeTab === "form-grid" && (
                                <div className="space-y-4">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Interactive Component Preview
                                    </h3>

                                    <div className={gridClass}>
                                        <div className="sm:col-span-2 lg:col-span-2">
                                            <BrandField
                                                id="grid-description"
                                                type="textarea"
                                                label="Profile Summary"
                                                placeholder="Write profile summary..."
                                                rows={4}
                                                maxLength={1000}
                                                showCount
                                                {...text("grid_description")}
                                            />
                                        </div>

                                        <BrandField
                                            id="grid-email"
                                            label="Work Email"
                                            type="email"
                                            required
                                            placeholder="user@enterprise.com"
                                            error={errorFor("grid_email")}
                                            {...text("grid_email")}
                                        />

                                        <BrandField
                                            id="grid-search"
                                            type="search"
                                            leftIcon={
                                                <SearchIcon className="size-4" />
                                            }
                                            placeholder="Search directory..."
                                            size="md"
                                            variant="filled"
                                            {...text("grid_search")}
                                        />

                                        <BrandField
                                            id="grid-bio"
                                            label="Short Bio"
                                            maxLength={160}
                                            showCount
                                            helperText="Tell us about yourself"
                                            {...text("grid_bio")}
                                        />

                                        <BrandField
                                            id="grid-username-error"
                                            label="Username"
                                            error="Username already taken"
                                            {...text("grid_username_error")}
                                        />

                                        <BrandField
                                            id="grid-full-name"
                                            label="Full Name"
                                            placeholder="Enter your name"
                                            required
                                            leftIcon={
                                                <User className="size-4" />
                                            }
                                            error={errorFor("grid_full_name")}
                                            {...text("grid_full_name")}
                                        />

                                        <BrandField
                                            id="grid-email-address"
                                            label="Personal Email"
                                            type="email"
                                            placeholder="name@example.com"
                                            required
                                            leftIcon={
                                                <Mail className="size-4" />
                                            }
                                            error={errorFor(
                                                "grid_email_address",
                                            )}
                                            {...text("grid_email_address")}
                                        />

                                        <BrandField
                                            id="grid-username"
                                            label="Account Handle"
                                            type="text"
                                            placeholder="e.g. jsmith"
                                            required
                                            error={errorFor("grid_username")}
                                            {...text("grid_username")}
                                        />

                                        <BrandField
                                            id="grid-contact"
                                            label="Contact Number"
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            {...text("contact")}
                                        />

                                        <BrandField
                                            id="grid-date-of-birth"
                                            label="Date of Birth"
                                            type="date"
                                            {...text("date_of_birth")}
                                        />

                                        <BrandField
                                            id="grid-registration-time"
                                            label="Shift Start Time"
                                            type="time"
                                            {...text("registration_time")}
                                        />

                                        <BrandField
                                            id="grid-registration-datetime"
                                            label="Enrollment Timestamp"
                                            type="datetime-local"
                                            {...text("registration_datetime")}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* 10. BUTTONS & ACTIONS */}
                            {activeTab === "buttons" && (
                                <div className="space-y-5">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Interactive Component Preview
                                    </h3>

                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                        <div className="rounded-xl border border-border p-3.5 space-y-2.5">
                                            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                                Icon Only Buttons
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    aria-label="Save"
                                                >
                                                    <Save className="size-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="secondary"
                                                    aria-label="Download"
                                                >
                                                    <Download className="size-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    aria-label="Upload"
                                                >
                                                    <Upload className="size-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                    aria-label="Delete"
                                                >
                                                    <Trash2 className="size-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    aria-label="Edit"
                                                >
                                                    <Edit className="size-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="rounded-xl border border-border p-3.5 space-y-2.5">
                                            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                                Small Size Buttons (sm)
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                <Button size="sm">
                                                    <Save className="size-3.5" />
                                                    Save
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                >
                                                    <Plus className="size-3.5" />
                                                    Add New
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                >
                                                    <Download className="size-3.5" />
                                                    Export
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="rounded-xl border border-border p-3.5 space-y-2.5">
                                            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                                Standard Buttons (default)
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                <Button>
                                                    <Save className="size-4" />
                                                    Save Changes
                                                </Button>
                                                <Button variant="secondary">
                                                    <Plus className="size-4" />
                                                    Create
                                                </Button>
                                                <Button variant="destructive">
                                                    <Trash2 className="size-4" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="rounded-xl border border-border p-3.5 space-y-2.5">
                                            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                                Large Buttons (lg)
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                <Button size="lg">
                                                    <Save className="size-4" />
                                                    Publish
                                                </Button>
                                                <Button
                                                    size="lg"
                                                    variant="secondary"
                                                >
                                                    <Upload className="size-4" />
                                                    Upload
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 11. MODALS & DIALOGS */}
                            {activeTab === "modals-dialogs" && (
                                <div className="space-y-4">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Interactive Component Preview
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border p-4 bg-muted/20">
                                        <UserModalDemo />
                                    </div>
                                </div>
                            )}

                            {/* 12. TOAST NOTIFICATIONS */}
                            {activeTab === "toast-alerts" && (
                                <div className="space-y-4">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Interactive Component Preview
                                    </h3>

                                    <div className="flex flex-wrap gap-2.5 rounded-xl border border-border p-4 bg-muted/20">
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() =>
                                                AppToast.success(
                                                    "Operation Completed",
                                                    "The action completed successfully.",
                                                )
                                            }
                                        >
                                            Success Toast
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                AppToast.warning(
                                                    "Attention Required",
                                                    "Please check configuration.",
                                                )
                                            }
                                        >
                                            Warning Toast
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() =>
                                                AppToast.error(
                                                    "Action Failed",
                                                    "Something went wrong.",
                                                )
                                            }
                                        >
                                            Error Toast
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                            onClick={() =>
                                                AppToast.info(
                                                    "Update Available",
                                                    "A newer version is ready.",
                                                )
                                            }
                                        >
                                            Info Toast
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                const id = AppToast.loading(
                                                    "Uploading assets...",
                                                    "Please wait.",
                                                );
                                                setTimeout(() => {
                                                    AppToast.dismiss(id);
                                                    AppToast.success(
                                                        "Upload Complete",
                                                        "Files synced successfully.",
                                                    );
                                                }, 2000);
                                            }}
                                        >
                                            Loading Toast (2s)
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* 13. DATA TABLE SHOWCASE */}
                            {activeTab === "tables-display" && (
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Interactive Component Preview
                                        </h3>

                                        <div className="relative w-full sm:w-56">
                                            <Search className="text-muted-foreground pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2" />
                                            <input
                                                type="search"
                                                value={tableSearch}
                                                onChange={(e) =>
                                                    setTableSearch(
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Filter users..."
                                                className="border-input placeholder:text-muted-foreground h-8 w-full rounded-lg border bg-background pl-8 pr-3 text-xs outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto rounded-xl border border-border">
                                        <table className="w-full text-left text-xs">
                                            <thead className="border-b border-border bg-muted/50 font-semibold text-muted-foreground">
                                                <tr>
                                                    <th className="px-3.5 py-2.5">
                                                        ID
                                                    </th>
                                                    <th className="px-3.5 py-2.5">
                                                        User
                                                    </th>
                                                    <th className="px-3.5 py-2.5">
                                                        Department
                                                    </th>
                                                    <th className="px-3.5 py-2.5">
                                                        Status
                                                    </th>
                                                    <th className="px-3.5 py-2.5 text-right">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border">
                                                {filteredTableRecords.map(
                                                    (row) => (
                                                        <tr
                                                            key={row.id}
                                                            className="hover:bg-muted/40 transition"
                                                        >
                                                            <td className="px-3.5 py-2 font-mono text-[11px] text-muted-foreground">
                                                                {row.id}
                                                            </td>
                                                            <td className="px-3.5 py-2">
                                                                <div className="font-semibold text-foreground">
                                                                    {row.name}
                                                                </div>
                                                                <div className="text-muted-foreground text-[10px]">
                                                                    {row.email}
                                                                </div>
                                                            </td>
                                                            <td className="px-3.5 py-2">
                                                                <div>
                                                                    {row.dept}
                                                                </div>
                                                                <div className="text-muted-foreground text-[10px]">
                                                                    {row.role}
                                                                </div>
                                                            </td>
                                                            <td className="px-3.5 py-2">
                                                                <Badge
                                                                    variant={
                                                                        row.status ===
                                                                        "Active"
                                                                            ? "default"
                                                                            : row.status ===
                                                                                "Pending"
                                                                              ? "secondary"
                                                                              : "outline"
                                                                    }
                                                                    className="text-[10px] py-0 px-1.5"
                                                                >
                                                                    {row.status}
                                                                </Badge>
                                                            </td>
                                                            <td className="px-3.5 py-2 text-right">
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-6 text-[11px] px-2"
                                                                    onClick={() =>
                                                                        AppToast.info(
                                                                            "User Selected",
                                                                            `Selected ${row.name}`,
                                                                        )
                                                                    }
                                                                >
                                                                    Select
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    ),
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* 14. LIVE STATE & SNAPSHOT */}
                            {activeTab === "live-state" && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                            Interactive State Inspector
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                className="h-7 text-xs"
                                                onClick={handleReset}
                                            >
                                                Reset
                                            </Button>
                                            <Button
                                                type="submit"
                                                size="sm"
                                                className="h-7 text-xs"
                                            >
                                                Save Snapshot
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                        <div className="rounded-xl border border-border bg-card p-3.5 space-y-2">
                                            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                                                Active Form State
                                            </h4>
                                            <pre className="text-muted-foreground max-h-80 overflow-auto rounded-lg bg-muted/40 p-3 font-mono text-[11px] leading-relaxed border border-border/50">
                                                {JSON.stringify(
                                                    serialize(values),
                                                    null,
                                                    2,
                                                )}
                                            </pre>
                                        </div>

                                        <div className="rounded-xl border border-border bg-card p-3.5 space-y-2">
                                            <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                                Captured Snapshot
                                            </h4>
                                            {savedValues ? (
                                                <pre className="text-muted-foreground max-h-80 overflow-auto rounded-lg bg-muted/40 p-3 font-mono text-[11px] leading-relaxed border border-border/50">
                                                    {JSON.stringify(
                                                        serialize(savedValues),
                                                        null,
                                                        2,
                                                    )}
                                                </pre>
                                            ) : (
                                                <div className="flex h-56 flex-col items-center justify-center rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
                                                    <Save className="mb-2 size-5 text-muted-foreground/40" />
                                                    <p className="font-semibold text-foreground">
                                                        No Snapshot Saved
                                                    </p>
                                                    <p className="text-[11px] mt-0.5">
                                                        Click &quot;Save
                                                        Snapshot&quot; above to
                                                        capture current values.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}

ComponentsExample.layout = {
    title: "Components Example",
    description:
        "This page is used to showcase the components in the application.",
};
