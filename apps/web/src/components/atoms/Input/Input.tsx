import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError = false, className = "", disabled, ...props }, ref) => {
    const baseStyles =
      "w-full bg-[#3E4446] text-white placeholder-[#8D9599] px-3.5 py-2.5 rounded-lg border outline-none transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed";

    const stateStyles = hasError
      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
      : "border-transparent focus:border-[#81FE88] focus:ring-1 focus:ring-[#81FE88]";

    return (
      <input
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${stateStyles} ${className}`.trim()}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

