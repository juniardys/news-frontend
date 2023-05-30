import { Route, Routes } from "react-router-dom";
import HomePage from "@/features/home/homePage";
import LoginPage from "@/features/auth/loginPage";
import PreferencesPage from "./features/preference/preferencesPage";
import RegisterPage from "@/features/auth/registerPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/preferences" element={<PreferencesPage/>}/>
    </Routes>
  )
}

export default App;
