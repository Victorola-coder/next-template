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
import { Animation, Glow } from "./components/global";

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
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">UI Components</h1>
            <p className="text-[#FFFFFF80]">
              A showcase of all available UI components
            </p>
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
              <div className="space-y-4">
                <Button variant="default">Default Button</Button>
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="danger">Danger Button</Button>
                <Button variant="google">Google Button</Button>
                <Button loading>Loading Button</Button>
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

            {/* Card & Image Section */}
            <Glow className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-white mb-4">
                Display Components
              </h2>
              <Card>
                <div className="bg-[#283142] p-4 rounded-lg">
                  <Image
                    src="/placeholder.jpg"
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
    </Animation>
  );
}
