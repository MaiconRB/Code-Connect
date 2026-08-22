import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SocialLoginGroup } from "./SocialLoginGroup";

describe("SocialLoginGroup molecule", () => {
  it("renders both Github and Gmail social buttons", () => {
    render(<SocialLoginGroup />);
    expect(screen.getByText("Github")).toBeInTheDocument();
    expect(screen.getByText("Gmail")).toBeInTheDocument();
  });

  it("handles clicks on both social buttons", async () => {
    const handleGithub = vi.fn();
    const handleGoogle = vi.fn();
    const user = userEvent.setup();

    render(
      <SocialLoginGroup
        onGithubClick={handleGithub}
        onGoogleClick={handleGoogle}
      />
    );

    await user.click(screen.getByText("Github"));
    expect(handleGithub).toHaveBeenCalledTimes(1);

    await user.click(screen.getByText("Gmail"));
    expect(handleGoogle).toHaveBeenCalledTimes(1);
  });
});

