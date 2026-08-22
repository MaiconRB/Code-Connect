import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button component", () => {
  it("renders button with children correctly", () => {
    render(<Button>Entrar</Button>);
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Clique aqui</Button>);
    await user.click(screen.getByRole("button", { name: /clique aqui/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders in disabled state and does not trigger onClick", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button disabled onClick={handleClick}>Desabilitado</Button>);
    const button = screen.getByRole("button", { name: /desabilitado/i });

    expect(button).toBeDisabled();
    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders loading state with spinner and disables button", () => {
    render(<Button isLoading>Carregando</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(screen.getByTestId("button-loading-spinner")).toBeInTheDocument();
  });

  it("renders left and right icons", () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        Avançar
      </Button>
    );

    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    expect(screen.getByText("Avançar")).toBeInTheDocument();
  });
});

