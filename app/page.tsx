"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Image,
  Input,
  Modal,
  Otp,
  Select,
  Skeleton,
  Tabs,
  TextArea,
  Toggle,
} from "./components/ui";
import { motion } from "framer-motion";
import { EyeIcon } from "./components/svgs";
import { toast } from "sonner";
import { Animation, Glow, Loader } from "./components/global";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");

  const tabs = [
    { label: "Overview", value: "overview" },
    { label: "Components", value: "components" },
    { label: "Settings", value: "settings" },
  ];

  const selectOptions = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  return (
    <Animation>
      <div className="min-h-screen bg-[#0f0f0f] p-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}

          <div className="text-center space-y-6 mb-16">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold text-white font-geistSans">
                UI Components
              </h1>
              <p className="text-[#FFFFFF80] mt-4 max-w-2xl mx-auto">
                A modern, accessible, and fully-featured component library built
                with Next.js, Tailwind CSS, and TypeScript
              </p>
            </motion.div>

            <div className="flex gap-4 justify-center">
              <Button
                variant="primary"
                onClick={() => toast.success("Copied to clipboard!")}
              >
                Get Started
              </Button>
              <Button
                variant="secondary"
                onClick={() =>
                  window.open(
                    "https://github.com/victorola-coder/next-template"
                  )
                }
              >
                View on GitHub
              </Button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs
            tabs={tabs}
            defaultValue="components"
            className="justify-center"
          />

          {/* Components Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Buttons Section */}
            <Glow className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Buttons</h2>
              <div className="flex flex-row flex-wrap gap-4">
                <Button variant="default">Default Button</Button>
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="danger">Danger Button</Button>
                <Button variant="google">Google Button</Button>
                <Button loading>Loading Button</Button>
              </div>
            </Glow>
            {/* Loading States */}
            <Glow className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Loaders</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <Loader size="small" />
                  <span className="text-sm text-[#FFFFFF80]">Small</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Loader size="medium" />
                  <span className="text-sm text-[#FFFFFF80]">Medium</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Loader size="large" />
                  <span className="text-sm text-[#FFFFFF80]">Large</span>
                </div>
              </div>
            </Glow>

            {/* Icons & SVGs */}
            <Glow className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Icons & SVGs
              </h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <EyeIcon className="w-6 h-6" fill="white" />
                  <span className="text-sm text-[#FFFFFF80]">Eye</span>
                </div>
                {/* Add more icons here */}
              </div>
            </Glow>
            {/* Form Inputs Section */}
            <Glow className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">Inputs</h2>
              <Input
                placeholder="Regular Input"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputValue(e.target.value)
                }
              />
              <Input
                type="password"
                placeholder="Password Input"
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputValue(e.target.value)
                }
              />
              <TextArea
                name="textarea"
                value={textAreaValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTextAreaValue(e.target.value)
                }
                placeholder="Text Area Input"
              />
            </Glow>

            {/* Form Validation */}
            <Glow className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Form Validation
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Form submitted!");
                }}
                className="space-y-4"
              >
                <Input
                  placeholder="Email"
                  type="email"
                  error="Please enter a valid email"
                />
                <Input
                  placeholder="Password"
                  type="password"
                  error="Password is required"
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Glow>

            {/* Toggle & Select Section */}
            <Glow className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Interactive Components
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-white">Toggle Component</span>
                  <Toggle checked={toggleState} onChange={setToggleState} />
                </div>
                <Select
                  options={selectOptions}
                  placeholder="Select an option"
                  onChange={(value) => console.log(value)}
                />
              </div>
            </Glow>
            {/* Animations */}
            <Glow className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Animations
              </h2>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#283142] p-4 rounded-lg text-white text-center"
                >
                  Hover & Tap Animation
                </motion.div>
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="bg-[#283142] p-4 rounded-lg text-white text-center"
                >
                  Floating Animation
                </motion.div>
              </div>
            </Glow>
            {/* Color Palette */}
            <Glow className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Color Palette
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-12 rounded-lg bg-primary" />
                  <span className="text-sm text-[#FFFFFF80]">Primary</span>
                </div>
                <div className="space-y-2">
                  <div className="h-12 rounded-lg bg-[#283142]" />
                  <span className="text-sm text-[#FFFFFF80]">Secondary</span>
                </div>
                <div className="space-y-2">
                  <div className="h-12 rounded-lg bg-[#6366F1]" />
                  <span className="text-sm text-[#FFFFFF80]">Accent</span>
                </div>
                <div className="space-y-2">
                  <div className="h-12 rounded-lg bg-[#DC2626]" />
                  <span className="text-sm text-[#FFFFFF80]">Danger</span>
                </div>
              </div>
            </Glow>

            {/* Card & Image Section */}
            <Glow className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Display Components
              </h2>
              <Card>
                <div className="bg-[#283142] p-4 rounded-lg">
                  <Image
                    src="/images/logo.svg"
                    alt="Placeholder"
                    width={300}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
              </Card>
            </Glow>

            {/* Loading States Section */}
            <Glow className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Loading States
              </h2>
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-12 w-1/2" />
              </div>
            </Glow>

            {/* Modal & OTP Section */}
            <Glow className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Advanced Components
              </h2>
              <div className="space-y-4">
                <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                <div className="mt-8">
                  <h3 className="text-white mb-4">OTP Input</h3>
                  <Otp />
                </div>
              </div>
            </Glow>

            {/* Toast Notifications */}
            <Glow className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Toast Notifications
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="default"
                  onClick={() => toast.success("Success message")}
                >
                  Success Toast
                </Button>
                <Button
                  variant="danger"
                  onClick={() => toast.error("Error message")}
                >
                  Error Toast
                </Button>
                <Button
                  variant="primary"
                  onClick={() => toast.info("Info message")}
                >
                  Info Toast
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => toast.warning("Warning message")}
                >
                  Warning Toast
                </Button>
              </div>
            </Glow>

            {/* Typography */}
            <Glow className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Typography
              </h2>
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-geistSans font-bold text-white">
                    Heading 1
                  </h1>
                  <p className="text-[#FFFFFF80] text-sm">
                    Font: Geist Sans Bold - 36px
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-geistSans font-semibold text-white">
                    Heading 2
                  </h2>
                  <p className="text-[#FFFFFF80] text-sm">
                    Font: Geist Sans Semibold - 30px
                  </p>
                </div>
                <div>
                  <p className="text-base font-geistSans text-white">
                    Regular paragraph text with Geist Sans
                  </p>
                  <p className="text-[#FFFFFF80] text-sm">
                    Font: Geist Sans Regular - 16px
                  </p>
                </div>
                <div>
                  <p className="font-geistMono text-white">
                    Monospace text with Geist Mono
                  </p>
                  <p className="text-[#FFFFFF80] text-sm">
                    Font: Geist Mono - 16px
                  </p>
                </div>
              </div>
            </Glow>

            {/* Gradients */}
            <Glow className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Gradients
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-20 rounded-lg bg-gradient-to-r from-primary to-[#6366F1]" />
                  <span className="text-sm text-[#FFFFFF80]">
                    Primary Gradient
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-20 rounded-lg bg-gradient-to-r from-[#DC2626] to-[#EA580C]" />
                  <span className="text-sm text-[#FFFFFF80]">
                    Danger Gradient
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-20 rounded-lg bg-gradient-to-r from-[#283142] to-[#1A202B]" />
                  <span className="text-sm text-[#FFFFFF80]">
                    Background Gradient
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="h-20 rounded-lg bg-gradient-to-r from-[#059669] to-[#10B981]" />
                  <span className="text-sm text-[#FFFFFF80]">
                    Success Gradient
                  </span>
                </div>
              </div>
            </Glow>
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Modal Example"
        >
          <div className="space-y-4">
            <p className="text-white">
              This is an example modal that showcases the Modal component.
            </p>
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(false)}
              className="w-full"
            >
              Close Modal
            </Button>
          </div>
        </Modal>
      </div>
      <footer className="mt-16 text-center text-[#FFFFFF80]">
        <p>Built with Next.js, Tailwind CSS, and TypeScript</p>
        <p className="mt-2">© {new Date().getFullYear()} Victorola</p>
      </footer>
    </Animation>
  );
}
