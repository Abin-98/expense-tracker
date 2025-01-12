import { useContext } from "react";
import { ContextFile } from "../context/ContextFile";
import axios from "axios";

const Welcome = () => {
  const { navigate, setIdToken, idToken, emailVerified } =
    useContext(ContextFile);
  const handleClick = () => {
    navigate("/contact");
  };

  const handleLogout = () => {
    localStorage.clear();
    setIdToken(null);
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
        if (
          err?.code == "auth/invalid-id-token"
        ) {
          alert("Session expired! Please login again");
        } else if (
          err?.message == "auth/user-not-found"
        ) {
          alert("User not found! Please Sign up");
        }
        setIdToken(null);
        localStorage.clear();
        navigate("/login");
      });
  };

  return (
    <div>
      <section className="h-[5rem] bg-white flex justify-between items-center">
        <h1 className="ml-10">Welcome to Expense Tracker!!</h1>
        <span className="flex gap-5 justify-between items-center">
          <button className="bg-slate-400 px-4 py-2" onClick={handleLogout}>
            Logout
          </button>
          <span className="italic bg-stone-300 rounded-md px-2">
            Your profile is incomplete.{" "}
            <button
              onClick={handleClick}
              className="text-purple-700 underline italic"
            >
              Complete now
            </button>
          </span>
        </span>
      </section>
      <hr />
      <div className="mt-10 flex justify-center gap-10">
        <button
          className="bg-blue-600 px-4 py-2 text-white"
          onClick={handleVerify}
        >
          Verify Email
        </button>
        <h1>Verified: {String(emailVerified)}</h1>
      </div>
    </div>
  );
};

export default Welcome;
