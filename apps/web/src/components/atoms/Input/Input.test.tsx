import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input component", () => {
  it("renders with placeholder correctly", () => {
    render(<Input placeholder="Digite seu email" />);
    expect(screen.getByPlaceholderText("Digite seu email")).toBeInTheDocument();
  });

  it("handles text input typing correctly", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Input onChange={handleChange} placeholder="Email" />);
    const input = screen.getByPlaceholderText("Email");

    await user.type(input, "usuario@email.com");
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue("usuario@email.com");
  });

  it("applies error styling when hasError is true", () => {
    render(<Input hasError placeholder="Com erro" />);
    const input = screen.getByPlaceholderText("Com erro");
    expect(input.className).toContain("border-red-500");
  });

  it("respects disabled attribute", () => {
    render(<Input disabled placeholder="Desabilitado" />);
    expect(screen.getByPlaceholderText("Desabilitado")).toBeDisabled();
  });
});

