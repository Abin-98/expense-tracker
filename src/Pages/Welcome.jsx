import { useContext, useState } from "react";
import { ContextFile } from "../context/ContextFile";
import axios from "axios";
import Expenses from "../components/Expenses";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/reducers/authSlice";
import { themeActions } from "../store/reducers/themeSlice";
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Welcome = () => {
  const idToken = useSelector((state) => state.auth.idToken);
  const dispatch = useDispatch();
  const { navigate, emailVerified } = useContext(ContextFile);
  const [visible, setVisible] = useState(false)
  const activated = useSelector(state=>state.theme.activated)

  const dark = useSelector((state)=>state.theme.darkTheme)

    

  const handleMode = () => {
    dispatch(themeActions.toggleTheme());
  };

  const handleClick = () => {
    navigate("/contact");
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(authActions.setIdToken(null));
    setVisible(false)
    // setIdToken(null);
  };

  const handleVerify = () => {
    setVisible(false)
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDp2l3Q_JVR3OxCwJj3rguXO1Yyy_ehMKM",
        { requestType: "VERIFY_EMAIL", idToken: idToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        alert("Email verification link sent!");
        // setEmailVerified(data?.user?.emailVerified)
      })
      .catch((err) => {
        console.log(err);
        if (err?.code == "auth/invalid-id-token") {
          alert("Session expired! Please login again");
        } else if (err?.message == "auth/user-not-found") {
          alert("User not found! Please Sign up");
        }
        dispatch(authActions.setIdToken(null));
        // setIdToken(null);
        localStorage.clear();
        navigate("/login");
      });
  };

  return (
    <div className={`bg-neutral-100 h-[100vh] dark:bg-neutral-700 ${dark && "dark"}`}>
      <section className="min-h-[5rem] bg-gradient-to-r dark:bg-gradient-to-r dark:from-neutral-900 from-white flex flex-wrap justify-between items-center">
        <h1 className="ml-10 text-2xl dark:text-neutral-300">
          Welcome
        </h1>

        <span className="hidden sm:flex gap-5 justify-between items-center mr-10">
          <div className="">
            <button
              className="bg-blue-600 px-4 py-2 text-white block hover:bg-blue-800"
              onClick={handleVerify}
            >
              Verify Email
            </button>
            {/*<h1>Verified: {String(emailVerified)}</h1>*/}
          </div>

          <span className="italic bg-stone-300 rounded-md p-2">
            Update your profile.{" "}
            <button
              onClick={handleClick}
              className="text-purple-700 underline italic"
            >
              Click here
            </button>
          </span>
          <button
            className="bg-slate-500 px-4 py-2 text-white hover:bg-slate-700 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
          {activated && <button
          onClick={handleMode}
          className="fixed bottom-10 right-10 w-12 h-12 bg-neutral-900 dark:border-2 dark:hover:bg-neutral-100 hover:bg-neutral-500 dark:border-neutral-500 dark:bg-neutral-300 rounded-full text-white dark:text-black font-semibold"
        >
          {dark? "LHT" : "BLK"}
        </button>}
        </span>
        <span
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer sm:hidden mr-10 ml-5"
        ><MenuIcon className="scale-125"/>
      </span>
      </section>

        {/*Side bar*/}
        <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-700 dark:bg-gray-800">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <span><ArrowForwardIosIcon className="dark:text-white"/></span>
            <p className="text-lg font-semibold dark:text-white dark:border-slate-400">Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border dark:text-white dark:border-slate-400 font-semibold"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={handleVerify}
            className="py-2 pl-6 border dark:text-white dark:border-slate-400 font-semibold"
          >
            Verify Email
          </NavLink>
          <div
            onClick={() => setVisible(false)} 
            className="py-2 pl-6 border dark:text-white dark:border-slate-400 font-semibold"
            to="/contact"
          >
            Update Details
          </div>
          <div
            onClick={handleLogout}
            className="py-2 pl-6 border dark:text-white dark:border-slate-400 font-semibold"
          >
            Logout
          </div>
          {activated && <div className="flex justify-end pr-10 p-5"><button
          onClick={handleMode}
          className="w-12 h-12 bg-neutral-900 dark:border-2 dark:hover:bg-neutral-100 hover:bg-neutral-500 dark:border-neutral-500 dark:bg-neutral-300 rounded-full text-white dark:text-black font-semibold"
        >
          {dark? "LHT":"BLK"}
        </button></div>}
        </div>
      </div>
      <hr className="border-[1px] w-full border-gray-400" />
      <Expenses />
    </div>
  );
};

export default Welcome;
