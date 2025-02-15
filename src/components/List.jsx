/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const List = ({ item, assetList, id, setFetchExpenses }) => {
  const userEmail = useSelector((state) => state.auth.userEmail);
  const emailProper = userEmail.replace(/\./g, "_");
  const optionsList = useSelector((state) => state.category.optionsList);
  const hardCodedList = useSelector((state)=>state.category.hardCodedList)
  const [isEditing, setIsEditing] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: item.category,
    amount: item.amount,
    description: item.description,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDoneEdit = (e) => {
    e.preventDefault();

    axios
      .put(
        `https://expense-tracker-da8bb-default-rtdb.firebaseio.com/expenses/${emailProper}/${id}.json`,
        {
          description: newExpense.description,
          amount: newExpense.amount,
          category: newExpense.category,
        }
      )
      .then((res) => {
        console.log(res, "Update done successfully");
        setIsEditing(false);
        setFetchExpenses((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    axios
      .delete(
        `https://expense-tracker-da8bb-default-rtdb.firebaseio.com/expenses/${emailProper}/${id}.json`
      )
      .then((res) => {
        console.log(res, "deleted successfully");
        console.log("generating list again!");
        setFetchExpenses((prev) => !prev);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      key={id}
      className={`mb-3 py-2 bg-white px-4 w-full min-w-[20rem] grid grid-cols-4 gap-x-10 justify-items-start rounded-lg shadow-lg dark:bg-slate-200 ${
        assetList.some((asset) => asset === item.category)
          ? "border-green-600"
          : "border-red-600"
      } ${isEditing ? "border-2 border-purple-700" : "border-l-8"}`}
    >
      {isEditing ? (
        <form className="col-span-4 grid grid-cols-4 gap-x-5">
          <select
            value={newExpense.category}
            className="p-2 border-[1px] rounded-md"
            onChange={(e) =>
              setNewExpense({ ...newExpense, category: e.target.value })
            }
            placeholder="Food"
            required
          >
            {Object.keys(optionsList)?.map((id) => (
              <option key={id} value={optionsList[id]?.option}>
                {optionsList[id]?.option}
              </option>
            ))}

            {hardCodedList?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="p-2 px-3 border-[1px] rounded-md"
            value={newExpense.description}
            onChange={(e) =>
              setNewExpense({ ...newExpense, description: e.target.value })
            }
          />
          <input
            type="number"
            className="p-2 px-3 border-[1px] rounded-md"
            value={newExpense.amount}
            onChange={(e) =>
              setNewExpense({ ...newExpense, amount: e.target.value })
            }
          />
          <span className="flex gap-2">
            <button
              type="submit"
              onClick={handleDoneEdit}
              className="bg-green-500 rounded-md text-white px-2"
            >
              Done
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 rounded-md text-white px-2"
            >
              Cancel
            </button>
          </span>
        </form>
      ) : (
        <>
          <span className="text-md font-semibold">{item.category}</span>
          <span className="italic">{item.description}</span>
          <span className="text-lg font-semibold">₹{item.amount}</span>

          <span className="flex flex-wrap gap-4">
            <button
              type="submit"
              onClick={handleEdit}
              className="p-1 rounded-full bg-blue-400"
            >
              <Tooltip title="Edit" arrow>
                <EditNoteIcon
                  fontSize="medium"
                  className="text-white hover:scale-125 dark:text-black"
                />
              </Tooltip>
            </button>
            <button
              onClick={handleDelete}
              className="p-1 rounded-full bg-red-400"
            >
              <Tooltip title="Delete" arrow>
                <DeleteForeverIcon
                  fontSize="medium"
                  className="text-white hover:scale-125 dark:text-black"
                />
              </Tooltip>
            </button>
          </span>
        </>
      )}
    </div>
  );
};

export default List;
