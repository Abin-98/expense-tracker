import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { categoryActions } from "../store/reducers/categorySlice";

const Category = () => {
  const dispatch = useDispatch();
  const optionsList = useSelector((state) => state.category.optionsList);
  const hardCodedList = useSelector((state)=>state.category.hardCodedList)
  const [category, setCategory] = useState("");
  const dark = useSelector((state) => state.theme.darkTheme);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const emailProper = userEmail.replace(/\./g, "_");
  const [fetchCategories, setFetchCategories] = useState(true);

  useEffect(() => {
    axios
    .get(
      `https://expense-tracker-da8bb-default-rtdb.firebaseio.com/categories/${emailProper}.json`
    )
    .then((res) => {
      dispatch(categoryActions.setOptionsList({ ...res.data }));
      // setExpenseList({...res.data})
      console.log(res.data);
    })
    .catch((err) => console.log(err));
  }, [fetchCategories]);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (category.trim() !== "") {
      if (Object.values(optionsList).find((item) => item.option === category) || hardCodedList.find(option=>option===category)) 
        toast.error("Category Already Exists!", { closeOnClick: true });
      else {

        axios.post(
          `https://expense-tracker-da8bb-default-rtdb.firebaseio.com/categories/${emailProper}.json`,
          {
            option: category.trim()
          }
        )
        .then((res) => {
            console.log(res.data);
            setFetchCategories((prev) => !prev);         
        })
        .catch((err) => console.log(err));
        setCategory("");
      }
    }
    else 
        toast.error("Enter a Valid Name!", { closeOnClick: true });
  };

  const handleDeleteOption = (id) =>{
    axios
    .delete(
      `https://expense-tracker-da8bb-default-rtdb.firebaseio.com/categories/${emailProper}/${id}.json`
    )
    .then((res) => {
      console.log(res, "deleted successfully");
      console.log("generating category list again!");
      setFetchCategories((prev) => !prev);
    })
    .catch((err) => console.log(err));
    
  }

  return (
    <section className={`${dark && "dark"}`}>
      <div className="flex justify-center bg-gradient-to-r from-white to-slate-200 dark:bg-gradient-to-r dark:from-neutral-900 dark:to-slate-400  h-screen">
        <div className="w-full max-w-[40rem] flex-col p-4">
          <h1 className="text-3xl dark:text-white font-semibold mt-4 py-4">
            Categories
          </h1>
          <form className="grid grid-cols-3 gap-2 mb-4" onSubmit={handleSubmit}>
            <input
              className="col-span-2 p-2 px-3 border-[1px] rounded-md mb-6 dark:bg-slate-200"
              type="text"
              placeholder="Add New Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button
              className="bg-blue-400 text-white col-span-1 rounded-md mb-6"
              type="submit"
            >
              Add
            </button>
          </form>
          <h1 className="text-2xl font-semibold my-3 dark:text-white">Your Categories</h1>
            {Object.keys(optionsList).length !== 0 ? Object.keys(optionsList).map((id) => (
              <li
                key={id}
                className="bg-white border-[1px] flex justify-between py-2 px-5 mb-2"
              >
                <span className="">{optionsList[id].option}</span>
                <button onClick={()=>handleDeleteOption(id)} className="font-bold text-xl">X</button>
              </li>
            )) : <p>No Custom Category Found!</p>}
        </div>
      </div>
    </section>
  );
};

export default Category;
