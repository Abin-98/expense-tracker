/* eslint-disable no-extra-boolean-cast */
import Signup from "./Pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import Contact from "./Pages/Contact";
import ForgotPassword from "./Pages/ForgotPassword";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./components/NavBar";
import Expenses from "./components/Expenses";
import Category from "./Pages/Category";

function App() {
  const idToken = useSelector((state) => state.auth.idToken);

  return (
    <>
    <ToastContainer/>
    {!!idToken && <NavBar/>}
      <Routes>
        <Route
          path="/"
          element={!!idToken ? <Expenses /> : <Navigate to={"/login"} replace />}
        />
        <Route path="/login" element={<Signup />} />
        <Route
          path="/contact"
          element={!!idToken ? <Contact /> : <Navigate to={"/login"} replace />}
        />
        <Route
          path="/category"
          element={!!idToken ? <Category /> : <Navigate to={"/login"} replace />}
        />
        <Route
          path="*"
          element={!!idToken ? <Navigate to={"/"} replace /> : <Signup />}
        />
        <Route
          path="/forgotpass"
          element={!!idToken ? <Navigate to={"/"} replace/> : <ForgotPassword />}
        />
        <Route path="/forgotpass" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
