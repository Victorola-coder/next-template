import clsx from "clsx";

export default function Button(props: ButtonProps) {
  const {
    loading,
    noDefault,
    className,
    onClick,
    children,
    disabled,
    size = "default",
    variant = "default",
    ...prop
  } = props;

  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={clsx(
        !noDefault &&
          "transition-all duration-300 active:scale-[0.99] px-[21px] py-[10px] font-medium text-[18px] leading-normal font-aloeMed disabled:cursor-not-allowed disabled:bg-opacity-60",
        {
          "px-[21px] py-[12.5px] text-[18px]": size === "default",
          "px-3 py-2 text-sm": size === "sm",
          "px-6 py-3 text-lg": size === "lg",
          "bg-gradient-to-r from-primary-100 to-primary rounded-[10px]  text-white":
            variant === "default",
          "bg-[#FFFFFF] text-black rounded-[16px]": variant === "secondary",
          "bg-red-500/10 hover:bg-red-500/20 text-red-500":
            variant === "danger",
          "bg-[#6B39FF] hover:bg-[#6B39FF]/80 rounded-[12px] active:bg-[#6B39FF]/90 text-white":
            variant === "primary",
          "bg-[#283142] rounded-[12px] text-[#FFFFFF]": variant === "google",
        },
        className
      )}
      arial-busy={loading?.toString()}
      {...prop}
    >
      <div className="flex items-center justify-center">
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx={12}
              cy={12}
              r={10}
              stroke="currentColor"
              strokeWidth={4}
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          children
        )}
      </div>
    </button>
  );
}
