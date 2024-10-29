"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ComponentProps, PropsWithChildren } from "react";

type Props = {
  show?: boolean;
};

export default function AnimateInOut({
  children,
  show,
  animate,
  drag,
  onDragEnd,
  className,
  transition,
  dragConstraints,
  dragDirectionLock = true,
  dragElastic,
  onClick,
  title,
  ...divProps
}: PropsWithChildren<Props & ComponentProps<typeof motion.div>>) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          animate={animate}
          drag={drag}
          onClick={(e) => onClick?.(e)}
          onDragEnd={(e: PointerEvent, info) => onDragEnd?.(e, info)}
          dragConstraints={dragConstraints}
          dragElastic={dragElastic}
          dragDirectionLock={dragDirectionLock}
          transition={transition}
          className={className}
          title={title}
          aria-label={title}
          {...divProps}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
