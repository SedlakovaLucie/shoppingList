import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadShoppingLists, saveShoppingLists } from "../../utils/localStorage";
import type { ShoppingList, ShoppingListItem } from "../../types";
import SaveButton from "../../components/buttons/save/SaveButton";
import CancelButton from "../../components/buttons/cancel/CancelButton";
import DeleteButton from "../../components/buttons/delete/DeleteButton";
import EditButton from "../../components/buttons/edit/EditButton";
import { ITEM_UNITS } from "../../types";

const ShoppingListDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState<ShoppingList | null>(null);
  const [allLists, setAllLists] = useState<ShoppingList[]>([]);
  const [newItem, setNewItem] = useState<ShoppingListItem>({
    id: "",
    name: "",
    count: 1,
    unit: ITEM_UNITS[0],
  });

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editItemData, setEditItemData] = useState<ShoppingListItem | null>(
    null
  );

  // detail seznamu podle ID z URL
  useEffect(() => {
    const loadedLists = loadShoppingLists();
    setAllLists(loadedLists);
    const found = loadedLists.find((l) => l.id === id);
    setList(found ?? null);
  }, [id]);

  // localStorage změny
  const updateList = (newList: ShoppingList) => {
    const newLists = allLists.map((l) => (l.id === newList.id ? newList : l));
    saveShoppingLists(newLists);
    setAllLists(newLists);
    setList(newList);
  };

  // add item
  const handleAddItem = () => {
    if (!newItem.name.trim()) return;
    if (
      list?.items.some(
        (i) => i.name.toLowerCase() === newItem.name.trim().toLowerCase()
      )
    )
      return;
    const item = {
      ...newItem,
      id: Date.now().toString(),
      name: newItem.name.trim(),
    };
    const updatedList = {
      ...list!,
      items: [...list!.items, item],
    };
    updateList(updatedList);
    setNewItem({ id: "", name: "", count: 1, unit: ITEM_UNITS[0] });
  };

  // delete item
  const handleDeleteItem = (itemId: string) => {
    if (!list) return;
    const updatedList = {
      ...list,
      items: list.items.filter((i) => i.id !== itemId),
    };
    updateList(updatedList);
  };

  // edit item
  const handleEditItem = (item: ShoppingListItem) => {
    setEditingItemId(item.id);
    setEditItemData({ ...item });
  };

  // save
  const handleSaveEditItem = () => {
    if (!list || !editItemData) return;
    if (!editItemData.name.trim()) return;
    if (
      list.items.some(
        (i) =>
          i.id !== editItemData.id &&
          i.name.trim().toLowerCase() === editItemData.name.trim().toLowerCase()
      )
    )
      return;
    const updatedList = {
      ...list,
      items: list.items.map((i) =>
        i.id === editItemData.id
          ? { ...editItemData, name: editItemData.name.trim() }
          : i
      ),
    };
    updateList(updatedList);
    setEditingItemId(null);
    setEditItemData(null);
  };

  // Zrušit editaci položky
  const handleCancelEditItem = () => {
    setEditingItemId(null);
    setEditItemData(null);
  };

  // zpět
  const handleBack = () => navigate("/");

  if (!list)
    return (
      <div>
        Seznam nenalezen <button onClick={handleBack}>Zpět</button>
      </div>
    );

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: 20 }}>
      <button onClick={handleBack} style={{ marginBottom: 20 }}>
        Zpět
      </button>
      <h2>{list.name}</h2>
      <h3>Položky</h3>
      {list.items.length === 0 && <div>Žádné položky</div>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {list.items.map((item) =>
          editingItemId === item.id && editItemData ? (
            <li
              key={item.id}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <input
                value={editItemData.name}
                onChange={(e) =>
                  setEditItemData({ ...editItemData, name: e.target.value })
                }
                style={{ width: 150 }}
                placeholder="Název"
                autoFocus
              />
              <input
                type="number"
                min={1}
                value={editItemData.count}
                onChange={(e) =>
                  setEditItemData({
                    ...editItemData,
                    count: Number(e.target.value),
                  })
                }
                style={{ width: 60 }}
              />
              <select
                value={editItemData.unit}
                onChange={(e) =>
                  setEditItemData({ ...editItemData, unit: e.target.value })
                }
              >
                {ITEM_UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              <SaveButton onClick={handleSaveEditItem} />
              <CancelButton onClick={handleCancelEditItem} />
            </li>
          ) : (
            <li
              key={item.id}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <span style={{ width: 150 }}>{item.name}</span>
              <span style={{ width: 60 }}>{item.count}</span>
              <span>{item.unit}</span>
              <EditButton onClick={() => handleEditItem(item)} />
              <DeleteButton onClick={() => handleDeleteItem(item.id)} />
            </li>
          )
        )}
      </ul>

      <div
        style={{ marginTop: 24, borderTop: "1px solid #eee", paddingTop: 16 }}
      >
        <h4>Přidat novou položku</h4>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Název položky"
            style={{ width: 150 }}
          />
          <input
            type="number"
            min={1}
            value={newItem.count}
            onChange={(e) =>
              setNewItem({ ...newItem, count: Number(e.target.value) })
            }
            style={{ width: 60 }}
          />
          <select
            value={newItem.unit}
            onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
          >
            {ITEM_UNITS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <SaveButton onClick={handleAddItem} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingListDetail;
