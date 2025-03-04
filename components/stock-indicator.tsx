import { cn } from "@/lib/utils";

type StockIndicator = {
  stock: number;
};

export const stockStatusText = {
  outOfStock: "Out of stock",
  lowStock: "Low stock",
  available: "Available",
};

const StockIndicator = ({ stock }: StockIndicator) => {
  const indicatorClassName = cn("rounded-full w-2 h-2", {
    "bg-green-500": stock > 10,
    "bg-yellow-500": stock > 0 && stock <= 10,
    "bg-red-500": stock <= 0,
  });

  const stockText = (): string => {
    if (stock <= 0) {
      return stockStatusText.outOfStock;
    }

    if (stock <= 10) {
      return stockStatusText.lowStock;
    }

    return stockStatusText.available;
  };

  return (
    <div className="flex justify-start items-center gap-1" data-testid="stock-indicator">
      <div className={indicatorClassName} data-testid="stock-indicator__bullet" />
      <span className="text-sm" data-testid="stock-indicator__text">
        {stockText()}
      </span>
    </div>
  );
};

export default StockIndicator;
