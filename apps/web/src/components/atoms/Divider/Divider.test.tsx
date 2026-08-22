import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Divider } from "./Divider";

describe("Divider component", () => {
  it("renders with centered text", () => {
    render(<Divider text="ou entre com outras contas" />);
    expect(screen.getByText("ou entre com outras contas")).toBeInTheDocument();
  });

  it("renders standard line when no text is provided", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector("hr")).toBeInTheDocument();
  });
});

