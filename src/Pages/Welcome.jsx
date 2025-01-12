import { useContext } from "react";
import { ContextFile } from "../context/ContextFile";


const Welcome = () => {
  const {navigate, setIdToken} = useContext(ContextFile)
  const handleClick=()=>{
    navigate('/contact')
  }

  const handleLogout=()=>{
    localStorage.clear()
    setIdToken(null)
  }

  return (
  <div>
    <section className="h-[5rem] bg-white flex justify-between items-center">
      <h1 className="ml-10">Welcome to Expense Tracker!!</h1>
      <span className="italic bg-stone-300 rounded-md px-2">
        Your profile is incomplete.{" "}
        <button onClick={handleClick} className="text-purple-700 underline italic">Complete now</button>
      </span>
    </section>
    <hr/>
    <button className="bg-slate-400 px-2" onClick={handleLogout}>Logout</button>
  </div>
  );
};

export default Welcome;
