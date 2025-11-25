"use client";

import { useState } from "react";
import {
  Slider,
  Rating,
  TagInput,
  Combobox,
  MultiSelect,
  FileUpload,
  ColorPicker,
  Button,
  Separator,
} from "../components/ui";
import { Glow } from "../components/global";

export default function AdvancedInputsShowcase() {
  const [sliderValue, setSliderValue] = useState(50);
  const [rangeValue, setRangeValue] = useState([25, 75]);
  const [rating, setRating] = useState(3.5);
  const [tags, setTags] = useState<string[]>(["React", "TypeScript"]);
  const [comboValue, setComboValue] = useState("");
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [color, setColor] = useState("#6366F1");

  const comboOptions = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "solid", label: "Solid" },
  ];

  const tagSuggestions = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind",
    "Node.js",
    "Python",
    "Go",
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">Advanced Input Components</h1>
          <p className="text-[#FFFFFF80] max-w-2xl mx-auto">
            Phase 2: Complex input components built from scratch with full functionality
          </p>
        </div>

        <Separator />

        {/* Slider */}
        <Glow className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Slider</h2>
            <p className="text-[#FFFFFF60] text-sm">
              Single and range sliders with drag functionality
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-sm text-white">Single Value Slider</label>
              <Slider
                value={sliderValue}
                onChange={(val) => setSliderValue(val as number)}
                min={0}
                max={100}
                step={1}
                showValue
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm text-white">Range Slider</label>
              <Slider
                value={rangeValue}
                onChange={(val) => setRangeValue(val as number[])}
                min={0}
                max={100}
                step={5}
                showValue
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm text-white">Custom Format</label>
              <Slider
                value={sliderValue}
                onChange={(val) => setSliderValue(val as number)}
                min={0}
                max={100}
                showValue
                formatValue={(val) => `${val}%`}
              />
            </div>
          </div>
        </Glow>

        {/* Rating */}
        <Glow className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Rating</h2>
            <p className="text-[#FFFFFF60] text-sm">
              Star ratings with full and half-star support
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm text-white">Interactive Rating</label>
              <Rating value={rating} onChange={setRating} precision={0.5} />
              <p className="text-sm text-[#FFFFFF60]">Current: {rating} stars</p>
            </div>

            <div className="space-y-3">
              <label className="text-sm text-white">Sizes</label>
              <div className="flex items-center gap-6">
                <div className="space-y-1">
                  <Rating value={4} size="sm" readOnly />
                  <p className="text-xs text-[#FFFFFF60]">Small</p>
                </div>
                <div className="space-y-1">
                  <Rating value={4} size="md" readOnly />
                  <p className="text-xs text-[#FFFFFF60]">Medium</p>
                </div>
                <div className="space-y-1">
                  <Rating value={4} size="lg" readOnly />
                  <p className="text-xs text-[#FFFFFF60]">Large</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm text-white">Read-only</label>
              <Rating value={3.5} precision={0.5} readOnly />
            </div>
          </div>
        </Glow>

        {/* Tag Input */}
        <Glow className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Tag Input</h2>
            <p className="text-[#FFFFFF60] text-sm">
              Add and remove tags with suggestions and keyboard navigation
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm text-white">Technologies</label>
              <TagInput
                value={tags}
                onChange={setTags}
                suggestions={tagSuggestions}
                placeholder="Type and press Enter..."
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm text-white">Limited Tags (max 5)</label>
              <TagInput
                defaultValue={["Tag 1", "Tag 2"]}
                maxTags={5}
                placeholder="Add up to 5 tags..."
              />
            </div>
          </div>
        </Glow>

        {/* Combobox & Multi-Select */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Glow className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Combobox</h2>
              <p className="text-[#FFFFFF60] text-sm">
                Searchable dropdown with keyboard navigation
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-sm text-white">Select Framework</label>
              <Combobox
                options={comboOptions}
                value={comboValue}
                onChange={setComboValue}
                placeholder="Choose a framework..."
              />
              {comboValue && (
                <p className="text-sm text-[#FFFFFF60]">
                  Selected: <span className="text-primary">{comboValue}</span>
                </p>
              )}
            </div>
          </Glow>

          <Glow className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Multi-Select</h2>
              <p className="text-[#FFFFFF60] text-sm">
                Select multiple options with search
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-sm text-white">Select Frameworks</label>
              <MultiSelect
                options={comboOptions}
                value={multiValue}
                onChange={setMultiValue}
                placeholder="Choose frameworks..."
                maxSelected={3}
              />
            </div>
          </Glow>
        </div>

        {/* Color Picker */}
        <Glow className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Color Picker</h2>
            <p className="text-[#FFFFFF60] text-sm">
              Color selection with presets and hex input
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm text-white">Theme Color</label>
              <ColorPicker value={color} onChange={setColor} />
            </div>

            <div className="p-4 rounded-lg border border-[#FFFFFF20]" style={{ backgroundColor: color }}>
              <p className="text-white font-semibold">Preview</p>
              <p className="text-white/80 text-sm">This box uses the selected color</p>
            </div>
          </div>
        </Glow>

        {/* File Upload */}
        <Glow className="p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">File Upload</h2>
            <p className="text-[#FFFFFF60] text-sm">
              Drag and drop files with validation and previews
            </p>
          </div>

          <FileUpload
            value={files}
            onChange={setFiles}
            accept="image/*,.pdf"
            maxSize={5 * 1024 * 1024}
            maxFiles={5}
            multiple
          />
        </Glow>

        {/* Footer */}
        <div className="text-center text-[#FFFFFF60] text-sm py-8">
          <p>Phase 2: 7/10 Components Complete • Built from scratch with TypeScript</p>
        </div>
      </div>
    </div>
  );
}
