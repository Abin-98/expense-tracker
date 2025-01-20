import { useContext, useState } from "react";
import { ContextFile } from "../context/ContextFile";
import axios from "axios";
import Expenses from "../components/Expenses";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/reducers/authSlice";
import { themeActions } from "../store/reducers/themeSlice";

const Welcome = () => {
  const idToken = useSelector((state) => state.auth.idToken);
  const dispatch = useDispatch();
  const { navigate, emailVerified } = useContext(ContextFile);
  
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
    // setIdToken(null);
  };

  const handleVerify = () => {
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
      <section className="min-h-[5rem] bg-gradient-to-r dark:bg-gradient-to-r dark:from-neutral-900 from-white flex justify-around items-center">
        <h1 className="ml-10 text-2xl dark:text-neutral-300">
          Welcome to Expense Tracker!!
        </h1>

        <span className="flex gap-5 justify-between items-center">
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
          className="w-12 h-12 bg-neutral-900 dark:border-2 dark:hover:bg-neutral-100 hover:bg-neutral-500 dark:border-neutral-500 dark:bg-neutral-300 rounded-full text-white dark:text-black font-semibold"
        >
          {dark? "LHT":"BLK"}
        </button>}
        </span>
      </section>
      <hr className="border-[1px] w-full border-gray-400" />
      <Expenses />
    </div>
  );
};

export default Welcome;
