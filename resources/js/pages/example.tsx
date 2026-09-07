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

import { useState } from "react";

import { FormInput } from "@/components/form/form-input";
import { FormMultipleFileUpload } from "@/components/form/form-multipe-file";
import { FormSelect } from "@/components/form/form-select";
import { FormSelectSearch } from "@/components/form/form-select-search";
import { FormSingleFileUpload } from "@/components/form/form-single-file";
import MultiSelectDropdown from "@/components/form/form-multiple-select";
import { FormTextarea } from "@/components/form/form-textarea";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { appToast } from "@/components/shared/toast";
import DeleteAlert from "@/components/shared/delete-alert";
import { Modal } from "@/components/shared/modal";

const gridClass =
    "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

const sectionClass =
    "mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm";

const sectionTitleClass = "mb-6 text-xl font-bold tracking-tight";

/**
 * Modal Example
 */
export function UserModalDemo() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

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

                        <Button onClick={() => setIsOpen(false)}>
                            Save changes
                        </Button>
                    </div>
                }
            >
                <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2">
                    <FormInput
                        id="modal-name"
                        name="modal-name"
                        type="text"
                        label="Name"
                        defaultValue="John Doe"
                    />

                    <FormInput
                        id="modal-email"
                        name="modal-email"
                        type="email"
                        label="Email"
                        defaultValue="john@example.com"
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
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

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

            {/* ================================================================
                BASIC INFORMATION
            ================================================================= */}

            <div className="border-border bg-card rounded-2xl border p-4 shadow-sm sm:p-6 lg:p-8">
                {/* ============================================================
                    ALL INPUT TYPES
                ============================================================= */}

                <section className="space-y-6">
                    <div>
                        <h2 className="text-xl font-bold sm:text-2xl">
                            All Input Types
                        </h2>

                        <p className="text-muted-foreground mt-1 text-sm">
                            Complete FormInput component examples.
                        </p>
                    </div>

                    <div className={gridClass}>
                        <FormInput
                            id="input-name"
                            name="name"
                            type="text"
                            label="Name"
                            placeholder="Enter your name"
                        />

                        <FormInput
                            id="input-email"
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="example@email.com"
                            leftIcon={<Mail className="size-4" />}
                        />

                        <FormInput
                            id="input-password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => setPassword(e.target.value)}
                            leftIcon={<Lock className="size-4" />}
                            rightAction={
                                <button
                                    type="button"
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
                        />

                        <FormInput
                            id="input-search"
                            name="search"
                            type="search"
                            label="Search"
                            placeholder="Search products..."
                            leftIcon={<Search className="size-4" />}
                        />

                        <FormInput
                            id="input-website"
                            name="website"
                            type="url"
                            label="Website"
                            placeholder="https://example.com"
                            leftIcon={<Globe className="size-4" />}
                        />

                        <FormInput
                            id="input-phone"
                            name="phone"
                            type="tel"
                            label="Phone"
                            placeholder="+880 1XXXXXXXXX"
                            leftIcon={<Phone className="size-4" />}
                        />

                        <FormInput
                            id="input-quantity"
                            name="quantity"
                            type="number"
                            label="Quantity"
                            placeholder="Enter quantity"
                            min={1}
                            max={100}
                        />

                        <FormInput
                            id="input-year"
                            name="year"
                            type="year"
                            label="Year"
                            placeholder="2026"
                            min={1900}
                            max={2035}
                        />

                        <FormInput
                            id="input-date"
                            name="birth_date"
                            type="date"
                            label="Date"
                        />

                        <FormInput
                            id="input-time"
                            name="appointment_time"
                            type="time"
                            label="Time"
                        />

                        <FormInput
                            id="input-datetime"
                            name="event_date"
                            type="datetime-local"
                            label="Date & Time"
                        />

                        <FormInput
                            id="input-month"
                            name="billing_month"
                            type="month"
                            label="Month"
                        />

                        <FormInput
                            id="input-week"
                            name="week"
                            type="week"
                            label="Week"
                        />

                        {/* Two-column textarea */}
                        <div className="sm:col-span-2">
                            <FormInput
                                id="input-description"
                                name="description"
                                type="textarea"
                                label="Description"
                                placeholder="Write description..."
                                rows={5}
                                maxLength={1000}
                                showCount
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <FormInput
                                id="input-short-description"
                                name="short_description"
                                type="textarea"
                                label="Short Description"
                                placeholder="Write short description..."
                                rows={5}
                                maxLength={300}
                                showCount
                                resizable={false}
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
                        <FormInput
                            id="icon-username"
                            name="username"
                            type="text"
                            label="Username"
                            placeholder="Enter username"
                            leftIcon={<User className="size-4" />}
                        />

                        <FormInput
                            id="icon-email"
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="Enter email"
                            leftIcon={<Mail className="size-4" />}
                        />

                        <FormInput
                            id="icon-website"
                            name="website"
                            type="url"
                            label="Website"
                            placeholder="https://example.com"
                            leftIcon={<Link className="size-4" />}
                        />

                        <FormInput
                            id="icon-phone"
                            name="phone"
                            type="tel"
                            label="Phone"
                            placeholder="Phone number"
                            leftIcon={<Phone className="size-4" />}
                        />

                        <FormInput
                            id="icon-search"
                            name="search"
                            type="search"
                            label="Search"
                            placeholder="Search..."
                            leftIcon={<Search className="size-4" />}
                        />

                        <FormInput
                            id="icon-number"
                            name="number"
                            type="number"
                            label="Number"
                            placeholder="Enter number"
                            leftIcon={<Hash className="size-4" />}
                        />
                    </div>
                </section>

                {/* ============================================================
                    SIZES
                ============================================================= */}

                <section className={sectionClass}>
                    <h2 className={sectionTitleClass}>Sizes</h2>

                    <div className={gridClass}>
                        <FormInput
                            id="size-small"
                            type="text"
                            label="Small"
                            placeholder="Small input"
                            size="sm"
                        />

                        <FormInput
                            id="size-medium"
                            type="text"
                            label="Medium"
                            placeholder="Medium input"
                            size="md"
                        />

                        <FormInput
                            id="size-large"
                            type="text"
                            label="Large"
                            placeholder="Large input"
                            size="lg"
                        />
                    </div>
                </section>

                {/* ============================================================
                    VARIANTS
                ============================================================= */}

                <section className={sectionClass}>
                    <h2 className={sectionTitleClass}>Variants</h2>

                    <div className={gridClass}>
                        <FormInput
                            id="variant-default"
                            type="text"
                            label="Default"
                            placeholder="Default variant"
                            variant="default"
                        />

                        <FormInput
                            id="variant-filled"
                            type="text"
                            label="Filled"
                            placeholder="Filled variant"
                            variant="filled"
                        />

                        <FormInput
                            id="variant-ghost"
                            type="text"
                            label="Ghost"
                            placeholder="Ghost variant"
                            variant="ghost"
                        />
                    </div>
                </section>

                {/* ============================================================
                    CHARACTER COUNT
                ============================================================= */}

                <section className={sectionClass}>
                    <h2 className={sectionTitleClass}>Character Count</h2>

                    <div className={gridClass}>
                        <FormInput
                            id="count-title"
                            name="title"
                            type="text"
                            label="Product Title"
                            placeholder="Enter product title"
                            maxLength={100}
                            showCount
                        />

                        <div className="sm:col-span-2">
                            <FormInput
                                id="count-bio"
                                name="bio"
                                type="textarea"
                                label="Bio"
                                placeholder="Write your bio..."
                                rows={5}
                                maxLength={500}
                                showCount
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
                        <FormInput
                            id="validation-required"
                            name="required"
                            type="text"
                            label="Required Field"
                            placeholder="This field is required"
                            required
                        />

                        <FormInput
                            id="validation-error"
                            name="error"
                            type="email"
                            label="Email"
                            placeholder="Enter email"
                            error="Please enter a valid email address."
                        />

                        <FormInput
                            id="validation-helper"
                            name="helper"
                            type="text"
                            label="Username"
                            placeholder="Enter username"
                            helperText="Username must be at least 5 characters."
                        />

                        <FormInput
                            id="validation-error-helper"
                            name="error_helper"
                            type="text"
                            label="Username"
                            placeholder="Enter username"
                            error="Username is already taken."
                            helperText="Try another username."
                        />
                    </div>
                </section>

                {/* ============================================================
                    STATES
                ============================================================= */}

                <section className={sectionClass}>
                    <h2 className={sectionTitleClass}>States</h2>

                    <div className={gridClass}>
                        <FormInput
                            id="state-disabled"
                            name="disabled"
                            type="text"
                            label="Disabled"
                            placeholder="Disabled input"
                            disabled
                        />

                        <FormInput
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
                    <h2 className={sectionTitleClass}>Textarea Variations</h2>

                    <div className={gridClass}>
                        <FormInput
                            id="textarea-default"
                            name="textarea_default"
                            type="textarea"
                            label="Default Textarea"
                            placeholder="Write something..."
                        />

                        <FormInput
                            id="textarea-rows"
                            name="textarea_rows"
                            type="textarea"
                            label="Textarea with Rows"
                            placeholder="Write something..."
                            rows={8}
                        />

                        <FormInput
                            id="textarea-limit"
                            name="textarea_limit"
                            type="textarea"
                            label="Textarea with Character Limit"
                            placeholder="Maximum 200 characters..."
                            rows={5}
                            maxLength={200}
                            showCount
                        />

                        <FormInput
                            id="textarea-no-resize"
                            name="textarea_no_resize"
                            type="textarea"
                            label="Non-resizable Textarea"
                            placeholder="This textarea cannot be resized."
                            rows={5}
                            resizable={false}
                        />

                        <FormInput
                            id="textarea-error"
                            name="textarea_error"
                            type="textarea"
                            label="Description"
                            placeholder="Enter description..."
                            rows={5}
                            error="Description is required."
                        />

                        <FormInput
                            id="textarea-helper"
                            name="textarea_helper"
                            type="textarea"
                            label="Description"
                            placeholder="Enter description..."
                            rows={5}
                            helperText="Describe your product in detail."
                        />
                    </div>
                </section>

                {/* ============================================================
                    DATE / TIME
                ============================================================= */}

                <section className={sectionClass}>
                    <h2 className={sectionTitleClass}>Date / Time Inputs</h2>

                    <div className={gridClass}>
                        <FormInput
                            id="temporal-date"
                            name="date"
                            type="date"
                            label="Date"
                            leftIcon={<Calendar className="size-4" />}
                        />

                        <FormInput
                            id="temporal-time"
                            name="time"
                            type="time"
                            label="Time"
                            leftIcon={<Clock className="size-4" />}
                        />

                        <FormInput
                            id="temporal-datetime"
                            name="datetime"
                            type="datetime-local"
                            label="Date & Time"
                        />

                        <FormInput
                            id="temporal-month"
                            name="month"
                            type="month"
                            label="Month"
                        />

                        <FormInput
                            id="temporal-week"
                            name="week"
                            type="week"
                            label="Week"
                        />

                        <FormInput
                            id="temporal-year"
                            name="year"
                            type="year"
                            label="Year"
                            min={2000}
                            max={2035}
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
                            <FormInput
                                id="grid-description"
                                name="grid_description"
                                type="textarea"
                                label="Description"
                                placeholder="Write description..."
                                rows={5}
                                maxLength={1000}
                                showCount
                            />
                        </div>

                        <FormInput
                            id="grid-email"
                            name="grid_email"
                            label="Email"
                            type="email"
                            required
                            placeholder="example@email.com"
                        />

                        <FormInput
                            id="grid-search"
                            name="grid_search"
                            type="search"
                            leftIcon={<SearchIcon className="size-4" />}
                            placeholder="Search..."
                            size="lg"
                            variant="filled"
                        />

                        <FormInput
                            id="grid-bio"
                            name="grid_bio"
                            label="Bio"
                            maxLength={160}
                            showCount
                            helperText="Tell us about yourself"
                        />

                        <FormInput
                            id="grid-username-error"
                            name="grid_username"
                            label="Username"
                            error="Username already taken"
                        />

                        <FormInput
                            id="grid-full-name"
                            name="grid_full_name"
                            label="Full Name"
                            placeholder="Enter your name"
                            required
                            leftIcon={<User className="size-4" />}
                        />

                        <FormInput
                            id="grid-email-address"
                            name="grid_email_address"
                            label="Email Address"
                            type="email"
                            placeholder="name@example.com"
                            required
                            leftIcon={<Mail className="size-4" />}
                        />

                        <FormInput
                            id="grid-username"
                            name="grid_username_2"
                            label="Username"
                            type="text"
                            placeholder="Enter your username"
                            required
                        />

                        <FormInput
                            id="grid-contact"
                            name="contact"
                            label="Contact Number"
                            type="tel"
                            placeholder="e.g. +1234567890"
                        />

                        <FormInput
                            id="grid-date-of-birth"
                            name="date_of_birth"
                            label="Date of Birth"
                            type="date"
                        />

                        <FormInput
                            id="grid-registration-time"
                            name="registration_time"
                            label="Registration Time"
                            type="time"
                        />

                        <FormInput
                            id="grid-registration-datetime"
                            name="registration_datetime"
                            label="Registration"
                            type="datetime-local"
                        />

                        {/* SELECT */}
                        <FormSelect
                            name="gender"
                            value=""
                            onValueChange={(value) =>
                                console.log("Selected Gender:", value)
                            }
                            options={[
                                {
                                    label: "Male",
                                    value: "male",
                                },
                                {
                                    label: "Female",
                                    value: "female",
                                },
                                {
                                    label: "Other",
                                    value: "other",
                                },
                            ]}
                            placeholder="Select Gender"
                            groupLabel="Gender"
                            className="w-full"
                            label="Gender"
                            required
                        />

                        {/* SEARCH SELECT */}
                        <FormSelectSearch
                            label="Department"
                            required
                            placeholder="Select a department"
                            searchPlaceholder="Search departments..."
                            emptyMessage="No department found."
                            options={[
                                {
                                    label: "Cardiology",
                                    value: "cardiology",
                                },
                                {
                                    label: "Neurology",
                                    value: "neurology",
                                },
                                {
                                    label: "Orthopedics",
                                    value: "orthopedics",
                                },
                                {
                                    label: "Pediatrics",
                                    value: "pediatrics",
                                },
                                {
                                    label: "Gynecology & Obstetrics",
                                    value: "gynecology_obstetrics",
                                },
                                {
                                    label: "General Medicine",
                                    value: "general_medicine",
                                },
                                {
                                    label: "General Surgery",
                                    value: "general_surgery",
                                },
                                {
                                    label: "Dermatology",
                                    value: "dermatology",
                                },
                                {
                                    label: "ENT",
                                    value: "ent",
                                },
                                {
                                    label: "Ophthalmology",
                                    value: "ophthalmology",
                                },
                            ]}
                            value=""
                            onValueChange={(value) =>
                                console.log("Selected Department:", value)
                            }
                        />

                        <FormSelectSearch
                            label="Gender"
                            required
                            placeholder="Select a gender"
                            searchPlaceholder="Search genders..."
                            emptyMessage="No gender found."
                            options={[
                                {
                                    label: "Male",
                                    value: "male",
                                },
                                {
                                    label: "Female",
                                    value: "female",
                                },
                                {
                                    label: "Other",
                                    value: "other",
                                },
                            ]}
                            value=""
                            onValueChange={(value) =>
                                console.log("Selected Gender:", value)
                            }
                        />

                        <FormSelectSearch
                            label="Marital Status"
                            required
                            placeholder="Select a marital status"
                            searchPlaceholder="Search marital statuses..."
                            emptyMessage="No marital status found."
                            options={[
                                {
                                    label: "Single",
                                    value: "single",
                                },
                                {
                                    label: "Married",
                                    value: "married",
                                },
                                {
                                    label: "Divorced",
                                    value: "divorced",
                                },
                                {
                                    label: "Widowed",
                                    value: "widowed",
                                },
                            ]}
                            value=""
                            onValueChange={(value) =>
                                console.log("Selected Marital Status:", value)
                            }
                        />

                        <FormSelectSearch
                            label="Nationality"
                            required
                            placeholder="Select a nationality"
                            searchPlaceholder="Search nationalities..."
                            emptyMessage="No nationality found."
                            options={[
                                {
                                    label: "Bangladeshi",
                                    value: "bangladeshi",
                                },
                                {
                                    label: "Indian",
                                    value: "indian",
                                },
                                {
                                    label: "Pakistani",
                                    value: "pakistani",
                                },
                                {
                                    label: "Sri Lankan",
                                    value: "sri-lankan",
                                },
                            ]}
                            value=""
                            onValueChange={(value) =>
                                console.log("Selected Nationality:", value)
                            }
                        />

                        {/* MULTI SELECT */}
                        <MultiSelectDropdown
                            options={[
                                {
                                    value: "js",
                                    label: "JavaScript",
                                },
                                {
                                    value: "ts",
                                    label: "TypeScript",
                                },
                            ]}
                            value={[]}
                        />
                    </div>
                </section>

                {/* ============================================================
                    TEXTAREA COMPONENTS
                ============================================================= */}

                <section className={sectionClass}>
                    <h2 className={sectionTitleClass}>Textarea Components</h2>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <FormTextarea
                            id="address"
                            name="address"
                            label="Address"
                            placeholder="Enter your address"
                            rows={4}
                            required
                        />

                        <FormTextarea
                            id="additional-notes"
                            name="additional_notes"
                            label="Additional Notes"
                            placeholder="Enter any additional notes here..."
                            rows={4}
                        />
                    </div>
                </section>

                {/* ============================================================
                    FILE UPLOAD
                ============================================================= */}

                <section className={sectionClass}>
                    <h2 className={sectionTitleClass}>File Upload</h2>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <FormSingleFileUpload
                            id="profile-picture"
                            name="profile_picture"
                            label="Profile Picture"
                            required
                        />

                        <FormMultipleFileUpload
                            label="Medical Documents"
                            required
                            accept=".pdf,.jpg,.jpeg,.png"
                            description="Upload one or more PDF, JPG or PNG files (Max 5 MB each)"
                        />
                    </div>
                </section>

                {/* ============================================================
                    BUTTONS
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
                                        <Button size="icon" variant="outline">
                                            <Save />
                                        </Button>

                                        <Button size="icon" variant="secondary">
                                            <Download />
                                        </Button>

                                        <Button size="icon">
                                            <Upload />
                                        </Button>

                                        <Button
                                            size="icon"
                                            variant="destructive"
                                        >
                                            <Trash2 />
                                        </Button>

                                        <Button size="icon">
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
                                <Checkbox id="check-1" />

                                <Label htmlFor="check-1">
                                    Accept terms & conditions
                                </Label>
                            </div>

                            <div className="flex items-center gap-3">
                                <Checkbox id="check-2" defaultChecked />

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
                                <Checkbox />

                                <div>
                                    <p className="font-medium">Newsletter</p>

                                    <p className="text-muted-foreground text-sm">
                                        Receive product news and updates.
                                    </p>
                                </div>
                            </label>
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
