"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { ImageProps as NextImageProps } from "next/image";

interface ImageProps extends NextImageProps {
  className?: string;
}

export default function OptimizedImage({ src, alt, ...props }: ImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="relative overflow-hidden">
      <Image
        src={src}
        alt={alt}
        quality={75}
        loading="lazy"
        onLoad={() => setLoading(false)}
        className={clsx(
          "duration-700 ease-in-out",
          isLoading ? "scale-110 blur-2xl" : "scale-100 blur-0"
        )}
        {...props}
      />
    </div>
  );
}
