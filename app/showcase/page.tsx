"use client";

import { useState } from "react";
import {
  Accordion,
  Alert,
  AlertDialog,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumbs,
  Checkbox,
  RadioGroup,
  Separator,
  Switch,
  Button,
} from "../components/ui";
import { Glow } from "../components/global";

export default function ComponentsShowcase() {
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [switchChecked, setSwitchChecked] = useState(false);

  const accordionItems = [
    {
      id: "1",
      title: "What is Next.js?",
      content: "Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.",
    },
    {
      id: "2",
      title: "Why use TypeScript?",
      content: "TypeScript adds static typing to JavaScript, helping catch errors early and improving code quality and developer experience.",
    },
    {
      id: "3",
      title: "What is Tailwind CSS?",
      content: "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without writing CSS.",
    },
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Components", href: "/components" },
    { label: "Foundation", href: "/components/foundation" },
    { label: "Showcase" },
  ];

  const radioOptions = [
    { value: "option1", label: "Option 1", description: "This is the first option" },
    { value: "option2", label: "Option 2", description: "This is the second option" },
    { value: "option3", label: "Option 3", description: "This is the third option" },
  ];

  const avatars = [
    { alt: "John Doe", src: "" },
    { alt: "Jane Smith", src: "" },
    { alt: "Bob Johnson", src: "" },
    { alt: "Alice Williams", src: "" },
    { alt: "Charlie Brown", src: "" },
    { alt: "Diana Prince", src: "" },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">Foundation Components</h1>
          <p className="text-[#FFFFFF80] max-w-2xl mx-auto">
            All components built from scratch with TypeScript, Tailwind CSS, and Framer Motion
          </p>
          <Breadcrumbs items={breadcrumbItems} className="justify-center" />
        </div>

        <Separator />

        {/* Accordion */}
        <Glow className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-white">Accordion</h2>
          <p className="text-[#FFFFFF60] text-sm">
            Collapsible content sections with smooth animations
          </p>
          <Accordion items={accordionItems} type="single" collapsible />
        </Glow>

        {/* Alerts */}
        <Glow className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-white">Alerts</h2>
          <p className="text-[#FFFFFF60] text-sm">
            Display important messages with different variants
          </p>
          <div className="space-y-3">
            <Alert
              variant="info"
              title="Information"
              description="This is an informational alert message."
            />
            <Alert
              variant="success"
              title="Success"
              description="Your action was completed successfully!"
            />
            <Alert
              variant="warning"
              title="Warning"
              description="Please review this warning before proceeding."
            />
            <Alert
              variant="error"
              title="Error"
              description="An error occurred while processing your request."
              onClose={() => console.log("Alert closed")}
            />
          </div>
          <Button onClick={() => setAlertDialogOpen(true)}>
            Open Alert Dialog
          </Button>
        </Glow>

        {/* Avatars */}
        <Glow className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-white">Avatars</h2>
          <p className="text-[#FFFFFF60] text-sm">
            User profile images with fallback initials and status indicators
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <Avatar alt="John Doe" size="xs" />
              <Avatar alt="Jane Smith" size="sm" status="online" />
              <Avatar alt="Bob Johnson" size="md" status="away" />
              <Avatar alt="Alice Williams" size="lg" status="busy" />
              <Avatar alt="Charlie Brown" size="xl" status="offline" />
              <Avatar alt="Diana Prince" size="2xl" />
            </div>
            <div>
              <p className="text-sm text-[#FFFFFF80] mb-3">Avatar Group:</p>
              <AvatarGroup avatars={avatars} max={4} size="md" />
            </div>
          </div>
        </Glow>

        {/* Badges */}
        <Glow className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-white">Badges</h2>
          <p className="text-[#FFFFFF60] text-sm">
            Labels and status indicators with various styles
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="primary" dot>With Dot</Badge>
            <Badge variant="success" size="sm">Small</Badge>
            <Badge variant="warning" size="lg">Large</Badge>
            <Badge variant="error" onRemove={() => console.log("Removed")}>
              Removable
            </Badge>
          </div>
        </Glow>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Checkbox */}
          <Glow className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-white">Checkbox</h2>
            <p className="text-[#FFFFFF60] text-sm">
              Multi-selection input with indeterminate state
            </p>
            <div className="space-y-4">
              <Checkbox
                checked={checkboxChecked}
                onChange={setCheckboxChecked}
                label="Accept terms and conditions"
                description="By checking this box, you agree to our terms"
              />
              <Checkbox
                defaultChecked
                label="Subscribe to newsletter"
              />
              <Checkbox
                indeterminate
                label="Select all (indeterminate)"
              />
              <Checkbox
                disabled
                label="Disabled checkbox"
              />
            </div>
          </Glow>

          {/* Radio Group */}
          <Glow className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-white">Radio Group</h2>
            <p className="text-[#FFFFFF60] text-sm">
              Single selection from multiple options
            </p>
            <RadioGroup
              options={radioOptions}
              value={radioValue}
              onChange={setRadioValue}
            />
            <p className="text-sm text-[#FFFFFF60]">
              Selected: <span className="text-primary">{radioValue}</span>
            </p>
          </Glow>
        </div>

        {/* Switch */}
        <Glow className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-white">Switch</h2>
          <p className="text-[#FFFFFF60] text-sm">
            Toggle between two states with smooth animation
          </p>
          <div className="space-y-4">
            <Switch
              checked={switchChecked}
              onChange={setSwitchChecked}
              label="Enable notifications"
              description="Receive email notifications for updates"
              size="md"
            />
            <Switch
              defaultChecked
              label="Dark mode"
              size="sm"
            />
            <Switch
              label="Large switch"
              size="lg"
            />
            <Switch
              disabled
              label="Disabled switch"
            />
          </div>
        </Glow>

        {/* Separator */}
        <Glow className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-white">Separator</h2>
          <p className="text-[#FFFFFF60] text-sm">
            Visual dividers for content sections
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-white mb-2">Horizontal Separator:</p>
              <Separator />
            </div>
            <div className="flex items-center gap-4 h-20">
              <p className="text-white">Vertical Separator:</p>
              <Separator orientation="vertical" />
              <p className="text-[#FFFFFF60]">Content on the right</p>
            </div>
          </div>
        </Glow>

        {/* Footer */}
        <div className="text-center text-[#FFFFFF60] text-sm py-8">
          <p>All components built from scratch • No external UI libraries</p>
        </div>
      </div>

      {/* Alert Dialog */}
      <AlertDialog
        open={alertDialogOpen}
        onClose={() => setAlertDialogOpen(false)}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone."
        variant="error"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => console.log("Account deleted")}
      />
    </div>
  );
}
