import { useContext, useState } from "react";
import { ContextFile } from "../context/ContextFile";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/reducers/authSlice";
import { themeActions } from "../store/reducers/themeSlice";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Tooltip from "@mui/material/Tooltip";
import CategoryIcon from "@mui/icons-material/Category";

const NavBar = () => {
  const userName = useSelector((state) => state.auth.userName);
  const userProfilePic = useSelector((state) => state.auth.userProfilePic);
  const dispatch = useDispatch();
  const { navigate } = useContext(ContextFile);
  const [visible, setVisible] = useState(false);
  const activated = useSelector((state) => state.theme.activated);

  const dark = useSelector((state) => state.theme.darkTheme);

  const handleMode = () => {
    dispatch(themeActions.toggleDarkTheme());
  };

  const handleUserDetails = () => {
    setVisible(false);
    navigate("/contact");
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(authActions.setIdToken(null));
    setVisible(false);
    dispatch(themeActions.setActivate(false));
    dispatch(themeActions.setDarkTheme(false));
    // setIdToken(null);
  };

  return (
    <div className={`bg-neutral-100 dark:bg-neutral-700 ${dark && "dark"}`}>
      <section className="min-h-[5rem] bg-gradient-to-r from-white to-slate-200 dark:bg-gradient-to-r dark:from-neutral-900 dark:to-slate-400  flex flex-wrap justify-around items-center border-b-[1px] border-slate-600 dark:border-slate-200">
        <h1 className="ml-10 text-3xl flex font-semibold text-green-800 dark:text-green-400">
          <span>Welcome {userName && userName}!</span>
        </h1>

        <span className="hidden sm:flex gap-5 justify-between items-center mr-10">
          <NavLink className="p-4 block" to="/">
            <Tooltip title="Home" arrow>
              <HomeIcon
                fontSize="large"
                className="text-black hover:border-2 rounded-full dark:text-white border-black"
              />
            </Tooltip>
          </NavLink>

          <NavLink className="p-4 block" to="/category">
            <Tooltip title="Category" arrow>
              <CategoryIcon
                fontSize="large"
                className="text-black hover:border-2 rounded-full dark:text-white border-black"
              />
            </Tooltip>
          </NavLink>

          <button onClick={handleUserDetails} className="p-4 block">
            <Tooltip title="Account Details" arrow>
              {userProfilePic ? (
                  <img src={userProfilePic} alt="profile pic" className="rounded-full w-8 h-8 hover:scale-110"/>
              ) : (
                <AccountCircleIcon
                  fontSize="large"
                  className="text-black hover:border-2 rounded-full dark:text-white border-black"
                />
              )}
            </Tooltip>
          </button>
          <button className="p-4 block" onClick={handleLogout}>
            <Tooltip title="Logout" arrow>
              <PowerSettingsNewIcon
                fontSize="large"
                className="text-black hover:border-2 border-black rounded-full dark:text-white"
              />
            </Tooltip>
          </button>
          {activated && (
            <button
              onClick={handleMode}
              className="fixed bottom-10 right-10 w-12 h-12 bg-neutral-900 dark:border-2 dark:hover:bg-neutral-100 hover:bg-neutral-500 dark:border-neutral-500 dark:bg-neutral-300 rounded-full text-white dark:text-black font-semibold"
            >
              {dark ? "LHT" : "BLK"}
            </button>
          )}
        </span>
        <span
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer sm:hidden mr-10 ml-5"
        >
          <MenuIcon className="scale-125" />
        </span>
      </section>

      {/*Side bar*/}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col h-full text-gray-700 dark:bg-gray-800">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <span>
              <ArrowForwardIosIcon className="dark:text-white" />
            </span>
            <p className="text-lg font-semibold dark:text-white dark:border-slate-400">
              Back
            </p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border text-2xl dark:text-white text-center dark:border-slate-400"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border text-2xl dark:text-white text-center dark:border-slate-400"
            to="/category"
          >
            Category
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-3 pl-6 border text-2xl dark:text-white text-center dark:border-slate-400"
            to="/contact"
          >
            Update Details
          </NavLink>
          <button
            onClick={handleLogout}
            className="py-2 pl-6 border text-2xl dark:text-white dark:border-slate-400 "
          >
            Logout
          </button>
          {activated && (
            <div className="flex justify-end pr-10 p-5">
              <button
                onClick={handleMode}
                className="fixed bottom-10 right-10 w-12 h-12 bg-neutral-900 dark:border-2 dark:hover:bg-neutral-100 hover:bg-neutral-500 dark:border-neutral-500 dark:bg-neutral-300 rounded-full text-white dark:text-black font-semibold"
              >
                {dark ? "LHT" : "BLK"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
