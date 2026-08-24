import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App component", () => {
  it("renders LoginPage as root page", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Login" })
    ).toBeInTheDocument();
  });

  it("navigates to RegisterPage when clicking register link and back to LoginPage", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Click register link
    await user.click(
      screen.getByRole("link", { name: /crie seu cadastro!/i })
    );

    // Verify Cadastro page is shown
    expect(
      screen.getByRole("heading", { level: 1, name: "Cadastro" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Olá! Preencha seus dados.")
    ).toBeInTheDocument();

    // Click login link
    await user.click(
      screen.getByRole("link", { name: /faça seu login!/i })
    );

    // Verify Login page is shown again
    expect(
      screen.getByRole("heading", { level: 1, name: "Login" })
    ).toBeInTheDocument();
  });
});
