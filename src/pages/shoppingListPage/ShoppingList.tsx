import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingListForm from "../../components/form/ShoppingListForm";
import ShoppingListItem from "../../components/form/ShoppingListItem";
import { loadShoppingLists, saveShoppingLists } from "../../utils/localStorage";
import type { ShoppingList, ShoppingListItem as ItemType } from "../../types";
import type { DragEndEvent } from "@dnd-kit/core";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const ShoppingListPage: React.FC = () => {
  const [lists, setLists] = useState<ShoppingList[]>(loadShoppingLists());
  const navigate = useNavigate();

  // Vytvoření nového seznamu
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

  // Proklik na detail
  const handleSelect = (id: string) => {
    navigate(`/detail/${id}`);
  };

  // Drag and drop
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = lists.findIndex((l) => l.id === active.id);
    const newIndex = lists.findIndex((l) => l.id === over.id);
    const newLists = arrayMove(lists, oldIndex, newIndex);
    setLists(newLists);
    saveShoppingLists(newLists);
  };

  return (
    <div>
      <ShoppingListForm
        existingNames={lists.map((l) => l.name)}
        onCreate={handleCreate}
      />
      <div className="shoppinglist-center-wrapper">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={lists.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="shoppinglist-list-wrapper">
              {lists.length === 0 ? (
                <p>Zatím tu nejsou žádné nákupní seznamy</p>
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
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default ShoppingListPage;
