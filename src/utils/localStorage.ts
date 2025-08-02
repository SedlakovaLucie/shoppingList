import type { ShoppingList } from "../types/index";

const STORAGE_KEY = "shoppingLists";

export function loadShoppingLists(): ShoppingList[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveShoppingLists(lists: ShoppingList[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
}