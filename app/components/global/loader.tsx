import clsx from "clsx";

const LARGE = "w-16 h-16";
const MEDIUM = "w-12 h-12";
const SMALL_CONTAINER = "w-8 h-8";

const PRIMARY_PSEUDO = "before:bg-primary after:bg-primary";
const BODY_PSEUDO = "before:bg-body after:bg-body";

export default function Loader({
  color = "primary",
  size = "medium",
  className,
}: {
  color?: "primary" | "body";
  size?: "small" | "medium" | "large";
  className?: string;
}) {
  const spinSize =
    size === "small" ? SMALL_CONTAINER : size === "large" ? LARGE : MEDIUM;

  const spinColor = color === "body" ? BODY_PSEUDO : PRIMARY_PSEUDO;
  const childColor = color === "body" ? "bg-body" : "bg-primary";

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={clsx(
          "z-10 mx-auto animate-spin flex justify-center",
          "before:absolute before:rounded-full before:-bottom-0 before:-left-[0.1rem]",
          "after:absolute after:rounded-full after:-bottom-0 after:-right-[0.1rem]",
          "before:w-[50%] before:h-[50%] after:w-[50%] after:h-[50%]",
          spinSize,
          spinColor,
          className
        )}
      >
        <div
          className={clsx(
            "absolute -top-[0.1rem] rounded-full w-[50%] h-[50%]",
            childColor
          )}
        />
      </div>
    </div>
  );
}
