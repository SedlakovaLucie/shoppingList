
export const ITEM_UNITS = [
  "ks",      
  "g",       
  "kg",      
  "ml",      
  "l",       
];

export type ShoppingListItem = {
  id: string;
  name: string;
  count: number;
  unit: string;
};

export type ShoppingList = {
  id: string;
  name: string;
  items: ShoppingListItem[];
};
