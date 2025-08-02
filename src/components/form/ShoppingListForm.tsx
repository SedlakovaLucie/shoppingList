import React, { useState } from "react";
import { ITEM_UNITS } from "../../types";
import type { ShoppingListItem } from "../../types";
import { v4 as uuidv4 } from "uuid";
import PlusButton from "../buttons/plus/PlusButton";
import DeleteButton from "../buttons/delete/DeleteButton";
import "./ShoppingListForm.css";
import logo from "../../assets/seznam_s_logo.svg";

type Props = {
  existingNames: string[];
  onCreate: (name: string, items: ShoppingListItem[]) => void;
};

const emptyRow = (): ShoppingListItem => ({
  id: uuidv4(),
  name: "",
  count: 1,
  unit: ITEM_UNITS[0],
});

const ShoppingListForm: React.FC<Props> = ({ existingNames, onCreate }) => {
  const [name, setName] = useState("");
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
      setErrorName("Zadej název seznamu");
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

    onCreate(name.trim(), filled);
    setName("");
    setRows([emptyRow()]);
    setErrorName(null);
    setErrorItems(false);
  };

  return (
    <div className="shoppinglist-center-wrapper">
      <form
        className="shoppinglist-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateList();
        }}
        autoComplete="off"
      >
        <h2 className="shoppinglist-title">
          Vytvořit nákupní{" "}
          <span className="shoppinglist-title-seznam">
            <img src={logo} alt="S" className="seznam-logo-inline" />
            eznam
          </span>
        </h2>

        <div className="shoppinglist-form-row">
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
        <div className="shoppinglist-form-row">
          <div className="shoppinglist-items-block">
            {rows.map((row) => (
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
                  <DeleteButton onClick={() => removeRow(row.id)} />
                )}
              </div>
            ))}
          </div>
          {errorItems && (
            <div className="shoppinglist-error">
              Přidej alespoň jednu položku
            </div>
          )}
          <div className="shoppinglist-add-row">
            <PlusButton onClick={addRow} />
          </div>
        </div>
        <div>
          <button type="submit" className="shoppinglist-submit">
            Vytvořit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShoppingListForm;
