import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormField } from "./FormField";

describe("FormField molecule", () => {
  it("associates label with input using id", () => {
    render(<FormField id="email" label="Email ou usuário" placeholder="Digite seu email" />);
    
    const input = screen.getByLabelText("Email ou usuário");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "email");
  });

  it("renders error message and aria attributes when error is provided", () => {
    render(
      <FormField
        id="password"
        label="Senha"
        error="Senha é obrigatória"
      />
    );

    expect(screen.getByText("Senha é obrigatória")).toBeInTheDocument();
    const input = screen.getByLabelText("Senha");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "password-error");
  });
});

