import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../header";

vi.mock("next/form", () => ({
  __esModule: true,
  default: vi.fn(({ children, ...props }) => <form {...props}>{children}</form>),
}));

vi.mock("@sanity/icons", () => ({
  TrolleyIcon: vi.fn().mockImplementation(() => <svg data-testid="trolley-icon" />),
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: vi.fn(({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )),
}));

describe("Header", () => {
  test("renders correctly", () => {
    render(<Header />);

    expect(screen.getByText("Impact shop")).toBeDefined();
    expect(screen.getByPlaceholderText("Search for products")).toBeDefined();
    expect(screen.getByText("Cart")).toBeDefined();
  });
});
