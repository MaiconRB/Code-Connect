import type { FC } from "react";
import { SocialButton } from "../../atoms/SocialButton/SocialButton";

export interface SocialLoginGroupProps {
  onGithubClick?: () => void;
  onGoogleClick?: () => void;
  className?: string;
}

export const SocialLoginGroup: FC<SocialLoginGroupProps> = ({
  onGithubClick,
  onGoogleClick,
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-center gap-6 ${className}`.trim()}>
      <SocialButton
        iconSrc="/Github.svg"
        iconAlt="Logo do Github"
        label="Github"
        onClick={onGithubClick}
      />
      <SocialButton
        iconSrc="/Google.svg"
        iconAlt="Logo do Google"
        label="Gmail"
        onClick={onGoogleClick}
      />
    </div>
  );
};

