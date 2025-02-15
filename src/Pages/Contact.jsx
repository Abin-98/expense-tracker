import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ContextFile } from "../context/ContextFile";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authActions } from "../store/reducers/authSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Contact = () => {
  const idToken = useSelector((state) => state.auth.idToken);
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.theme.darkTheme);
  const userName = useSelector((state) => state.auth.userName);
  const userProfilePic = useSelector((state) => state.auth.userProfilePic);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const { navigate, emailVerified, setEmailVerified } = useContext(ContextFile);
  const [updatedInfo, setUpdatedInfo] = useState({
    name: "",
    profilePic: "",
  });

  useEffect(() => {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDp2l3Q_JVR3OxCwJj3rguXO1Yyy_ehMKM",
        { idToken: idToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("user data", res.data?.users[0]);
        console.log("passwordHash", res.data?.users[0].passwordHash);

        setEmailVerified(res.data?.users[0].emailVerified);
        dispatch(authActions.setUserProfilePic(res.data?.users[0].photoUrl));
        setUpdatedInfo({
          name: res.data?.users[0].displayName,
          profilePic: res.data?.users[0].photoUrl,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDp2l3Q_JVR3OxCwJj3rguXO1Yyy_ehMKM",
        {
          idToken: idToken,
          displayName: updatedInfo.name,
          photoUrl: updatedInfo.profilePic,
          returnSecureToken: true,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success("Successfully updated details", { closeOnClick: true });
        if (userName !== updatedInfo.name)
          dispatch(authActions.setUserName(updatedInfo.name));
        if (userProfilePic !== updatedInfo.profilePic)
          dispatch(authActions.setUserProfilePic(updatedInfo.profilePic));
        console.log(res);
      })
      .catch((err) => {
        toast.error("Failed to Update", { closeOnClick: true });
        console.log(err);
      });
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
        toast.success("Email verification link sent!");
        setEmailVerified(data?.user?.emailVerified);
      })
      .catch((err) => {
        console.log(err);
        if (err?.code == "auth/invalid-id-token") {
          toast.error("Session expired! Please login again");
        } else if (err?.message == "auth/user-not-found") {
          toast.error("User not found! Please Sign up");
        }
        dispatch(authActions.setIdToken(null));
        // setIdToken(null);
        localStorage.clear();
        navigate("/login");
      });
  };

  return (
    <section className={`${dark && "dark"}  h-[100vh]`}>
      {" "}
      <div className="h-screen flex justify-center bg-gradient-to-r from-white to-slate-200 dark:bg-gradient-to-r dark:from-neutral-900 dark:to-slate-400">
        <div className="flex flex-col container w-[35rem] p-10 mt-10 bg-white dark:bg-slate-200 h-fit m-5 shadow-xl">
          <div className="flex flex-col items-center justify-center py-5">
            <h1 className="text-3xl font-semibold mb-4">Your Account</h1>
            {userProfilePic ? (
              <img
                src={userProfilePic}
                alt="profile pic"
                className="rounded-full w-20 h-20"
                referrerPolicy="no-referrer"
              />
            ) : (
              <AccountCircleIcon
                className="text-blue-900"
                style={{ fontSize: 90 }}
              />
            )}
          </div>
          <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 items-start mb-4">
              <label className="text-md font-semibold">Name</label>
              <input
                className="w-full border-2 p-2"
                type="text"
                placeholder="Full Name"
                value={updatedInfo.name}
                onChange={(e) =>
                  setUpdatedInfo({ ...updatedInfo, name: e.target.value })
                }
                required
              />
            </div>
            <div className="flex flex-col gap-1 items-start mb-4">
              <label className="text-md">Email</label>
              <span className="w-full border-2 p-2 dark:bg-white">
                {userEmail}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start">
              <label className="text-md font-semibold">Profile Pic Url</label>
              <input
                className="w-full border-2 p-2"
                type="text"
                placeholder="Profile Pic"
                value={updatedInfo.profilePic}
                onChange={(e) =>
                  setUpdatedInfo({ ...updatedInfo, profilePic: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="text-white bg-yellow-800 p-2 mt-6 hover:bg-yellow-950"
            >
              Update
            </button>
          </form>
          <button
            onClick={handleVerify}
            className="bg-blue-600 px-4 py-2 my-2 text-white block hover:bg-blue-800"
          >
            Verify Email
          </button>
          {emailVerified ? (
            <span>
              {"Account Verified "}{" "}
              <CheckCircleOutlineIcon className="text-green-500" />
            </span>
          ) : (
            <span>
              {"Your Account is Not Verified! "}
              <CancelIcon className="text-red-500" />
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
