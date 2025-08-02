import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShoppingList from "./pages/shoppingListPage/ShoppingList";
import ShoppingListDetail from "./pages/shoppingListDetailPage/ShoppingListDetail";
import ErrorPage from "./pages/errorPage/ErrorPage";
import MainLayout from "./pages/layout/MainLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ShoppingList />} />
          <Route path="/list/:id" element={<ShoppingListDetail />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
