import React, { useState } from "react";
import SaveButton from "../buttons/save/SaveButton";
import CancelButton from "../buttons/cancel/CancelButton";
import PlusButton from "../buttons/plus/PlusButton";
import { ITEM_UNITS } from "../../types";
import type { ShoppingListItem } from "../../types";
import "./AddNewItem.css";

const emptyNewItem = (): ShoppingListItem => ({
  id: "",
  name: "",
  count: 1,
  unit: ITEM_UNITS[0],
});

type Props = {
  existingNames: string[];
  onAdd: (item: ShoppingListItem) => void;
};

const AddNewItem: React.FC<Props> = ({ existingNames, onAdd }) => {
  const [newItem, setNewItem] = useState<ShoppingListItem | null>(null);

  const handleAdd = () => {
    if (!newItem || !newItem.name.trim()) return;
    if (
      existingNames.some(
        (name) => name.toLowerCase() === newItem.name.trim().toLowerCase()
      )
    )
      return;
    onAdd({
      ...newItem,
      id: Date.now().toString(),
      name: newItem.name.trim(),
    });
    setNewItem(null);
  };

  if (!newItem)
    return (
      <div className="addnewitem-add-row">
        <PlusButton onClick={() => setNewItem(emptyNewItem())} />
      </div>
    );

  return (
    <div className="addnewitem-row-outer">
      <div className="addnewitem-row-inputs">
        <input
          className="addnewitem-input"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Název položky"
          autoFocus
        />
        <input
          className="addnewitem-count"
          type="number"
          min={1}
          value={newItem.count}
          onChange={(e) =>
            setNewItem({ ...newItem, count: Number(e.target.value) })
          }
        />
        <select
          className="addnewitem-unit"
          value={newItem.unit}
          onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
        >
          {ITEM_UNITS.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>
      <div className="addnewitem-row-buttons">
        <SaveButton onClick={handleAdd} />
        <CancelButton onClick={() => setNewItem(null)} />
      </div>
    </div>
  );
};

export default AddNewItem;
