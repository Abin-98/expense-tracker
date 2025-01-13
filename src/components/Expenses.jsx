import { useContext, useState } from "react";
import { ContextFile } from "../context/ContextFile";
import List from "./List"

const Expenses = () => {
  const { expenseList, setExpenseList } = useContext(ContextFile);
  const [expense, setExpense] = useState({
    id: '',
    amount: 0,
    description: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    expense.id = Math.floor(Math.random() * 10000);
    setExpenseList([...expenseList, expense]);
    console.log(expenseList);
    
  };
  return (
    <section className="grid grid-cols-5 gap-5">
      <div className="flex justify-end col-span-2">
        <div className="flex flex-col w-[20rem] mt-8">
          <h1 className="text-2xl pb-4 font-semibold">Add new transaction</h1>
          <hr className="w-[20rem] border-blue-600" />
          <form className="flex flex-col mt-7" onSubmit={handleSubmit}>
            <h1 className="text-lg mb-2">
              Amount spent - negative for expense, positive for income
            </h1>
            <input
              value={expense.amount}
              className="p-2 px-3 border-[1px] rounded-md mb-6"
              type="number"
              onChange={(e) =>
                setExpense({ ...expense, amount: e.target.value })
              }
              required
            />
            <h1 className="text-lg mb-2">Description of expense</h1>
            <input
              value={expense.description}
              className="p-2 px-3 border-[1px] rounded-md mb-6"
              type="text"
              onChange={(e) =>
                setExpense({ ...expense, description: e.target.value })
              }
              placeholder="Description"
              required
            />
            <h1 className="text-lg mb-2">Select Category</h1>
            <input
              value={expense.category}
              className="p-2 px-3 border-[1px] rounded-md mb-6"
              list="browsers"
              name="browser"
              onChange={(e) =>
                setExpense({ ...expense, category: e.target.value })
              }
              placeholder="Double-click to see dropdown"
              required
            />
            <datalist id="browsers">
              <option value="Food" />
              <option value="Petrol" />
              <option value="Salary" />
              <option value="Entertainment" />
              <option value="Travel" />
              <option value="Education" />
              <option value="Rent" />
              <option value="Clothes" />
              <option value="Home utensils" />
              <option value="Hospital bills" />
              <option value="Donation" />
              <option value="Others" />
              <option value="Investment" />
            </datalist>
            <div className="flex justify-center">
              <button
                className="w-[10rem] p-2 bg-blue-800 text-white text-lg mt-6"
                type="submit"
              >
                Add Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center col-span-3">
        <div className="flex flex-col mt-3 min-w-[20rem] w-[30rem]">
            <div className="py-5">
                <h3 className="text-xl font-semibold">YOUR BALANCE</h3>
                <h1 className="text-4xl">${Number(expenseList?.reduce((acc, item)=>acc+item.amount,0)).toFixed(2)}</h1>
            </div>
            <div className="grid grid-cols-2 bg-white shadow-lg">
                <span className="flex flex-col justify-center items-center border-r-2">
                    <h1 className="text-lg font-semibold">INCOME</h1>
                    <h1 className="text-xl text-green-600">{Number(expenseList?.filter((item)=>item.amount>0).reduce((acc,item)=>acc+item.amount,0)).toFixed(2)}</h1>
                </span>
                <span className="flex flex-col justify-center items-center py-3">
                    <h1 className="text-lg font-semibold">EXPENSE</h1>
                    <h1 className="text-xl text-red-600">{Number(expenseList?.filter((item)=>item.amount<0).reduce((acc,item)=>acc+item.amount,0)).toFixed(2)}</h1>
                </span>
            </div>
            <div className="py-5">
                <h1 className="mb-5">Transaction History</h1>
                <hr className="border-blue-600"/>
            </div>
          {expenseList.map((item) => (
            <List item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expenses;
