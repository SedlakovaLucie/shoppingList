import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingListForm from "../../components/form/ShoppingListForm";
import ShoppingListItem from "../../components/form/ShoppingListItem";
import { loadShoppingLists, saveShoppingLists } from "../../utils/localStorage";
import type { ShoppingList, ShoppingListItem as ItemType } from "../../types";

const ShoppingListPage: React.FC = () => {
  const [lists, setLists] = useState<ShoppingList[]>(loadShoppingLists());
  const navigate = useNavigate();

  const handleCreate = (name: string, items: ItemType[]) => {
    const newList: ShoppingList = {
      id: Date.now().toString(),
      name,
      items,
    };
    const newLists = [...lists, newList];
    setLists(newLists);
    saveShoppingLists(newLists);
  };

  const handleDelete = (id: string) => {
    const newLists = lists.filter(l => l.id !== id);
    setLists(newLists);
    saveShoppingLists(newLists);
  };

  // Edit (pro jednoduchost otevřeme stejný formulář s předvyplněnými hodnotami - můžeš rozšířit později)
  const handleEdit = (id: string) => {
    alert("Editace názvu bude implementována později."); // nebo otevři modal/form
  };

  const handleSelect = (id: string) => {
    navigate(`/list/${id}`);
  };

  return (
    <div>
      <h2>Nákupní seznamy</h2>
      <ShoppingListForm
        existingNames={lists.map(l => l.name)}
        onCreate={handleCreate}
      />
      <h3>Všechny seznamy</h3>
      {lists.length === 0 ? (
        <p>Žádné seznamy</p>
      ) : (
        lists.map(list => (
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
