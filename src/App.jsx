/* eslint-disable no-extra-boolean-cast */
import Welcome from "./Pages/Welcome";
import Signup from "./Pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import Contact from "./Pages/Contact";
import ForgotPassword from "./Pages/ForgotPassword";
import { useSelector } from "react-redux";


function App() {
  const idToken = useSelector((state) => state.auth.idToken);
  // const dispatch = useDispatch()
  // const {isLoggedIn} = useContext(ContextFile)

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!!idToken ? <Welcome /> : <Navigate to={"/login"} replace />}
        />
        <Route path="/login" element={<Signup />} />
        <Route
          path="/contact"
          element={!!idToken ? <Contact /> : <Navigate to={"/login"} replace />}
        />
        <Route
          path="*"
          element={!!idToken ? <Navigate to={"/"} replace /> : <Signup />}
        />
        <Route path="/forgotpass" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
