import React, { useState } from "react";
import type { ShoppingList } from "../../types";
import EditButton from "../buttons/edit/EditButton";
import DeleteButton from "../buttons/delete/DeleteButton";
import SaveButton from "../buttons/save/SaveButton";
import CancelButton from "../buttons/cancel/CancelButton";
import { MdDragIndicator } from "react-icons/md";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    background: isDragging ? "#f5f5f5" : undefined,
    zIndex: isDragging ? 2 : 1,
  };

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
    <div
      className="shoppinglist-item-wrapper"
      ref={setNodeRef}
      style={style}
    >
      <span
        className="shoppinglist-item-drag"
        {...attributes}
        {...listeners}
        tabIndex={-1}
        title="Přetáhnout"
      >
        <MdDragIndicator />
      </span>
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
