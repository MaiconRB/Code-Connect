import type { FC, ReactNode, AnchorHTMLAttributes } from "react";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "default" | "muted" | "highlight";
  icon?: ReactNode;
}

export const Link: FC<LinkProps> = ({
  children,
  variant = "default",
  icon,
  className = "",
  ...props
}) => {
  const baseStyles = "transition-colors cursor-pointer select-none inline-flex items-center gap-1";

  const variantStyles = {
    default: "text-[#81FE88] hover:text-[#6DE775] hover:underline",
    muted: "text-xs text-[#BCBFC2] hover:text-white hover:underline",
    highlight: "text-sm text-[#81FE88] hover:text-[#6DE775] font-medium hover:underline",
  }[variant];

  return (
    <a className={`${baseStyles} ${variantStyles} ${className}`.trim()} {...props}>
      <span>{children}</span>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
    </a>
  );
};

