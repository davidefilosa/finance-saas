import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

type Props = {
  id: string;
  category: string | null;
  categoryId: string | null;
};

export const CategoryColumn = ({ id, category, categoryId }: Props) => {
  const { onOpen } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();
  const onClick = () => {
    if (!categoryId) {
      onOpenTransaction(id);
    } else {
      onOpen(categoryId);
    }
  };
  return (
    <div
      className={cn(
        "flex items-center hover:underline cursor-pointer",
        !category && "text-rose-500"
      )}
      onClick={onClick}
    >
      {!category && <TriangleAlert className="size-4 mr-2 shrink-0" />}
      {category || "Uncategorized"}
    </div>
  );
};
