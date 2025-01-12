import { useContext, useState } from "react";
import { ContextFile } from "../context/ContextFile";

const Signup = () => {
    const {setIdToken, navigate} = useContext(ContextFile)
  const [isLogin, setIsLogin] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && userInfo.password !== confirmPass) {
      alert("Confirm password does not match! try again");
      return;
    }
    let url = "";
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDp2l3Q_JVR3OxCwJj3rguXO1Yyy_ehMKM";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDp2l3Q_JVR3OxCwJj3rguXO1Yyy_ehMKM";
    }
    const obj = { ...userInfo, returnSecureToken: true };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error?.message);
          });
        }
      })
      .then((data) => {
        alert("Success!");
        setIdToken(data.idToken)
        localStorage.setItem("idtoken", data.idToken)
        console.log(data);
        navigate('/')
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border-2 bg-white mt-40 w-[25rem]">
        <div className="flex flex-col py-7 px-5">
          <h1 className="flex justify-center text-2xl my-5">
            {isLogin ? "Login" : "SignUp"}
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              className="border-2 px-2 rounded-md h-10"
              type="text"
              placeholder="Email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
            <input
              className="border-2 px-2 rounded-md h-10"
              type="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo((prev) => ({ ...prev, password: e.target.value }))
              }
              required
            />
            {!isLogin && (
              <input
                className="border-2 px-2 rounded-md h-10"
                type="password"
                placeholder="Current Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            )}
            <button
              className="my-5 py-2 bg-blue-500 text-white rounded-full"
              type="submit"
            >
              {isLogin ? "Login" : "SignUp"}
            </button>
          </form>
        </div>
      </div>
      <div className="flex bg-lime-100 border-2 border-black rounded-md mt-5 p-3 w-[25rem] justify-center">
        {isLogin ? (
          <span>
            Create an account,{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="underline">
              SignUp
            </button>
          </span>
        ) : (
          <span>
            Have an account?{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="underline">
              Login
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default Signup;
