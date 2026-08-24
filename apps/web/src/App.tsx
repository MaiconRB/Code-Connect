import { useState } from "react";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";

function App() {
  const [currentPage, setCurrentPage] = useState<"login" | "register">("login");

  if (currentPage === "register") {
    return <RegisterPage onLoginNavigate={() => setCurrentPage("login")} />;
  }

  return <LoginPage onRegisterNavigate={() => setCurrentPage("register")} />;
}

export default App;

