import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./_auth/Login";
import Register from "./_auth/Register";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import Profile from "./_root/pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-register" element={<Register />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
