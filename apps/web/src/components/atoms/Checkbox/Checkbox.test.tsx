import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

describe("Checkbox component", () => {
  it("renders with label correctly", () => {
    render(<Checkbox id="remember" label="Lembrar-me" />);
    expect(screen.getByLabelText("Lembrar-me")).toBeInTheDocument();
  });

  it("triggers onChange when clicked", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox id="remember" label="Lembrar-me" onChange={handleChange} />);
    const checkbox = screen.getByLabelText("Lembrar-me");

    await user.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders check icon when checked is true", () => {
    render(<Checkbox id="remember" label="Lembrar-me" checked readOnly />);
    expect(screen.getByTestId("checkbox-check-icon")).toBeInTheDocument();
  });

  it("does not trigger onChange when disabled", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox id="remember" label="Lembrar-me" disabled onChange={handleChange} />);
    const checkbox = screen.getByLabelText("Lembrar-me");

    expect(checkbox).toBeDisabled();
    await user.click(checkbox);
    expect(handleChange).not.toHaveBeenCalled();
  });
});

