import { useState, type FC } from "react";
import { AuthLayout } from "../../components/templates/AuthLayout/AuthLayout";
import { AuthBanner } from "../../components/organisms/AuthBanner/AuthBanner";
import {
  RegisterForm,
  type RegisterFormValues,
} from "../../components/organisms/RegisterForm/RegisterForm";

export interface RegisterPageProps {
  onRegisterSubmit?: (values: RegisterFormValues) => void;
  onLoginNavigate?: () => void;
}

export const RegisterPage: FC<RegisterPageProps> = ({
  onRegisterSubmit,
  onLoginNavigate,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      if (onRegisterSubmit) {
        onRegisterSubmit(values);
      } else {
        console.log("Cadastro submetido com sucesso:", values);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGithubLogin = () => {
    console.log("Autenticação com Github iniciada no cadastro");
  };

  const handleGoogleLogin = () => {
    console.log("Autenticação com Google iniciada no cadastro");
  };

  return (
    <AuthLayout
      title="Cadastro"
      subtitle="Olá! Preencha seus dados."
      banner={
        <AuthBanner
          imageSrc="/IMG_2 - Desktop.png"
          imageAlt="Code Connect - Cadastro de desenvolvedor"
        />
      }
    >
      <RegisterForm
        onSubmit={handleRegister}
        isLoading={isSubmitting}
        onLoginClick={onLoginNavigate}
        onGithubLogin={handleGithubLogin}
        onGoogleLogin={handleGoogleLogin}
      />
    </AuthLayout>
  );
};
