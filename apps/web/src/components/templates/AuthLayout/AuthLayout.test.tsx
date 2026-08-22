import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthLayout } from "./AuthLayout";

describe("AuthLayout template", () => {
  it("renders title, subtitle, banner slot and children correctly", () => {
    render(
      <AuthLayout
        title="Título de Teste"
        subtitle="Subtítulo descritivo"
        banner={<div data-testid="test-banner">Banner Slot</div>}
      >
        <div data-testid="test-form">Formulário Slot</div>
      </AuthLayout>
    );

    expect(screen.getByRole("heading", { level: 1, name: "Título de Teste" })).toBeInTheDocument();
    expect(screen.getByText("Subtítulo descritivo")).toBeInTheDocument();
    expect(screen.getByTestId("test-banner")).toBeInTheDocument();
    expect(screen.getByTestId("test-form")).toBeInTheDocument();
  });
});

