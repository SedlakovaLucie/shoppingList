import React, { useState } from "react";
import type { ShoppingList } from "../../types";
import EditButton from "../buttons/edit/EditButton";
import DeleteButton from "../buttons/delete/DeleteButton";
import SaveButton from "../buttons/save/SaveButton";
import CancelButton from "../buttons/cancel/CancelButton";
import "./ShoppingListItem.css";

type Props = {
  list: ShoppingList;
  onEdit: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
};

const ShoppingListItem: React.FC<Props> = ({
  list,
  onEdit,
  onDelete,
  onSelect,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(list.name);

  const handleSave = () => {
    if (editName.trim() && editName.trim() !== list.name) {
      onEdit(list.id, editName.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(list.name);
    setIsEditing(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0" }}>
      {isEditing ? (
        <>
          <input
            value={editName}
            onChange={e => setEditName(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            autoFocus
            style={{
              flex: 1,
              fontSize: "1em",
              marginRight: 8,
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />
          <CancelButton onClick={handleCancel} />
          <SaveButton onClick={handleSave} />
        </>
      ) : (
        <>
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
          <EditButton onClick={() => setIsEditing(true)} />
          <DeleteButton onClick={() => onDelete(list.id)} />
        </>
      )}
    </div>
  );
};

export default ShoppingListItem;
