import { cn } from "@/lib/utils";

type StockIndicator = {
  stock: number;
};

const StockIndicator = ({ stock }: StockIndicator) => {
  const indicatorClassName = cn("rounded-full w-2 h-2", {
    "bg-green-500": stock > 10,
    "bg-yellow-500": stock > 0 && stock <= 10,
    "bg-red-500": stock <= 0,
  });

  const stockText = (): string => {
    if (stock <= 0) {
      return "Out of stock";
    }

    if (stock <= 10) {
      return "Low stock";
    }

    return "Availbale";
  };

  return (
    <div className="flex justify-start items-center gap-1">
      <div className={indicatorClassName} />
      <span className="text-sm">{stockText()}</span>
    </div>
  );
};

export default StockIndicator;
