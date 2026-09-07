import { FormInput } from "@/components/form/form-input";
import { FormMultipleFileUpload } from "@/components/form/form-multipe-file";
import { FormSelect } from "@/components/form/form-select";
import { FormSelectSearch } from "@/components/form/form-select-search";
import { FormSingleFileUpload } from "@/components/form/form-single-file";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Plus, Download, ArrowRight, Trash2, Upload, Save, Pencil, Edit } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { appToast } from "@/components/shared/toast";
import DeleteAlert from "@/components/shared/delete-alet";
import MultiSelectDropdown from "@/components/form/form-multiple-select";
import { useState } from "react";
import { Modal } from "@/components/shared/modal";

export function UserModalDemo() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="p-6">
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Edit Profile"
                description="Make changes to your profile here. Click save when you're done."
                maxWidth="md"
                footer={
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setIsOpen(false)}>Save changes</Button>
                    </div>
                }
            >
                <div className="space-y-4 py-2">
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            type="text"
                            defaultValue="John Doe"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            defaultValue="john@example.com"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default function ComponentsExample() {
    return (
        <div className="space-y-2 mx-auto px-5">
            <h1 className="text-2xl font-bold">Components Example</h1>
            <p className="mt-2 text-muted-foreground">
                This page is used to showcase the components in the application.
            </p>

            {/* Basic Information Input Section with Rounded Dotted Border */}
            <div className="mt-6 rounded-2xl border-2 border-dashed border-muted-foreground/40 p-6">
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
                        <FormInput
                            id="name"
                            name="name"
                            label="Full Name"
                            placeholder="Enter your full name"
                            required
                        />

                        <FormInput
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            required
                        />
                        <FormInput
                            id="username"
                            name="username"
                            label="Username"
                            type="text"
                            placeholder="Enter your username"
                            required
                        />

                        <FormInput
                            id="contact"
                            name="contact"
                            label="Contact Number"
                            type="tel"
                            placeholder="e.g. +1234567890"
                        />

                        <FormInput
                            id="date-of-birth"
                            name="date-of-birth"
                            label="Date of Birth"
                            type="date"
                        />


                        <FormInput
                            id="time"
                            name="Registration Time"
                            label="Registration Time"
                            type="time"
                        />

                        <FormInput
                            id="datetime"
                            name="Registration "
                            label="Registration "
                            type="datetime-local"
                        />


                        <FormSelect
                            name="gender"
                            value=""
                            onValueChange={(value) => console.log("Selected Gender:", value)}
                            options={[
                                { label: "Male", value: "male" },
                                { label: "Female", value: "female" },
                                { label: "Other", value: "other" },
                            ]}
                            placeholder="Select Gender"
                            groupLabel="Gender"
                            className="w-full"
                            label="Gender"
                            required
                        />

                        <FormSelectSearch
                            label="Department"
                            required={true}
                            placeholder="Select a department"
                            searchPlaceholder="Search departments..."
                            emptyMessage="No department found."
                            options={[
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
                                { label: "Psychiatry", value: "psychiatry" },
                                { label: "Urology", value: "urology" },
                                { label: "Nephrology", value: "nephrology" },
                                { label: "Oncology", value: "oncology" },
                                { label: "Endocrinology", value: "endocrinology" },
                                { label: "Pulmonology", value: "pulmonology" },
                                { label: "Gastroenterology", value: "gastroenterology" },
                                { label: "Anesthesiology", value: "anesthesiology" },
                                { label: "Radiology", value: "radiology" },
                                { label: "Emergency Medicine", value: "emergency_medicine" },
                            ]}
                            value={''}
                            onValueChange={(value: any) => console.log("Selected Department:", value)}
                        />


                        <FormSelectSearch
                            label="Gender"
                            required={true}
                            placeholder="Select a gender"
                            searchPlaceholder="Search genders..."
                            emptyMessage="No gender found."
                            options={[
                                { label: "Male", value: "male" },
                                { label: "Female", value: "female" },
                                { label: "Other", value: "other" },
                            ]}
                            value={''}
                            onValueChange={(value: any) => console.log("Selected Gender:", value)}
                        />

                        <FormSelectSearch
                            label="Marital Status"
                            required={true}
                            placeholder="Select a marital status"
                            searchPlaceholder="Search marital statuses..."
                            emptyMessage="No marital status found."
                            options={[
                                { label: "Single", value: "single" },
                                { label: "Married", value: "married" },
                                { label: "Divorced", value: "divorced" },
                                { label: "Widowed", value: "widowed" },
                            ]}
                            value={''}
                            onValueChange={(value: any) => console.log("Selected Marital Status:", value)}
                        />

                        <FormSelectSearch
                            label="Nationality"
                            required={true}
                            placeholder="Select a nationality"
                            searchPlaceholder="Search nationalities..."
                            emptyMessage="No nationality found."
                            options={[
                                { label: "Bangladeshi", value: "bangladeshi" },
                                { label: "Indian", value: "indian" },
                                { label: "Pakistani", value: "pakistani" },
                                { label: "Sri Lankan", value: "sri-lankan" },
                            ]}
                            value={''}
                            onValueChange={(value: any) => console.log("Selected Nationality:", value)}
                        />


                        <MultiSelectDropdown
                            options={[{ value: "js", label: "JavaScript" }, { value: "ts", label: "TypeScript" }]}
                            value={[]}

                        />
                    </div>
                    <FormTextarea
                        id="address"
                        name="address"
                        label="Address"
                        placeholder="Enter your address"
                        rows={4}
                        required
                    />
                </div>
            </div>

            {/* Aditional Notes */}
            <div className="mt-6">
                <FormTextarea
                    id="additional-notes"
                    name="additional-notes"
                    label="Additional Notes"
                    placeholder="Enter any additional notes here..."
                    rows={4}
                />
            </div>

            {/* Single file upload */}
            <div className="mt-6">
                <FormSingleFileUpload
                    id="profile-picture"
                    name="profile-picture"
                    label="Profile Picture"
                    required
                />
            </div>

            {/*Multiple file upload  */}
            <div className="mt-6">
                <FormMultipleFileUpload
                    label="Medical Documents"
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    description="Upload one or more PDF, JPG or PNG files (Max 5 MB each)"
                />
            </div>

            {/* Button variant  */}
            <div className="mt-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
                <h2 className="mb-8 text-3xl font-bold">
                    🎨 UI Components Showcase
                </h2>

                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4 ">Button Variants</h3>
                    <div className="space-y-10">
                        {/* Icon Buttons */}
                        <section>
                            <h3 className="mb-4 text-lg font-semibold ">
                                Icon Only Buttons (Small, Medium, Large)
                            </h3>

                            <div className="flex flex-wrap items-center gap-3">
                                <Button size="icon" variant="outline">
                                    <Save />
                                </Button>

                                <Button size="icon" variant="secondary">
                                    <Download />
                                </Button>

                                <Button size="icon">
                                    <Upload />
                                </Button>

                                <Button size="icon" variant="destructive">
                                    <Trash2 />
                                </Button>

                                <Button size="icon">
                                    <Edit />
                                </Button>
                            </div>
                        </section>

                        {/* Small Buttons */}
                        <section>
                            <h3 className="mb-4 text-lg font-semibold">
                                Small Buttons
                            </h3>

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
                        </section>

                        {/* Medium Buttons */}
                        <section>
                            <h3 className="mb-4 text-lg font-semibold">
                                Medium Buttons (Default)
                            </h3>

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
                        </section>

                        {/* Large Buttons */}
                        <section>
                            <h3 className="mb-4 text-lg font-semibold">
                                Large Buttons
                            </h3>

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
                        </section>
                    </div>
                </div>

                <div className="mb-6 ">
                    <h3 className="text-xl font-bold mb-4 ">Modal Variants</h3>
                    <div className="flex gap-4">
                        <UserModalDemo />
                        <DeleteAlert />
                    </div>
                </div>
                <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4 ">Toast Variations</h3>
                    <div className="flex flex-wrap gap-3">
                        <Button
                            onClick={() =>
                                appToast.success(
                                    "Success",
                                    "Operation completed successfully."
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
                                    "Please review your input."
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
                                    "Something went wrong."
                                )
                            }
                        >
                            Error
                        </Button>

                        <Button
                            onClick={() =>
                                appToast.info(
                                    "Information",
                                    "New update available."
                                )
                            }
                        >
                            Info
                        </Button>

                        <Button
                            onClick={() => {
                                const id = appToast.loading(
                                    "Uploading...",
                                    "Please wait."
                                );

                                setTimeout(() => {
                                    appToast.dismiss(id);
                                    appToast.success(
                                        "Upload Complete",
                                        "Files uploaded successfully."
                                    );
                                }, 3000);
                            }}
                        >
                            Loading
                        </Button>
                    </div>
                </div>
            </div>

            {/* Checkbox */}
            <div className="mt-6 rounded-2xl border-2 border-dashed border-muted-foreground/40 p-6">
                <h2 className="mb-6 text-xl font-semibold">Checkbox</h2>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Default */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Default
                        </h3>

                        <div className="flex items-center space-x-3">
                            <Checkbox id="check-1" />
                            <Label htmlFor="check-1">Accept terms & conditions</Label>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox id="check-2" defaultChecked />
                            <Label htmlFor="check-2">Receive email updates</Label>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox id="check-3" disabled />
                            <Label htmlFor="check-3">Disabled</Label>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox id="check-4" defaultChecked disabled />
                            <Label htmlFor="check-4">Checked & Disabled</Label>
                        </div>
                    </div>

                    {/* Card Style */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Card Style
                        </h3>

                        <label className="flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition hover:border-primary/40">
                            <Checkbox />
                            <div>
                                <p className="font-medium">Newsletter</p>
                                <p className="text-sm text-muted-foreground">
                                    Receive product news and updates.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Radio button */}
            <div className="mt-6 rounded-2xl border-2 border-dashed border-muted-foreground/40 p-6">
                <h2 className="mb-6 text-xl font-semibold">Radio Group</h2>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Default */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Default
                        </h3>

                    </div>


                </div>
            </div>


            <div className="mt-6 rounded-2xl border-2 border-dashed border-muted-foreground/40 p-6">
                <h2 className="mb-6 text-xl font-semibold">Table</h2>

                <div className="">
                    {/* Default */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">
                            Basic table example
                        </h3>

                    </div>
                </div>
            </div>


        </div>

    );
}

ComponentsExample.layout = {
    title: 'Components Example',
    description: 'This page is used to showcase the components in the application.',
};