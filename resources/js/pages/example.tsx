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
} from "lucide-react";

import {
    useMemo,
    useState,
    type ChangeEvent,
    type FormEvent,
    type ReactNode,
} from "react";

import { FormMultipleFileUpload } from "@/components/form/form-multipe-file";
import { FormSelect } from "@/components/form/form-select";
import { BrandFieldSearchSelect } from "@/components/form/BrandFieldSearchSelect";
import { FormSingleFileUpload } from "@/components/form/form-single-file";
import { FormTextarea } from "@/components/form/form-textarea";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { appToast } from "@/components/shared/toast";
import DeleteAlert from "@/components/shared/delete-alert";
import { Modal } from "@/components/shared/modal";
import { BrandField } from "@/components/form/BrandField";

const gridClass =
    "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

const sectionClass =
    "mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm";

const sectionTitleClass = "mb-6 text-xl font-bold tracking-tight";

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
};

type FormValues = typeof initialValues;
type FieldKey = keyof FormValues;
type FormErrors = Partial<Record<FieldKey, string>>;

/** Keys whose value is a plain string (inputs, textareas, selects). */
type TextKey = {
    [K in FieldKey]: FormValues[K] extends string ? K : never;
}[FieldKey];

type SingleSelectKey = Extract<
    TextKey,
    "gender_search" | "department" | "marital_status" | "nationality"
>;

/* -------------------------------------------------------------------------- */
/* Validation (pure: errors are derived from the values, never stale)         */
/* -------------------------------------------------------------------------- */

const requiredFields: FieldKey[] = [
    "required_field",
    "grid_email",
    "grid_full_name",
    "grid_email_address",
    "grid_username",
    "gender",
    "department",
    "gender_search",
    "marital_status",
    "nationality",
    "address",
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

/** Safe-to-display copy of the form (no password, files reduced to name + size). */
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

/**
 * Captures `change` events that bubble up from a child component, so state can
 * follow it without knowing that component's prop names (file uploads, FormTextarea).
 */
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
export function UserModalDemo() {
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
        appToast.success("Profile updated", `Saved ${draft.name}.`);
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            <Button onClick={openModal}>Open Modal</Button>

            <span className="text-muted-foreground text-sm">
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
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>

                        <Button onClick={saveProfile}>Save changes</Button>
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

/**
 * Main Components Example
 */
export default function ComponentsExample() {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [submitted, setSubmitted] = useState(false);
    const [savedValues, setSavedValues] = useState<FormValues | null>(null);
    const [resetCount, setResetCount] = useState(0);
    const [showPassword, setShowPassword] = useState(false);

    const errors = useMemo(() => validate(values), [values]);

    /** One typed setter for every field. */
    const setField = <K extends FieldKey>(key: K, value: FormValues[K]) =>
        setValues((previous) => ({ ...previous, [key]: value }));

    /** Show validation errors only after the first submit attempt. */
    const errorFor = (key: FieldKey) => (submitted ? errors[key] : undefined);

    /** Props for <BrandField /> inputs and textareas. */
    const text = (key: TextKey) => ({
        name: key,
        value: values[key],
        onChange: (
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => setField(key, event.target.value),
    });

    /** Props for single <BrandFieldSearchSelect /> fields. */
    const single = (key: SingleSelectKey) => ({
        name: key,
        value: values[key],
        onValueChange: (value: string) => setField(key, value),
        error: errorFor(key),
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);

        if (Object.keys(errors).length > 0) {
            appToast.error(
                "Check the form",
                "Please fix the highlighted fields.",
            );

            return;
        }

        setSavedValues(values);
        appToast.success("Saved", "All field values were captured.");
    };

    const handleReset = () => {
        setValues(initialValues);
        setSubmitted(false);
        setSavedValues(null);
        setShowPassword(false);
        // Remounts components that keep their own internal state (file uploads, FormTextarea).
        setResetCount((count) => count + 1);
    };

    return (
        <div className="mx-auto w-full space-y-8 px-4 py-6 sm:px-6 lg:px-8">
            {/* ================================================================
                PAGE HEADER
            ================================================================= */}

            <header className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Components Example
                </h1>

                <p className="text-muted-foreground text-sm sm:text-base">
                    This page is used to showcase the components in the
                    application.
                </p>
            </header>

            <div className="border-border bg-card rounded-2xl border p-4 shadow-sm sm:p-6 lg:p-8">
                {/* Every field below lives inside ONE form and ONE state object. */}
                <form onSubmit={handleSubmit} noValidate>
                    {/* ============================================================
                        ALL INPUT TYPES
                    ============================================================= */}

                    <section className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold sm:text-2xl">
                                All Input Types
                            </h2>

                            <p className="text-muted-foreground mt-1 text-sm">
                                Complete BrandField component examples.
                            </p>
                        </div>

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
                                leftIcon={<Mail className="size-4" />}
                                {...text("email")}
                            />

                            <BrandField
                                id="input-password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                placeholder="Enter password"
                                leftIcon={<Lock className="size-4" />}
                                rightAction={
                                    <button
                                        type="button"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        onClick={() =>
                                            setShowPassword((value) => !value)
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
                                leftIcon={<Search className="size-4" />}
                                {...text("search")}
                            />

                            <BrandField
                                id="input-website"
                                type="url"
                                label="Website"
                                placeholder="https://example.com"
                                leftIcon={<Globe className="size-4" />}
                                {...text("website")}
                            />

                            <BrandField
                                id="input-phone"
                                type="tel"
                                label="Phone"
                                placeholder="+880 1XXXXXXXXX"
                                leftIcon={<Phone className="size-4" />}
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

                            <BrandField
                                id="input-date"
                                type="date"
                                label="Date"
                                {...text("birth_date")}
                            />

                            <BrandField
                                id="input-time"
                                type="time"
                                label="Time"
                                {...text("appointment_time")}
                            />

                            <BrandField
                                id="input-datetime"
                                type="datetime-local"
                                label="Date & Time"
                                {...text("event_date")}
                            />

                            <BrandField
                                id="input-month"
                                type="month"
                                label="Month"
                                {...text("billing_month")}
                            />

                            <BrandField
                                id="input-week"
                                type="week"
                                label="Week"
                                {...text("week")}
                            />

                            {/* Two-column textarea */}
                            <div className="sm:col-span-2">
                                <BrandField
                                    id="input-description"
                                    type="textarea"
                                    label="Description"
                                    placeholder="Write description..."
                                    rows={5}
                                    maxLength={1000}
                                    showCount
                                    {...text("description")}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <BrandField
                                    id="input-short-description"
                                    type="textarea"
                                    label="Short Description"
                                    placeholder="Write short description..."
                                    rows={5}
                                    maxLength={300}
                                    showCount
                                    resizable={false}
                                    {...text("short_description")}
                                />
                            </div>
                        </div>
                    </section>

                    {/* ============================================================
                        ICON EXAMPLES
                    ============================================================= */}

                    <section className={sectionClass}>
                        <h2 className={sectionTitleClass}>Icons</h2>

                        <div className={gridClass}>
                            <BrandField
                                id="icon-username"
                                type="text"
                                label="Username"
                                placeholder="Enter username"
                                leftIcon={<User className="size-4" />}
                                {...text("icon_username")}
                            />

                            <BrandField
                                id="icon-email"
                                type="email"
                                label="Email"
                                placeholder="Enter email"
                                leftIcon={<Mail className="size-4" />}
                                {...text("icon_email")}
                            />

                            <BrandField
                                id="icon-website"
                                type="url"
                                label="Website"
                                placeholder="https://example.com"
                                leftIcon={<Link className="size-4" />}
                                {...text("icon_website")}
                            />

                            <BrandField
                                id="icon-phone"
                                type="tel"
                                label="Phone"
                                placeholder="Phone number"
                                leftIcon={<Phone className="size-4" />}
                                {...text("icon_phone")}
                            />

                            <BrandField
                                id="icon-search"
                                type="search"
                                label="Search"
                                placeholder="Search..."
                                leftIcon={<Search className="size-4" />}
                                {...text("icon_search")}
                            />

                            <BrandField
                                id="icon-number"
                                type="number"
                                label="Number"
                                placeholder="Enter number"
                                leftIcon={<Hash className="size-4" />}
                                {...text("icon_number")}
                            />
                        </div>
                    </section>

                    {/* ============================================================
                        SIZES
                    ============================================================= */}

                    <section className={sectionClass}>
                        <h2 className={sectionTitleClass}>Sizes</h2>

                        <div className={gridClass}>
                            <BrandField
                                id="size-small"
                                type="text"
                                label="Small"
                                placeholder="Small input"
                                size="sm"
                                {...text("size_sm")}
                            />

                            <BrandField
                                id="size-medium"
                                type="text"
                                label="Medium"
                                placeholder="Medium input"
                                size="md"
                                {...text("size_md")}
                            />

                            <BrandField
                                id="size-large"
                                type="text"
                                label="Large"
                                placeholder="Large input"
                                size="lg"
                                {...text("size_lg")}
                            />
                        </div>
                    </section>

                    {/* ============================================================
                        VARIANTS
                    ============================================================= */}

                    <section className={sectionClass}>
                        <h2 className={sectionTitleClass}>Variants</h2>

                        <div className={gridClass}>
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
                    </section>

                    {/* ============================================================
                        CHARACTER COUNT
                    ============================================================= */}

                    <section className={sectionClass}>
                        <h2 className={sectionTitleClass}>Character Count</h2>

                        <div className={gridClass}>
                            <BrandField
                                id="count-title"
                                type="text"
                                label="Product Title"
                                placeholder="Enter product title"
                                maxLength={100}
                                showCount
                                {...text("product_title")}
                            />

                            <div className="sm:col-span-2">
                                <BrandField
                                    id="count-bio"
                                    type="textarea"
                                    label="Bio"
                                    placeholder="Write your bio..."
                                    rows={5}
                                    maxLength={500}
                                    showCount
                                    {...text("bio")}
                                />
                            </div>
                        </div>
                    </section>

                    {/* ============================================================
                        VALIDATION
                    ============================================================= */}

                    <section className={sectionClass}>
                        <h2 className={sectionTitleClass}>Validation</h2>

                        <div className={gridClass}>
                            <BrandField
                                id="validation-required"
                                type="text"
                                label="Required Field"
                                placeholder="This field is required"
                                required
                                error={errorFor("required_field")}
                                {...text("required_field")}
                            />

                            <BrandField
                                id="validation-error"
                                type="email"
                                label="Email"
                                placeholder="Enter email"
                                error="Please enter a valid email address."
                                {...text("validation_email")}
                            />

                            <BrandField
                                id="validation-helper"
                                type="text"
                                label="Username"
                                placeholder="Enter username"
                                helperText="Username must be at least 5 characters."
                                {...text("validation_username")}
                            />

                            <BrandField
                                id="validation-error-helper"
                                type="text"
                                label="Username"
                                placeholder="Enter username"
                                error="Username is already taken."
                                helperText="Try another username."
                                {...text("validation_username_taken")}
                            />
                        </div>
                    </section>

                    {/* ============================================================
                        STATES
                    ============================================================= */}

                    <section className={sectionClass}>
                        <h2 className={sectionTitleClass}>States</h2>

                        <div className={gridClass}>
                            <BrandField
                                id="state-disabled"
                                type="text"
                                label="Disabled"
                                placeholder="Disabled input"
                                disabled
                                {...text("disabled_field")}
                            />

                            <BrandField
                                id="state-readonly"
                                name="readonly"
                                type="text"
                                label="Read Only"
                                value="This value cannot be changed"
                                readOnly
                            />
                        </div>
                    </section>

                    {/* ============================================================
                        TEXTAREA VARIATIONS
                    ============================================================= */}

                    <section className={sectionClass}>
                        <h2 className={sectionTitleClass}>
                            Textarea Variations
                        </h2>

                        <div className={gridClass}>
                            <BrandField
                                id="textarea-default"
                                type="textarea"
                                label="Default Textarea"
                                placeholder="Write something..."
                                {...text("textarea_default")}
                            />

                            <BrandField
                                id="textarea-rows"
                                type="textarea"
                                label="Textarea with Rows"
                                placeholder="Write something..."
                                rows={8}
                                {...text("textarea_rows")}
                            />

                            <BrandField
                                id="textarea-limit"
                                type="textarea"
                                label="Textarea with Character Limit"
                                placeholder="Maximum 200 characters..."
                                rows={5}
                                maxLength={200}
                                showCount
                                {...text("textarea_limit")}
                            />

                            <BrandField
                                id="textarea-no-resize"
                                type="textarea"
                                label="Non-resizable Textarea"
                                placeholder="This textarea cannot be resized."
                                rows={5}
                                resizable={false}
                                {...text("textarea_no_resize")}
                            />

                            <BrandField
                                id="textarea-error"
                                type="textarea"
                                label="Description"
                                placeholder="Enter description..."
                                rows={5}
                                error="Description is required."
                                {...text("textarea_error")}
                            />

                            <BrandField
                                id="textarea-helper"
                                type="textarea"
                                label="Description"
                                placeholder="Enter description..."
                                rows={5}
                                helperText="Describe your product in detail."
                                {...text("textarea_helper")}
                            />
                        </div>
                    </section>

                    {/* ============================================================
                        DATE / TIME
                    ============================================================= */}

                    <section className={sectionClass}>
                        <h2 className={sectionTitleClass}>
                            Date / Time Inputs
                        </h2>

                        <div className={gridClass}>
                            <BrandField
                                id="temporal-date"
                                type="date"
                                label="Date"
                                leftIcon={<Calendar className="size-4" />}
                                {...text("date")}
                            />

                            <BrandField
                                id="temporal-time"
                                type="time"
                                label="Time"
                                leftIcon={<Clock className="size-4" />}
                                {...text("time")}
                            />

                            <BrandField
                                id="temporal-datetime"
                                type="datetime-local"
                                label="Date & Time"
                                {...text("datetime")}
                            />

                            <BrandField
                                id="temporal-month"
                                type="month"
                                label="Month"
                                {...text("month")}
                            />

                            <BrandField
                                id="temporal-week"
                                type="week"
                                label="Week"
                                {...text("temporal_week")}
                            />

                            <BrandField
                                id="temporal-year"
                                type="year"
                                label="Year"
                                min={2000}
                                max={2035}
                                {...text("temporal_year")}
                            />
                        </div>
                    </section>

                    {/* ============================================================
                        FORM COMPONENTS
                    ============================================================= */}

                    <section className={sectionClass}>
                        <h2 className={sectionTitleClass}>Form Components</h2>

                        <div className={gridClass}>
                            {/* Description */}
                            <div className="sm:col-span-2 lg:col-span-2">
                                <BrandField
                                    id="grid-description"
                                    type="textarea"
                                    label="Description"
                                    placeholder="Write description..."
                                    rows={5}
                                    maxLength={1000}
                                    showCount
                                    {...text("grid_description")}
                                />
                            </div>

                            <BrandField
                                id="grid-email"
                                label="Email"
                                type="email"
                                required
                                placeholder="example@email.com"
                                error={errorFor("grid_email")}
                                {...text("grid_email")}
                            />

                            <BrandField
                                id="grid-search"
                                type="search"
                                leftIcon={<SearchIcon className="size-4" />}
                                placeholder="Search..."
                                size="lg"
                                variant="filled"
                                {...text("grid_search")}
                            />

                            <BrandField
                                id="grid-bio"
                                label="Bio"
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
                                leftIcon={<User className="size-4" />}
                                error={errorFor("grid_full_name")}
                                {...text("grid_full_name")}
                            />

                            <BrandField
                                id="grid-email-address"
                                label="Email Address"
                                type="email"
                                placeholder="name@example.com"
                                required
                                leftIcon={<Mail className="size-4" />}
                                error={errorFor("grid_email_address")}
                                {...text("grid_email_address")}
                            />

                            <BrandField
                                id="grid-username"
                                label="Username"
                                type="text"
                                placeholder="Enter your username"
                                required
                                error={errorFor("grid_username")}
                                {...text("grid_username")}
                            />

                            <BrandField
                                id="grid-contact"
                                label="Contact Number"
                                type="tel"
                                placeholder="e.g. +1234567890"
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
                                label="Registration Time"
                                type="time"
                                {...text("registration_time")}
                            />

                            <BrandField
                                id="grid-registration-datetime"
                                label="Registration"
                                type="datetime-local"
                                {...text("registration_datetime")}
                            />

                            {/* SELECT */}
                            <div>
                                <FormSelect
                                    name="gender"
                                    value={values.gender}
                                    onValueChange={(value) =>
                                        setField("gender", value)
                                    }
                                    options={genderOptions}
                                    placeholder="Select Gender"
                                    groupLabel="Gender"
                                    className="w-full"
                                    label="Gender"
                                    required
                                />

                                <FieldError message={errorFor("gender")} />
                            </div>

                            {/* SEARCH SELECT (single) */}
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
                                placeholder="Select a marital status"
                                searchPlaceholder="Search marital statuses..."
                                emptyMessage="No marital status found."
                                options={maritalStatusOptions}
                                {...single("marital_status")}
                            />

                            <BrandFieldSearchSelect
                                label="Nationality"
                                required
                                placeholder="Select a nationality"
                                searchPlaceholder="Search nationalities..."
                                emptyMessage="No nationality found."
                                options={nationalityOptions}
                                {...single("nationality")}
                            />

                            {/* MULTI SELECT: one chip per value, each with a close button */}
                            <BrandFieldSearchSelect
                                multiple
                                name="skills[]"
                                label="Skills"
                                placeholder="Select skills"
                                searchPlaceholder="Search skills..."
                                emptyMessage="No skill found."
                                options={skillOptions}
                                value={values.skills}
                                onValueChange={(value) =>
                                    setField("skills", value)
                                }
                                helperText="You can pick more than one."
                            />
                        </div>
                    </section>

                    {/* ============================================================
                        TEXTAREA COMPONENTS
                    ============================================================= */}

                    <section className={sectionClass}>
                        <h2 className={sectionTitleClass}>
                            Textarea Components
                        </h2>

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <div>
                                <CaptureChange
                                    onCapture={(element) =>
                                        setField("address", element.value)
                                    }
                                >
                                    <FormTextarea
                                        key={`address-${resetCount}`}
                                        id="address"
                                        name="address"
                                        label="Address"
                                        placeholder="Enter your address"
                                        rows={4}
                                        required
                                    />
                                </CaptureChange>

                                <FieldError message={errorFor("address")} />
                            </div>

                            <CaptureChange
                                onCapture={(element) =>
                                    setField("additional_notes", element.value)
                                }
                            >
                                <FormTextarea
                                    key={`notes-${resetCount}`}
                                    id="additional-notes"
                                    name="additional_notes"
                                    label="Additional Notes"
                                    placeholder="Enter any additional notes here..."
                                    rows={4}
                                />
                            </CaptureChange>
                        </div>
                    </section>

                    {/* ============================================================
                        FILE UPLOAD
                    ============================================================= */}

                    <section className={sectionClass}>
                        <h2 className={sectionTitleClass}>File Upload</h2>

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <div>
                                <CaptureChange
                                    onCapture={(element) => {
                                        if (
                                            element instanceof
                                                HTMLInputElement &&
                                            element.type === "file"
                                        ) {
                                            setField(
                                                "profile_picture",
                                                element.files?.[0] ?? null,
                                            );
                                        }
                                    }}
                                >
                                    <FormSingleFileUpload
                                        key={`profile-${resetCount}`}
                                        id="profile-picture"
                                        name="profile_picture"
                                        label="Profile Picture"
                                        required
                                    />
                                </CaptureChange>

                                <FieldError
                                    message={errorFor("profile_picture")}
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
                                            setField(
                                                "medical_documents",
                                                Array.from(element.files ?? []),
                                            );
                                        }
                                    }}
                                >
                                    <FormMultipleFileUpload
                                        key={`documents-${resetCount}`}
                                        label="Medical Documents"
                                        required
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        description="Upload one or more PDF, JPG or PNG files (Max 5 MB each)"
                                    />
                                </CaptureChange>

                                <FieldError
                                    message={errorFor("medical_documents")}
                                />
                            </div>
                        </div>
                    </section>

                    {/* ============================================================
                        CHECKBOX
                    ============================================================= */}

                    <section className={sectionClass}>
                        <h2 className={sectionTitleClass}>Checkbox</h2>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="space-y-4">
                                <h3 className="text-muted-foreground text-sm font-medium">
                                    Default
                                </h3>

                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        id="check-1"
                                        name="accept_terms"
                                        checked={values.accept_terms}
                                        onCheckedChange={(checked) =>
                                            setField(
                                                "accept_terms",
                                                checked === true,
                                            )
                                        }
                                    />

                                    <Label htmlFor="check-1">
                                        Accept terms & conditions
                                    </Label>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        id="check-2"
                                        name="receive_updates"
                                        checked={values.receive_updates}
                                        onCheckedChange={(checked) =>
                                            setField(
                                                "receive_updates",
                                                checked === true,
                                            )
                                        }
                                    />

                                    <Label htmlFor="check-2">
                                        Receive email updates
                                    </Label>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Checkbox id="check-3" disabled />

                                    <Label htmlFor="check-3">Disabled</Label>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        id="check-4"
                                        defaultChecked
                                        disabled
                                    />

                                    <Label htmlFor="check-4">
                                        Checked & Disabled
                                    </Label>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-muted-foreground text-sm font-medium">
                                    Card Style
                                </h3>

                                <label className="hover:border-primary/40 flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition">
                                    <Checkbox
                                        name="newsletter"
                                        checked={values.newsletter}
                                        onCheckedChange={(checked) =>
                                            setField(
                                                "newsletter",
                                                checked === true,
                                            )
                                        }
                                    />

                                    <div>
                                        <p className="font-medium">
                                            Newsletter
                                        </p>

                                        <p className="text-muted-foreground text-sm">
                                            Receive product news and updates.
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* ============================================================
                        FORM ACTIONS + LIVE STATE
                    ============================================================= */}

                    <section className={sectionClass}>
                        <h2 className={sectionTitleClass}>Form State</h2>

                        <div className="flex flex-wrap gap-3">
                            <Button type="submit">
                                <Save />
                                Save
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div className="border-border rounded-xl border p-4">
                                <h3 className="mb-2 text-sm font-semibold">
                                    Live state
                                </h3>

                                <pre className="text-muted-foreground max-h-96 overflow-auto text-xs">
                                    {JSON.stringify(serialize(values), null, 2)}
                                </pre>
                            </div>

                            <div className="border-border rounded-xl border p-4">
                                <h3 className="mb-2 text-sm font-semibold">
                                    Saved snapshot
                                </h3>

                                {savedValues ? (
                                    <pre className="text-muted-foreground max-h-96 overflow-auto text-xs">
                                        {JSON.stringify(
                                            serialize(savedValues),
                                            null,
                                            2,
                                        )}
                                    </pre>
                                ) : (
                                    <p className="text-muted-foreground text-sm">
                                        Press Save to capture the current
                                        values.
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>
                </form>

                {/* ============================================================
                    BUTTONS (outside the form: these buttons must not submit it)
                ============================================================= */}

                <section className={sectionClass}>
                    <h2 className="mb-8 text-2xl font-bold">
                        UI Components Showcase
                    </h2>

                    {/* BUTTON VARIANTS */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="mb-4 text-lg font-semibold">
                                Button Variants
                            </h3>

                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                {/* Icon Buttons */}
                                <div>
                                    <h4 className="text-muted-foreground mb-3 text-sm font-medium">
                                        Icon Only Buttons
                                    </h4>

                                    <div className="flex flex-wrap gap-3">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            aria-label="Save"
                                        >
                                            <Save />
                                        </Button>

                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            aria-label="Download"
                                        >
                                            <Download />
                                        </Button>

                                        <Button size="icon" aria-label="Upload">
                                            <Upload />
                                        </Button>

                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            aria-label="Delete"
                                        >
                                            <Trash2 />
                                        </Button>

                                        <Button size="icon" aria-label="Edit">
                                            <Edit />
                                        </Button>
                                    </div>
                                </div>

                                {/* Small Buttons */}
                                <div>
                                    <h4 className="text-muted-foreground mb-3 text-sm font-medium">
                                        Small Buttons
                                    </h4>

                                    <div className="flex flex-wrap gap-3">
                                        <Button size="sm">
                                            <Save />
                                            Save
                                        </Button>

                                        <Button size="sm" variant="secondary">
                                            <Plus />
                                            Add New
                                        </Button>

                                        <Button size="sm" variant="outline">
                                            <Download />
                                            Download
                                        </Button>
                                    </div>
                                </div>

                                {/* Medium Buttons */}
                                <div>
                                    <h4 className="text-muted-foreground mb-3 text-sm font-medium">
                                        Medium Buttons
                                    </h4>

                                    <div className="flex flex-wrap gap-3">
                                        <Button>
                                            <Save />
                                            Save Changes
                                        </Button>

                                        <Button variant="secondary">
                                            <Plus />
                                            Create New
                                        </Button>

                                        <Button variant="destructive">
                                            <Trash2 />
                                            Delete Item
                                        </Button>
                                    </div>
                                </div>

                                {/* Large Buttons */}
                                <div>
                                    <h4 className="text-muted-foreground mb-3 text-sm font-medium">
                                        Large Buttons
                                    </h4>

                                    <div className="flex flex-wrap gap-3">
                                        <Button size="lg">
                                            <Save />
                                            Save Document
                                        </Button>

                                        <Button size="lg" variant="secondary">
                                            <Upload />
                                            Upload Files
                                        </Button>

                                        <Button size="lg" variant="outline">
                                            <Download />
                                            Download Report
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MODAL */}
                        <div>
                            <h3 className="mb-4 text-lg font-semibold">
                                Modal Variants
                            </h3>

                            <div className="flex flex-wrap gap-4">
                                <UserModalDemo />

                                <DeleteAlert />
                            </div>
                        </div>

                        {/* TOAST */}
                        <div>
                            <h3 className="mb-4 text-lg font-semibold">
                                Toast Variations
                            </h3>

                            <div className="flex flex-wrap gap-3">
                                <Button
                                    onClick={() =>
                                        appToast.success(
                                            "Success",
                                            "Operation completed successfully.",
                                        )
                                    }
                                >
                                    Success
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        appToast.warning(
                                            "Warning",
                                            "Please review your input.",
                                        )
                                    }
                                >
                                    Warning
                                </Button>

                                <Button
                                    variant="destructive"
                                    onClick={() =>
                                        appToast.error(
                                            "Error",
                                            "Something went wrong.",
                                        )
                                    }
                                >
                                    Error
                                </Button>

                                <Button
                                    onClick={() =>
                                        appToast.info(
                                            "Information",
                                            "New update available.",
                                        )
                                    }
                                >
                                    Info
                                </Button>

                                <Button
                                    onClick={() => {
                                        const id = appToast.loading(
                                            "Uploading...",
                                            "Please wait.",
                                        );

                                        setTimeout(() => {
                                            appToast.dismiss(id);

                                            appToast.success(
                                                "Upload Complete",
                                                "Files uploaded successfully.",
                                            );
                                        }, 3000);
                                    }}
                                >
                                    Loading
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ============================================================
                    RADIO
                ============================================================= */}

                <section className={sectionClass}>
                    <h2 className={sectionTitleClass}>Radio Group</h2>

                    <p className="text-muted-foreground text-sm">
                        Radio group examples can be added here.
                    </p>
                </section>

                {/* ============================================================
                    TABLE
                ============================================================= */}

                <section className={sectionClass}>
                    <h2 className={sectionTitleClass}>Table</h2>

                    <p className="text-muted-foreground text-sm">
                        Basic table example can be added here.
                    </p>
                </section>
            </div>
        </div>
    );
}

ComponentsExample.layout = {
    title: "Components Example",
    description:
        "This page is used to showcase the components in the application.",
};
