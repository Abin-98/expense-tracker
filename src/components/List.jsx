/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";

const List = ({ item, assetList, id, setFetchExpenses }) => {

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
    e.preventDefault()
    
    axios
      .put(
        `https://expense-tracker-da8bb-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          description: newExpense.description,
          amount: newExpense.amount,
          category: newExpense.category
        }
      )
      .then((res) => {
        console.log(res, 'Update done successfully');
        setIsEditing(false);
        setFetchExpenses((prev) => !prev);
        
      })
      .catch((err)=>console.log(err))
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {

    axios
      .delete(
        `https://expense-tracker-da8bb-default-rtdb.firebaseio.com/expenses/${id}.json`
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
      className={`mb-3 py-2 bg-white px-4 w-full grid grid-cols-4 gap-x-10 justify-items-start rounded-lg shadow-lg dark:bg-slate-300 ${
        assetList.some((asset) => asset === item.category)
          ? "border-green-600"
          : "border-red-600"
      } ${isEditing? 'border-2 border-purple-700' : 'border-l-8'}`}
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
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Rent">Rent</option>
            <option value="Clothes">Clothes</option>
            <option value="Furniture">Furniture</option>
            <option value="Hospital-bills">Hospital-bills</option>
            <option value="Donation">Donation</option>
            <option value="Investment">Investment</option>
            <option value="Groceries">Groceries</option>
            <option value="Kitchen-utensils">Kitchen-utensils</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Repair">Repair</option>
            <option value="Assets-Profit">Assets-Profit</option>
            <option value="Savings">Savings</option>
            <option value="Salary">Salary</option>
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
          <span className="text-lg font-semibold">${item.amount}</span>

          <span className="flex flex-wrap gap-2">
            <button
              type="submit"
              onClick={handleEdit}
              className="bg-blue-500 rounded-md text-white px-2 hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 rounded-md text-white px-2 hover:bg-red-700"
            >
              Delete
            </button>
          </span>
        </>
      )}
    </div>
  );
};

export default List;
