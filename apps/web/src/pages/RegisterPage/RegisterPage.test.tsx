import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterPage } from "./RegisterPage";

describe("RegisterPage page", () => {
  it("renders full registration page with banner and registration form", () => {
    render(<RegisterPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Cadastro" })
    ).toBeInTheDocument();
    expect(screen.getByText("Olá! Preencha seus dados.")).toBeInTheDocument();
    expect(
      screen.getByAltText("Code Connect - Cadastro de desenvolvedor")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cadastrar/i })).toBeInTheDocument();
  });

  it("submits the registration form when valid data is provided", async () => {
    const handleRegisterSubmit = vi.fn();
    const user = userEvent.setup();

    render(<RegisterPage onRegisterSubmit={handleRegisterSubmit} />);

    await user.type(screen.getByLabelText("Nome"), "Carlos Dev");
    await user.type(screen.getByLabelText("Email"), "carlos@codeconnect.com");
    await user.type(screen.getByLabelText("Senha"), "test-mock-pass-123");
    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    expect(handleRegisterSubmit).toHaveBeenCalledWith({
      name: "Carlos Dev",
      email: "carlos@codeconnect.com",
      password: "test-mock-pass-123",
      rememberMe: false,
    });
  });

  it("handles navigation back to login page", async () => {
    const handleLoginNavigate = vi.fn();
    const user = userEvent.setup();

    render(<RegisterPage onLoginNavigate={handleLoginNavigate} />);

    await user.click(screen.getByRole("link", { name: /faça seu login!/i }));
    expect(handleLoginNavigate).toHaveBeenCalledTimes(1);
  });
});
