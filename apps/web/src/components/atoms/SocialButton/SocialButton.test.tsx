import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SocialButton } from "./SocialButton";

describe("SocialButton component", () => {
  it("renders with icon and label correctly", () => {
    render(
      <SocialButton
        iconSrc="/Github.svg"
        iconAlt="Logo do Github"
        label="Github"
      />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByAltText("Logo do Github")).toHaveAttribute("src", "/Github.svg");
    expect(screen.getByText("Github")).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <SocialButton
        iconSrc="/Google.svg"
        iconAlt="Logo do Google"
        label="Gmail"
        onClick={handleClick}
      />
    );

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

