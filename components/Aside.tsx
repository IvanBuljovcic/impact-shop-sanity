import { cn } from "@/lib/utils";
import { Category } from "@/sanity.types";
import Link from "next/link";

type AsideProps = {
  className?: string;
  categories: Category[];
};

const Aside = ({ className, categories }: AsideProps) => {
  const asideClass = cn("col-span-2 flex flex-col p-4", className);

  return (
    <aside className={asideClass}>
      {categories?.map((cat) => (
        <Link key={cat._id} className="pt-2 pb-2" href={`/categories/${cat.slug?.current}`}>
          {cat.title}
        </Link>
      ))}
    </aside>
  );
};


export default Aside;
