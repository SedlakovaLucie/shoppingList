import React, { useState } from "react";
import { ITEM_UNITS } from "../../types";
import type { ShoppingListItem } from "../../types";
import { v4 as uuidv4 } from "uuid";
import "./ShoppingListForm.css";

type Props = {
  existingNames: string[];
  onCreate: (name: string, desc: string, items: ShoppingListItem[]) => void;
};

const emptyRow = (): ShoppingListItem => ({
  id: uuidv4(),
  name: "",
  count: 1,
  unit: ITEM_UNITS[0],
});

const ShoppingListForm: React.FC<Props> = ({ existingNames, onCreate }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [rows, setRows] = useState<ShoppingListItem[]>([emptyRow()]);
  const [errorName, setErrorName] = useState<string | null>(null);
  const [errorItems, setErrorItems] = useState<boolean>(false);

  const addRow = () => setRows([...rows, emptyRow()]);
  const removeRow = (id: string) => setRows(rows.filter((r) => r.id !== id));
  const updateRow = (
    id: string,
    field: keyof ShoppingListItem,
    value: string | number
  ) => {
    setRows((rows) =>
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleCreateList = () => {
    let hasError = false;

    if (!name.trim()) {
      setErrorName("Zadej název seznamu.");
      hasError = true;
    } else if (existingNames.includes(name.trim())) {
      setErrorName("Seznam s tímto názvem už existuje.");
      hasError = true;
    } else {
      setErrorName(null);
    }

    const filled = rows
      .filter((r) => r.name.trim())
      .reduce<ShoppingListItem[]>((acc, item) => {
        if (
          !acc.some(
            (i) =>
              i.name.trim().toLowerCase() === item.name.trim().toLowerCase()
          )
        ) {
          acc.push(item);
        }
        return acc;
      }, []);

    if (filled.length === 0) {
      setErrorItems(true);
      hasError = true;
    } else {
      setErrorItems(false);
    }

    if (hasError) return;

    onCreate(name.trim(), desc.trim(), filled);
    setName("");
    setDesc("");
    setRows([emptyRow()]);
    setErrorName(null);
    setErrorItems(false);
  };

  return (
    <div className="shoppinglist-form-outer">
      <h2>Vytvořit nákupní seznam</h2>
      <div
        className="shoppinglist-form-row"
        style={{ flexDirection: "column", alignItems: "flex-start" }}
      >
        <input
          className={`shoppinglist-input${
            errorName ? " shoppinglist-error-input" : ""
          }`}
          placeholder="Název seznamu"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrorName(null);
          }}
        />
        {errorName && <div className="shoppinglist-error">{errorName}</div>}
      </div>
      <div
        className="shoppinglist-form-row"
        style={{ flexDirection: "column", alignItems: "flex-start" }}
      >
        <div className="shoppinglist-items-block">
          {rows.map((row, idx) => (
            <div className="shoppinglist-item-row" key={row.id}>
              <input
                className={`shoppinglist-input${
                  errorItems ? " shoppinglist-error-input" : ""
                }`}
                placeholder="Název položky"
                value={row.name}
                onChange={(e) => {
                  updateRow(row.id, "name", e.target.value);
                  setErrorItems(false);
                }}
              />
              <input
                className="shoppinglist-count"
                type="number"
                min={1}
                value={row.count}
                onChange={(e) =>
                  updateRow(row.id, "count", Number(e.target.value))
                }
              />
              <select
                className="shoppinglist-unit"
                value={row.unit}
                onChange={(e) => updateRow(row.id, "unit", e.target.value)}
              >
                {ITEM_UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              {rows.length > 1 && (
                <button
                  type="button"
                  className="shoppinglist-delete"
                  onClick={() => removeRow(row.id)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        {errorItems && (
          <div className="shoppinglist-error">Přidej aspoň jednu položku.</div>
        )}
        <button type="button" className="shoppinglist-additem" onClick={addRow}>
          Přidat další položku
        </button>
      </div>
      <div className="shoppinglist-actions">
        <button
          type="button"
          className="shoppinglist-submit"
          onClick={handleCreateList}
        >
          Vytvořit seznam
        </button>
      </div>
    </div>
  );
};

export default ShoppingListForm;
