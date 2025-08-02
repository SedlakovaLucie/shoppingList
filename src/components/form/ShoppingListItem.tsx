import React from "react";
import type { ShoppingList } from "../../types";
import EditButton from "../buttons/edit/EditButton";
import DeleteButton from "../buttons/delete/DeleteButton";
import ShoppinglistItem from "./ShoppingListItem.css"

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
    <EditButton onClick={() => onEdit(list.id)} />
    <DeleteButton onClick={() => onDelete(list.id)} />
  </div>
);

export default ShoppingListItem;
