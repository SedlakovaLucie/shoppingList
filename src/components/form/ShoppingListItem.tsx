import React from "react";
import type { ShoppingList } from "../../types";

type Props = {
  list: ShoppingList;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
};

const ShoppingListItem: React.FC<Props> = ({
  list,
  onEdit,
  onDelete,
  onSelect,
}) => (
  <div
    style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0" }}
  >
    <span
      onClick={() => onSelect(list.id)}
      style={{
        textDecoration: "underline",
        color: "blue",
        cursor: "pointer",
        flex: 1,
      }}
    >
      {list.name}
    </span>
    <button type="button" onClick={() => onEdit(list.id)}>
      Upravit
    </button>
    <button type="button" onClick={() => onDelete(list.id)}>
      Smazat
    </button>
  </div>
);

export default ShoppingListItem;
