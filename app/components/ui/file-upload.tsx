"use client";

import { clsx } from "clsx";
import { useState, useRef } from "react";
import { Badge } from "./badge";

export function FileUpload({
  value = [],
  onChange,
  accept,
  maxSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 10,
  multiple = true,
  disabled = false,
  className,
  error,
  onUpload,
}: FileUploadProps) {
  const [files, setFiles] = useState<FileUploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFilesChange = (newFiles: File[]) => {
    onChange?.(newFiles);
  };

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File size exceeds ${formatBytes(maxSize)}`;
    }
    if (accept) {
      const acceptedTypes = accept.split(",").map((t) => t.trim());
      const fileType = file.type;
      const fileExt = `.${file.name.split(".").pop()}`;
      
      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith(".")) return fileExt === type;
        if (type.endsWith("/*")) return fileType.startsWith(type.replace("/*", ""));
        return fileType === type;
      });
      
      if (!isAccepted) {
        return `File type not accepted`;
      }
    }
    return null;
  };

  const addFiles = async (newFiles: File[]) => {
    const filesToAdd = multiple ? newFiles : newFiles.slice(0, 1);
    const currentFileCount = value.length;
    
    if (maxFiles && currentFileCount + filesToAdd.length > maxFiles) {
      filesToAdd.splice(maxFiles - currentFileCount);
    }

    const fileObjects: FileUploadFile[] = [];
    
    for (const file of filesToAdd) {
      const validationError = validateFile(file);
      const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
      
      fileObjects.push({
        file,
        preview,
        error: validationError || undefined,
      });
    }

    setFiles([...files, ...fileObjects]);
    
    const validFiles = fileObjects.filter((f) => !f.error).map((f) => f.file);
    handleFilesChange([...value, ...validFiles]);

    if (onUpload && validFiles.length > 0) {
      try {
        await onUpload(validFiles);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    handleFilesChange(newFiles.filter((f) => !f.error).map((f) => f.file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled) return;
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    addFiles(selectedFiles);
    if (inputRef.current) inputRef.current.value = "";
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className={clsx("space-y-4", className)}>
      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && inputRef.current?.click()}
        className={clsx(
          "border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer",
          isDragging && "border-primary bg-primary/10 scale-105",
          !isDragging && !error && "border-[#FFFFFF20] hover:border-primary",
          error && "border-red-500",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <svg
          className={clsx(
            "mx-auto w-12 h-12 mb-4",
            isDragging ? "text-primary" : "text-[#FFFFFF40]"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        
        <p className="text-white font-medium mb-1">
          {isDragging ? "Drop files here" : "Click to upload or drag and drop"}
        </p>
        <p className="text-sm text-[#FFFFFF60]">
          {accept ? `Accepted: ${accept}` : "Any file type"}
          {maxSize && ` • Max ${formatBytes(maxSize)}`}
        </p>
        
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          disabled={disabled}
          className="hidden"
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((fileObj, index) => (
            <div
              key={index}
              className={clsx(
                "flex items-center gap-3 p-3 rounded-lg border",
                fileObj.error ? "border-red-500 bg-red-500/10" : "border-[#FFFFFF20] bg-[#1A1A1A]"
              )}
            >
              {/* Preview */}
              {fileObj.preview ? (
                <img
                  src={fileObj.preview}
                  alt={fileObj.file.name}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center bg-[#FFFFFF10] rounded">
                  <svg className="w-6 h-6 text-[#FFFFFF60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* File info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {fileObj.file.name}
                </p>
                <p className="text-xs text-[#FFFFFF60]">
                  {formatBytes(fileObj.file.size)}
                </p>
                {fileObj.error && (
                  <p className="text-xs text-red-400 mt-1">{fileObj.error}</p>
                )}
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-[#FFFFFF10] rounded transition-colors"
                aria-label="Remove file"
              >
                <svg className="w-5 h-5 text-[#FFFFFF60]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}

      {maxFiles && (
        <p className="text-xs text-[#FFFFFF60]">
          {value.length} / {maxFiles} files
        </p>
      )}
    </div>
  );
}
