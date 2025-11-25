"use client";

import { clsx } from "clsx";
import { useState, useRef, useEffect } from "react";

export function Slider({
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className,
  showValue = false,
  formatValue,
}: SliderProps) {
  const isControlled = value !== undefined;
  const isRange = Array.isArray(value) || Array.isArray(defaultValue);
  
  const [internalValue, setInternalValue] = useState<number | number[]>(() => {
    if (isControlled) return value!;
    if (defaultValue !== undefined) return defaultValue;
    return isRange ? [min, max] : min;
  });

  const currentValue = isControlled ? value! : internalValue;
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<number | null>(null);

  const handleValueChange = (newValue: number | number[]) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  const getValueFromPosition = (clientX: number) => {
    if (!sliderRef.current) return min;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const rawValue = (percentage / 100) * (max - min) + min;
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };

  const handleMouseDown = (thumbIndex: number) => (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(thumbIndex);
  };

  useEffect(() => {
    if (isDragging === null) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newValue = getValueFromPosition(e.clientX);
      
      if (isRange && Array.isArray(currentValue)) {
        const newRange = [...currentValue];
        newRange[isDragging] = newValue;
        
        // Ensure min <= max
        if (isDragging === 0 && newValue > newRange[1]) {
          newRange[0] = newRange[1];
        } else if (isDragging === 1 && newValue < newRange[0]) {
          newRange[1] = newRange[0];
        }
        
        handleValueChange(newRange);
      } else {
        handleValueChange(newValue);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, currentValue, min, max, step]);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isDragging !== null) return;
    
    const newValue = getValueFromPosition(e.clientX);
    
    if (isRange && Array.isArray(currentValue)) {
      // Find closest thumb
      const [minVal, maxVal] = currentValue;
      const distToMin = Math.abs(newValue - minVal);
      const distToMax = Math.abs(newValue - maxVal);
      const closestThumb = distToMin < distToMax ? 0 : 1;
      
      const newRange = [...currentValue];
      newRange[closestThumb] = newValue;
      handleValueChange(newRange);
    } else {
      handleValueChange(newValue);
    }
  };

  const renderThumb = (val: number, index: number = 0) => {
    const percentage = getPercentage(val);
    
    return (
      <div
        key={index}
        className={clsx(
          "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
          "w-5 h-5 rounded-full bg-white border-2 border-primary",
          "shadow-lg transition-transform",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          !disabled && "cursor-grab active:cursor-grabbing hover:scale-110",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        style={{ left: `${percentage}%` }}
        onMouseDown={handleMouseDown(index)}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={val}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      />
    );
  };

  const values = Array.isArray(currentValue) ? currentValue : [currentValue];
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  return (
    <div className={clsx("w-full", className)}>
      <div
        ref={sliderRef}
        className={clsx(
          "relative h-2 rounded-full bg-[#FFFFFF20]",
          !disabled && "cursor-pointer"
        )}
        onClick={handleTrackClick}
      >
        {/* Active track */}
        <div
          className="absolute h-full rounded-full bg-primary"
          style={{
            left: `${getPercentage(minVal)}%`,
            right: `${100 - getPercentage(maxVal)}%`,
          }}
        />
        
        {/* Thumbs */}
        {values.map((val, index) => renderThumb(val, index))}
      </div>

      {/* Value display */}
      {showValue && (
        <div className="flex justify-between mt-2 text-sm text-[#FFFFFF80]">
          {Array.isArray(currentValue) ? (
            <>
              <span>{formatValue ? formatValue(currentValue[0]) : currentValue[0]}</span>
              <span>{formatValue ? formatValue(currentValue[1]) : currentValue[1]}</span>
            </>
          ) : (
            <span className="mx-auto">
              {formatValue ? formatValue(currentValue as number) : currentValue}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
