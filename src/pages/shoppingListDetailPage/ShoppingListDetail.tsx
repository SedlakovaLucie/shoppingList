import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadShoppingLists, saveShoppingLists } from "../../utils/localStorage";
import type { ShoppingList, ShoppingListItem } from "../../types";
import SaveButton from "../../components/buttons/save/SaveButton";
import CancelButton from "../../components/buttons/cancel/CancelButton";
import PlusButton from "../../components/buttons/plus/PlusButton";
import EditableItemsList from "../../components/list/EditableItemsList";
import { ITEM_UNITS } from "../../types";
import { IoArrowBackCircle } from "react-icons/io5";

const emptyNewItem = (): ShoppingListItem => ({
  id: "",
  name: "",
  count: 1,
  unit: ITEM_UNITS[0],
});

const ShoppingListDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState<ShoppingList | null>(null);
  const [allLists, setAllLists] = useState<ShoppingList[]>([]);
  const [newItem, setNewItem] = useState<ShoppingListItem | null>(null);

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editItemData, setEditItemData] = useState<ShoppingListItem | null>(
    null
  );

  useEffect(() => {
    const loadedLists = loadShoppingLists();
    setAllLists(loadedLists);
    const found = loadedLists.find((l) => l.id === id);
    setList(found ?? null);
  }, [id]);

  const updateList = (newList: ShoppingList) => {
    const newLists = allLists.map((l) => (l.id === newList.id ? newList : l));
    saveShoppingLists(newLists);
    setAllLists(newLists);
    setList(newList);
  };

  // Přidat novou položku
  const handleAddItem = () => {
    if (!newItem || !newItem.name.trim()) return;
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
    setNewItem(null);
  };

  // Editace položky
  const handleEditItem = (item: ShoppingListItem) => {
    setEditingItemId(item.id);
    setEditItemData({ ...item });
  };

  const handleChangeEditItem = (item: ShoppingListItem) => {
    setEditItemData(item);
  };

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

  const handleCancelEditItem = () => {
    setEditingItemId(null);
    setEditItemData(null);
  };

  const handleDeleteItem = (itemId: string) => {
    if (!list) return;
    const updatedList = {
      ...list,
      items: list.items.filter((i) => i.id !== itemId),
    };
    updateList(updatedList);
  };

  const handleCancelNewItem = () => {
    setNewItem(null);
  };

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
        <IoArrowBackCircle size={42} style={{ cursor: "pointer" }} />
      </button>
      <h2 className="shoppinglist-title">{list.name}</h2>
      {list.items.length === 0 && <div>Žádné položky</div>}

      <EditableItemsList
        items={list.items}
        editingItemId={editingItemId}
        editItemData={editItemData}
        onEditItem={handleEditItem}
        onChangeEditItem={handleChangeEditItem}
        onSaveEditItem={handleSaveEditItem}
        onCancelEditItem={handleCancelEditItem}
        onDeleteItem={handleDeleteItem}
      />

      <div style={{ marginTop: 32 }}>
        {/* Přidat novou položku */}
        {newItem ? (
          <div
            className="shoppinglist-item-row"
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <input
              className="shoppinglist-input"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              placeholder="Název položky"
              style={{ width: 220 }}
              autoFocus
            />
            <input
              className="shoppinglist-count"
              type="number"
              min={1}
              value={newItem.count}
              onChange={(e) =>
                setNewItem({ ...newItem, count: Number(e.target.value) })
              }
              style={{ width: 70 }}
            />
            <select
              className="shoppinglist-unit"
              value={newItem.unit}
              onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
              style={{ width: 90 }}
            >
              {ITEM_UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            <SaveButton onClick={handleAddItem} />
            <CancelButton onClick={handleCancelNewItem} />
          </div>
        ) : (
          <div className="shoppinglist-add-row">
            <PlusButton onClick={() => setNewItem(emptyNewItem())} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingListDetail;
