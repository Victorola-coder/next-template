import clsx from "clsx";

export default function Input({
  value,
  onChange,
  placeholder,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      type="text"
      value={value}
      className={clsx(
        "mx-auto block transition-all duration-300 w-[362px] rounded-[33.495px] outline-none border-[0.76px] focus:border-primary border-white md:border-[1.26px] border-solid bg-[#FFFFFF05] px-[19px] py-[11px] md:py-[15px] md:px-[32.68px] text-white placeholder:text-[#FFFFFF80] md:rounded-[55.3px] font-normal  lg:text-[17.23px] md:leading-[45.16px] md:w-[529.09px]"
      )}
      required
      autoComplete="off"
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
