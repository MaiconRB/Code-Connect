import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "./LoginPage";

describe("LoginPage page", () => {
  it("renders full login page with banner and login form", () => {
    render(<LoginPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Login" })).toBeInTheDocument();
    expect(screen.getByText("Boas-vindas! Faça seu login.")).toBeInTheDocument();
    expect(screen.getByAltText("Code Connect - Desenvolvedora codificando")).toBeInTheDocument();
    expect(screen.getByLabelText("Email ou usuário")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("submits the login form when valid credentials are provided", async () => {
    const handleLoginSubmit = vi.fn();
    const user = userEvent.setup();

    render(<LoginPage onLoginSubmit={handleLoginSubmit} />);

    await user.type(screen.getByLabelText("Email ou usuário"), "aline.dev");
    await user.type(screen.getByLabelText("Senha"), "123456");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(handleLoginSubmit).toHaveBeenCalledWith({
      identifier: "aline.dev",
      password: "123456",
      rememberMe: false,
    });
  });
});

