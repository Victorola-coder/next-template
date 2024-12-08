import clsx from "clsx";

export default function Glow({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        className,
        "relative overflow-hidden after:content-[''] after:absolute after:bg-zinc-100 after:w-0 after:h-0.5 after:bottom-0 after:right-0 after:transition-all after:duration-300 after:hover:left-0 after:hover:w-full space-y-3 hover:shadow-2xl hover:shadow-emerald-400/20 group hover:bg-[#FFFFFF08] transition-all duration-300 hover:scale-[0.99] rounded-[36px]"
      )}
    >
      {children}
    </div>
  );
}

// WRAP AROUND ANY COMPONENTS YOU WANTS TO HAVE A GLOW EFFECTS on HoVER🫠
