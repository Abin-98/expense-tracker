import axios from "axios";
import { useContext, useRef, useState } from "react";
import { ContextFile } from "../context/ContextFile";

const ForgotPassword = () => {

  const {navigate} =useContext(ContextFile)
  const emailRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDp2l3Q_JVR3OxCwJj3rguXO1Yyy_ehMKM",
        { requestType: "PASSWORD_RESET", email: emailRef.current.value },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        alert('Link sent to email!')
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        alert(err?.code);
      });
  };
  return (
    <section className="h-[100vh] bg-[url('./assets/fgpass.jpg')] bg-cover bg-fixed bg-center flex flex-col items-center">
      <div className="border-2 border-orange-500 rounded-lg bg-white mt-40 w-[30rem] shadow-xl">
        <div className="flex flex-col py-7 px-5">
          <h1 className="text-xl text-orange-700 my-5">
            Not to worry! We are here to help
          </h1>
          <h1 className="text-lg my-4">Enter your email address below</h1>
          <form className="flex flex-col mb-5" onSubmit={handleClick}>
            <input
              ref={emailRef}
              className="p-2 border-2 rounded-md mb-4"
              type="email"
              placeholder="Email"
              required
            />
            <button
              disabled={isLoading}
              className="bg-orange-700 text-white px-4 py-2"
              type="submit"
            >
              {isLoading ? "Please Wait..." : "Send Link"}
            </button>
          </form>
          <button onClick={()=>navigate('/login')} className="underline text-orange-700">Go back to Login Page</button>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
