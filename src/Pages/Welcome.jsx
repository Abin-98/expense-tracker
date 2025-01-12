import { useContext } from "react";
import { ContextFile } from "../context/ContextFile";


const Welcome = () => {
  const {navigate} = useContext(ContextFile)
  const handleClick=()=>{
    navigate('/contact')
  }

  return (
  <>
    <section className="h-[5rem] bg-white flex justify-between items-center">
      <h1 className="ml-10">Welcome to Expense Tracker!!</h1>
      <span className="italic bg-stone-300 rounded-md px-2">
        Your profile is incomplete.{" "}
        <button onClick={handleClick} className="text-purple-700 underline italic">Complete now</button>
      </span>
    </section>
    <hr/>
  </>
  );
};

export default Welcome;
