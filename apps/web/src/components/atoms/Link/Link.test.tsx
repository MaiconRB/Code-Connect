import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Link } from "./Link";

describe("Link component", () => {
  it("renders with children and href correctly", () => {
    render(<Link href="/recuperar-senha">Esqueci a senha</Link>);
    const link = screen.getByRole("link", { name: /esqueci a senha/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/recuperar-senha");
  });

  it("renders with icon", () => {
    render(
      <Link href="/cadastro" icon={<span data-testid="link-icon">📋</span>}>
        Crie seu cadastro!
      </Link>
    );

    expect(screen.getByTestId("link-icon")).toBeInTheDocument();
    expect(screen.getByText("Crie seu cadastro!")).toBeInTheDocument();
  });
});

