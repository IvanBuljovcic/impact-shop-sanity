import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import StockIndicator, { stockStatusText } from "../stock-indicator";

describe("Stock indicator", () => {
  test("renders correctly", () => {
    render(<StockIndicator stock={1} />);

    expect(screen.getByTestId("stock-indicator")).toBeDefined();
    expect(screen.getByTestId("stock-indicator__bullet")).toBeDefined();
    expect(screen.getByTestId("stock-indicator__text")).toBeDefined();
  });

  test("shows out of stock when stock is 0", () => {
    const { rerender } = render(<StockIndicator stock={0} />);

    expect(screen.getByTestId("stock-indicator__bullet").classList.contains("bg-red-500")).toBeTruthy();
    expect(screen.getByTestId("stock-indicator__text").innerHTML).toBe(stockStatusText.outOfStock);

    rerender(<StockIndicator stock={1} />);

    expect(screen.getByTestId("stock-indicator__bullet").classList.contains("bg-red-500")).toBeFalsy();
    expect(screen.getByTestId("stock-indicator__text").innerHTML).not.toBe(stockStatusText.outOfStock);
  });

  test("shows low stock when stock is greater than 0 and lower than 10", () => {
    const { rerender } = render(<StockIndicator stock={5} />);

    expect(screen.getByTestId("stock-indicator__bullet").classList.contains("bg-yellow-500")).toBeTruthy();
    expect(screen.getByTestId("stock-indicator__text").innerHTML).toBe(stockStatusText.lowStock);

    rerender(<StockIndicator stock={14} />);

    expect(screen.getByTestId("stock-indicator__bullet").classList.contains("bg-yellow-500")).toBeFalsy();
    expect(screen.getByTestId("stock-indicator__text").innerHTML).not.toBe(stockStatusText.lowStock);
  });
  
  test("shows available when stock is greater than 10", () => {
    const { rerender } = render(<StockIndicator stock={15} />);
    
    expect(screen.getByTestId("stock-indicator__bullet").classList.contains("bg-green-500")).toBeTruthy();
    expect(screen.getByTestId("stock-indicator__text").innerHTML).toBe(stockStatusText.available);
    
    rerender(<StockIndicator stock={5} />);
    
    expect(screen.getByTestId("stock-indicator__bullet").classList.contains("bg-green-500")).toBeFalsy();
    expect(screen.getByTestId("stock-indicator__text").innerHTML).not.toBe(stockStatusText.available);
  });
});
