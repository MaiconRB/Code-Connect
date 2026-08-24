import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "./RegisterForm";

describe("RegisterForm organism", () => {
  it("renders all form elements properly according to Figma spec", () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nome completo")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite seu email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("Lembrar-me")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cadastrar/i })).toBeInTheDocument();
    expect(screen.getByText("ou entre com outras contas")).toBeInTheDocument();
    expect(screen.getByText("Github")).toBeInTheDocument();
    expect(screen.getByText("Gmail")).toBeInTheDocument();
    expect(screen.getByText("Já tem conta?")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /faça seu login!/i })).toBeInTheDocument();
  });

  it("shows validation error messages when submitted empty or with invalid data", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<RegisterForm onSubmit={handleSubmit} />);
    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    expect(screen.getByText("Informe seu nome completo")).toBeInTheDocument();
    expect(screen.getByText("Informe seu e-mail")).toBeInTheDocument();
    expect(screen.getByText("Informe sua senha")).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("validates email format and password length", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<RegisterForm onSubmit={handleSubmit} />);
    await user.type(screen.getByLabelText("Nome"), "Maria Silva");
    await user.type(screen.getByLabelText("Email"), "email-invalido");
    await user.type(screen.getByLabelText("Senha"), "123");
    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    expect(screen.getByText("Informe um e-mail válido")).toBeInTheDocument();
    expect(screen.getByText("A senha deve ter pelo menos 6 caracteres")).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("submits valid registration data successfully", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<RegisterForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText("Nome"), "Maria Silva");
    await user.type(screen.getByLabelText("Email"), "maria@codeconnect.com");
    await user.type(screen.getByLabelText("Senha"), "test-mock-pass-123");
    await user.click(screen.getByLabelText("Lembrar-me"));
    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      name: "Maria Silva",
      email: "maria@codeconnect.com",
      password: "test-mock-pass-123",
      rememberMe: true,
    });
  });

  it("handles login link and social logins", async () => {
    const handleLoginClick = vi.fn();
    const handleGithub = vi.fn();
    const handleGoogle = vi.fn();
    const user = userEvent.setup();

    render(
      <RegisterForm
        onLoginClick={handleLoginClick}
        onGithubLogin={handleGithub}
        onGoogleLogin={handleGoogle}
      />
    );

    await user.click(screen.getByRole("link", { name: /faça seu login!/i }));
    expect(handleLoginClick).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: /github/i }));
    expect(handleGithub).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: /gmail/i }));
    expect(handleGoogle).toHaveBeenCalledTimes(1);
  });
});
