import React from "react";
import SaveButton from "../buttons/save/SaveButton";
import CancelButton from "../buttons/cancel/CancelButton";
import DeleteButton from "../buttons/delete/DeleteButton";
import EditButton from "../buttons/edit/EditButton";
import type { ShoppingListItem } from "../../types";
import { ITEM_UNITS } from "../../types";
import "./EditableItemsList.css";

type Props = {
  items: ShoppingListItem[];
  editingItemId: string | null;
  editItemData: ShoppingListItem | null;
  onEditItem: (item: ShoppingListItem) => void;
  onChangeEditItem: (item: ShoppingListItem) => void;
  onSaveEditItem: () => void;
  onCancelEditItem: () => void;
  onDeleteItem: (itemId: string) => void;
};

const EditableItemsList: React.FC<Props> = ({
  items,
  editingItemId,
  editItemData,
  onEditItem,
  onChangeEditItem,
  onSaveEditItem,
  onCancelEditItem,
  onDeleteItem,
}) => (
  <ul className="editable-items-list">
    {items.map((item) =>
      editingItemId === item.id && editItemData ? (
        <li key={item.id} className="editable-item-wrapper editing">
          <input
            className="editable-item-edit-input"
            value={editItemData.name}
            onChange={(e) =>
              onChangeEditItem({ ...editItemData, name: e.target.value })
            }
            placeholder="Název"
            autoFocus
          />
          <input
            className="editable-item-count"
            type="number"
            min={1}
            value={editItemData.count}
            onChange={(e) =>
              onChangeEditItem({
                ...editItemData,
                count: Number(e.target.value),
              })
            }
          />
          <select
            className="editable-item-unit"
            value={editItemData.unit}
            onChange={(e) =>
              onChangeEditItem({ ...editItemData, unit: e.target.value })
            }
          >
            {ITEM_UNITS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <div className="editable-item-actions">
            <CancelButton
              onClick={onCancelEditItem}
              className="editable-item-action"
            />
            <SaveButton
              onClick={onSaveEditItem}
              className="editable-item-action"
            />
          </div>
        </li>
      ) : (
        <li key={item.id} className="editable-item-wrapper">
          <span className="editable-item-name">{item.name}</span>
          <span className="editable-item-count">{item.count}</span>
          <span className="editable-item-unit">{item.unit}</span>
          <div className="editable-item-actions">
            <EditButton
              onClick={() => onEditItem(item)}
              className="editable-item-action"
            />
            <DeleteButton
              onClick={() => onDeleteItem(item.id)}
              className="editable-item-action"
            />
          </div>
        </li>
      )
    )}
  </ul>
);

export default EditableItemsList;
