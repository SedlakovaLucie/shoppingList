import type { ShoppingList } from "../types/index";

const STORAGE_KEY = "shoppingLists";

export const loadShoppingLists = (): ShoppingList[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveShoppingLists = (lists: ShoppingList[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
};