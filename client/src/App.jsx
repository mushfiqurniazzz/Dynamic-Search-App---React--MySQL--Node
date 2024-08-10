import { Toaster } from "sonner";
import AddUserPage from "./pages/AddUserPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster duration={2000} position="top-center" richColors closeButton />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/adduser" element={<AddUserPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;