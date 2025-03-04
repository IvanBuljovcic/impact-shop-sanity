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
  const numericStock = Number(stock);
  
  const indicatorClassName = cn("rounded-full w-2 h-2", {
    "bg-success": numericStock > 10,
    "bg-warning": numericStock > 0 && numericStock <= 10,
    "bg-error": numericStock <= 0,
  });

  const stockText = (): string => {
    if (numericStock <= 0) {
      return stockStatusText.outOfStock;
    }

    if (numericStock <= 10) {
      return stockStatusText.lowStock;
    }

    return stockStatusText.available;
  };

  if (Number.isNaN(numericStock)) {
    return <></>
  }

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
