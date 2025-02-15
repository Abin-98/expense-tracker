import { useContext, useState } from "react";
import { ContextFile } from "../context/ContextFile";
import { useDispatch } from "react-redux";
import { authActions } from "../store/reducers/authSlice";
import { toast } from "react-toastify";
import { auth, provider } from "../FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import google from "../assets/google.png";

const Signup = () => {
  const dispatch = useDispatch();
  const { navigate, setEmailVerified } = useContext(ContextFile);
  const [isLogin, setIsLogin] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && userInfo.password !== confirmPass) {
      toast.error("Confirm password does not match! try again", {
        closeOnClick: true,
      });
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
        toast.success("Successfully Logged in", { closeOnClick: true });
        dispatch(authActions.setIdToken(data.idToken));
        // setIdToken(data.idToken)
        localStorage.setItem("idToken", data.idToken);
        localStorage.setItem("userName", data.displayName);
        localStorage.setItem("userEmail", data.email);
        dispatch(authActions.setUserEmail(data.email));
        console.log(data.email);

        dispatch(authActions.setUserName(data.displayName));
        console.log(data);
        navigate("/");
      })
      .catch((err) => {
        toast.error("Failed to Login", { closeOnClick: true });
        console.log(err.message);
      });
  };

  const handleGoogleSignin = () =>{
    signInWithPopup(auth, provider).then(result=>{
      const user = result.user
      console.log(user);
      toast.success("Successfully Logged in", { closeOnClick: true });
    
      localStorage.setItem("idToken", user.accessToken);
      localStorage.setItem("userName", user.displayName);
      localStorage.setItem("userEmail", user.email);
      dispatch(authActions.setIdToken(user.accessToken));
      dispatch(authActions.setUserEmail(user.email));
      dispatch(authActions.setUserName(user.displayName));
      dispatch(authActions.setUserProfilePic(user.photoURL))
      setEmailVerified(user.emailVerified)
      navigate("/");
  }).catch(err=>{
      toast.error("Failed to Login", { closeOnClick: true });
      console.log(err);
  })
  }

  return (
    <div className="flex sm:flex-row flex-col">
      <div className="flex flex-col flex-1 justify-center items-center h-[100vh]">
        <div className="text-blue-500 font-semibold text-4xl mb-10 mt-5">
          BudgetBuddy.
        </div>
        <div className="text-xl text-center font-semibold sm:w-1/2 mb-10 p-4">
          Smart tracking for a stress-free budget – Manage your expenses
          effortlessly! 💰
        </div>
        <div className="h-12 w-full max-w-[40rem] px-5 flex justify-center">
          <button onClick={handleGoogleSignin} className="rounded-md border-2 w-full flex justify-center items-center">
            <img src={google} alt="google-icon" width={20} height={20} />
            <span className="text-xl ml-4">Sign in with Google</span>
          </button>
        </div>
        <div className="bg-white max-w-[40rem] w-full shadow-xl">
          <div className="flex flex-col py-7 px-5">
            <h1 className="flex justify-center text-2xl my-5">
              {isLogin ? "Welcome Back" : "Sign Up"}
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className="border-2 px-2 rounded-md h-12 text-xl"
                type="email"
                placeholder="Email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
              <input
                className="border-2 px-2 rounded-md h-12 text-xl"
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
                  className="border-2 px-2 rounded-md h-12 text-xl"
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
            {isLogin && (
              <button
                onClick={() => navigate("/forgotpass")}
                className="underline text-blue-500"
              >
                Forgot Password?
              </button>
            )}
          </div>
        </div>
        <div className="flex bg-lime-100 border-2 border-black rounded-md mt-5 p-3 w-[25rem] justify-center">
          {isLogin ? (
            <span>
              Create an account,{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="underline"
              >
                SignUp
              </button>
            </span>
          ) : (
            <span>
              Have an account?{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="underline"
              >
                Login
              </button>
            </span>
          )}
        </div>
      </div>
      <div className="flex-1 hidden sm:block flex-col bg-signup p-10 py-20"></div>
    </div>
  );
};

export default Signup;
