import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

describe("LoginForm organism", () => {
  it("renders all form elements properly", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Email ou usuário")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("Lembrar-me")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /esqueci a senha/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText("ou entre com outras contas")).toBeInTheDocument();
    expect(screen.getByText("Github")).toBeInTheDocument();
    expect(screen.getByText("Gmail")).toBeInTheDocument();
    expect(screen.getByText("Ainda não tem conta?")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /crie seu cadastro!/i })).toBeInTheDocument();
  });

  it("shows validation error messages when submitted empty", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<LoginForm onSubmit={handleSubmit} />);
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getByText("Informe seu e-mail ou nome de usuário")).toBeInTheDocument();
    expect(screen.getByText("Informe sua senha")).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("submits valid credentials successfully", async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<LoginForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText("Email ou usuário"), "dev@codeconnect.com");
    await user.type(screen.getByLabelText("Senha"), "test-mock-pass-123");
    await user.click(screen.getByLabelText("Lembrar-me"));
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      identifier: "dev@codeconnect.com",
      password: "test-mock-pass-123",
      rememberMe: true,
    });
  });

  it("handles forgot password and register links", async () => {
    const handleForgot = vi.fn();
    const handleRegister = vi.fn();
    const user = userEvent.setup();

    render(
      <LoginForm
        onForgotPasswordClick={handleForgot}
        onRegisterClick={handleRegister}
      />
    );

    await user.click(screen.getByRole("link", { name: /esqueci a senha/i }));
    expect(handleForgot).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("link", { name: /crie seu cadastro!/i }));
    expect(handleRegister).toHaveBeenCalledTimes(1);
  });
});

