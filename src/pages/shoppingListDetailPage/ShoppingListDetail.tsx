import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadShoppingLists, saveShoppingLists } from "../../utils/localStorage";
import type { ShoppingList, ShoppingListItem } from "../../types";
import EditableItemsList from "../../components/list/EditableItemsList";
import { IoArrowBackCircle } from "react-icons/io5";
import AddNewItem from "../../components/list/AddNewItem";

const ShoppingListDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [list, setList] = useState<ShoppingList | null>(null);
  const [allLists, setAllLists] = useState<ShoppingList[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editItemData, setEditItemData] = useState<ShoppingListItem | null>(
    null
  );

  // načtení seznamu podle URL parametru
  useEffect(() => {
    const loadedLists = loadShoppingLists();
    setAllLists(loadedLists);
    const found = loadedLists.find((l) => l.id === id);
    setList(found ?? null);
  }, [id]);

  // aktualizace seznamu v localStorage i ve state
  const updateList = (newList: ShoppingList) => {
    const newLists = allLists.map((l) => (l.id === newList.id ? newList : l));
    saveShoppingLists(newLists);
    setAllLists(newLists);
    setList(newList);
  };

  // editace položky
  const handleEditItem = (item: ShoppingListItem) => {
    setEditingItemId(item.id);
    setEditItemData({ ...item });
  };
  const handleChangeEditItem = (item: ShoppingListItem) =>
    setEditItemData(item);

  // uložení změn položky
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

  // zrušení editace
  const handleCancelEditItem = () => {
    setEditingItemId(null);
    setEditItemData(null);
  };

  // smazání položky
  const handleDeleteItem = (itemId: string) => {
    if (!list) return;
    const updatedList = {
      ...list,
      items: list.items.filter((i) => i.id !== itemId),
    };
    updateList(updatedList);
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
        <IoArrowBackCircle size={42} style={{ cursor: "pointer" }} />
      </button>
      <h2 className="shoppinglist-title">{list.name}</h2>
      {list.items.length === 0 && <div>Žádné položky</div>}

      {/* Editace a mazání položek */}
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

      {/* Přidání nové položky */}
      <div style={{ marginTop: 32 }}>
        <AddNewItem
          existingNames={list.items.map((i) => i.name)}
          onAdd={(item) => {
            const updatedList = {
              ...list,
              items: [...list.items, item],
            };
            updateList(updatedList);
          }}
        />
      </div>
    </div>
  );
};

export default ShoppingListDetail;
