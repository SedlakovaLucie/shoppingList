import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingListForm from "../../components/form/ShoppingListForm";
import ShoppingListItem from "../../components/form/ShoppingListItem";
import { loadShoppingLists, saveShoppingLists } from "../../utils/localStorage";
import type { ShoppingList, ShoppingListItem as ItemType } from "../../types";

const ShoppingListPage: React.FC = () => {
  // Načtení seznamů z localStorage
  const [lists, setLists] = useState<ShoppingList[]>(loadShoppingLists());
  const navigate = useNavigate();

  // Vytvoření nového seznamu
  const handleCreate = (name: string, desc: string, items: ItemType[]) => {
    const newList: ShoppingList = {
      id: Date.now().toString(),
      name,
      items,
    };
    const newLists = [...lists, newList];
    setLists(newLists);
    saveShoppingLists(newLists);
  };

  // Smazání seznamu
  const handleDelete = (id: string) => {
    const newLists = lists.filter((l) => l.id !== id);
    setLists(newLists);
    saveShoppingLists(newLists);
  };

  // Editace názvu seznamu
  const handleEdit = (id: string, newName: string) => {
    const newLists = lists.map((list) =>
      list.id === id ? { ...list, name: newName } : list
    );
    setLists(newLists);
    saveShoppingLists(newLists);
  };

  // Proklik na detail seznamu
  const handleSelect = (id: string) => {
    navigate(`/list/${id}`);
  };

  return (
    <div>
      <ShoppingListForm
        existingNames={lists.map((l) => l.name)}
        onCreate={handleCreate}
      />
      <h2>Nákupní Seznamy</h2>
      {lists.length === 0 ? (
        <p>Žádné seznamy</p>
      ) : (
        lists.map((list) => (
          <ShoppingListItem
            key={list.id}
            list={list}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSelect={handleSelect}
          />
        ))
      )}
    </div>
  );
};

export default ShoppingListPage;
