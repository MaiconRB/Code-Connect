import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders LoginPage as root page", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "Login" })).toBeInTheDocument();
  });
});

