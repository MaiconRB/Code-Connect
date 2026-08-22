import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthBanner } from "./AuthBanner";

describe("AuthBanner organism", () => {
  it("renders banner image with alt correctly", () => {
    render(
      <AuthBanner
        imageSrc="/IMG_1 - Desktop.png"
        imageAlt="Banner de autenticação Code Connect"
      />
    );

    const image = screen.getByAltText("Banner de autenticação Code Connect");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/IMG_1 - Desktop.png");
  });
});

