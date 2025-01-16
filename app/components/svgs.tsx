import { clsx } from "clsx";

export const EyeIcon = ({ className, fill }: SVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="10"
      className={className}
      viewBox="0 0 22 10"
      fill="none"
    >
      <path
        d="M21 1C21 1 17 7 11 7C5 7 1 1 1 1"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 6.5L15.5 9"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 4L21 6"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 6L3 4"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 6.5L6.5 9"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
