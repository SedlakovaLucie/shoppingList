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
    <div className="shoppinglist-item-wrapper">
      {isEditing ? (
        <>
          <input
            className="shoppinglist-item-edit-input"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            autoFocus
          />
          <CancelButton onClick={handleCancel} />
          <SaveButton onClick={handleSave} />
        </>
      ) : (
        <>
          <span
            className="shoppinglist-item-name"
            onClick={() => onSelect(list.id)}
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" ? onSelect(list.id) : null)}
            role="button"
          >
            {list.name}
          </span>
          <div className="shoppinglist-item-actions">
            <EditButton onClick={() => setIsEditing(true)} />
            <DeleteButton onClick={() => onDelete(list.id)} />
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingListItem;
