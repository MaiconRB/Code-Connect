import { useState, type FC } from "react";
import { AuthLayout } from "../../components/templates/AuthLayout/AuthLayout";
import { AuthBanner } from "../../components/organisms/AuthBanner/AuthBanner";
import { LoginForm, type LoginFormValues } from "../../components/organisms/LoginForm/LoginForm";

export interface LoginPageProps {
  onLoginSubmit?: (values: LoginFormValues) => void;
  onForgotPassword?: () => void;
  onRegisterNavigate?: () => void;
}

export const LoginPage: FC<LoginPageProps> = ({
  onLoginSubmit,
  onForgotPassword,
  onRegisterNavigate,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      if (onLoginSubmit) {
        onLoginSubmit(values);
      } else {
        console.log("Login submetido com sucesso:", values);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGithubLogin = () => {
    console.log("Autenticação com Github iniciada");
  };

  const handleGoogleLogin = () => {
    console.log("Autenticação com Google iniciada");
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Boas-vindas! Faça seu login."
      banner={
        <AuthBanner
          imageSrc="/IMG_1 - Desktop.png"
          imageAlt="Code Connect - Desenvolvedora codificando"
        />
      }
    >
      <LoginForm
        onSubmit={handleLogin}
        isLoading={isSubmitting}
        onForgotPasswordClick={onForgotPassword}
        onRegisterClick={onRegisterNavigate}
        onGithubLogin={handleGithubLogin}
        onGoogleLogin={handleGoogleLogin}
      />
    </AuthLayout>
  );
};

