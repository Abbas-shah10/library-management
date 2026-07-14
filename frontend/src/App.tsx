import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./_auth/Login";
import Register from "./_auth/Register";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { Profile, Home } from "./_root/pages/index";
import Books from "./_root/pages/Books";
import Dashboard from "./_root/pages/admin/Dashboard";
import Users from "./_root/pages/admin/Users";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </Route>

        {/*  public routes*/}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<RootLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
