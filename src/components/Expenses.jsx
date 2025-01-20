import { useContext, useEffect, useState } from "react";
import { ContextFile } from "../context/ContextFile";
import List from "./List";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store/reducers/expenseSlice";
import DownloadIcon from "@mui/icons-material/Download";
import StarIcon from "@mui/icons-material/Star";
import { themeActions } from "../store/reducers/themeSlice";
import { CSVLink } from "react-csv";

const Expenses = (props) => {
  const dispatch = useDispatch();
  const expenseList = useSelector((state) => state.expense.expenseList);
  // const { expenseList, setExpenseList } = useContext(ContextFile);
  const [fetchExpenses, setFetchExpenses] = useState(true);
  const [expense, setExpense] = useState({
    amount: 0,
    description: "Description",
    category: "Food",
  });
  const assetList = ["Assets-Profit", "Savings", "Salary"];

  const activated = useSelector((state) => state.theme.activated);

  const netGain = Number(
    Object.values(expenseList)
      ?.filter((item) => assetList?.some((asset) => asset === item.category))
      .reduce((acc, item) => acc + Number(item.amount), 0)
  ).toFixed(2);

  const netLoss = Number(
    Object.values(expenseList)
      ?.filter((item) => !assetList?.some((asset) => asset === item.category))
      .reduce((acc, item) => acc + Number(item.amount), 0) // Number() because data from realtime db is string
  ).toFixed(2);

  useEffect(() => {
    axios
      .get(
        "https://expense-tracker-da8bb-default-rtdb.firebaseio.com/expenses.json"
      )
      .then((res) => {
        dispatch(expenseActions.setExpenseList({ ...res.data }));
        // setExpenseList({...res.data})
        console.log(Object.values(res.data));
      })
      .catch((err) => console.log(err));
  }, [fetchExpenses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://expense-tracker-da8bb-default-rtdb.firebaseio.com/expenses.json",
        {
          description: expense.description,
          amount: expense.amount,
          category: expense.category,
        }
      )
      .then((res) => {
        const id = res.data?.name;
        dispatch(
          expenseActions.setExpenseList({ ...expenseList, [id]: expense })
        );
        // setExpenseList({...expenseList, [id]:expense})
        setExpense({
          amount: 0,
          description: "",
          category: "Food",
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="grid grid-cols-5 gap-5 dark:bg-neutral-700 h-[100vh]">
      <div className="flex justify-end col-span-2">
        <div className="flex flex-col w-[20rem] mt-8">
          <h1 className="text-2xl pb-4 font-semibold dark:text-neutral-300">
            Add new transaction
          </h1>
          <hr className="w-[20rem] border-blue-600" />
          <form className="flex flex-col mt-7" onSubmit={handleSubmit}>
            <h1 className="text-lg mb-2 dark:text-neutral-300">
              Amount spent / earned
            </h1>
            <input
              value={expense.amount}
              className="p-2 px-3 border-[1px] rounded-md mb-6 dark:bg-slate-300"
              type="number"
              onChange={(e) =>
                setExpense({ ...expense, amount: e.target.value })
              }
              min={0}
              required
            />
            <h1 className="text-lg mb-2 dark:text-neutral-300">
              Description of expense
            </h1>
            <input
              value={expense.description}
              className="p-2 px-3 border-[1px] rounded-md mb-6 dark:bg-slate-300"
              type="text"
              onChange={(e) =>
                setExpense({ ...expense, description: e.target.value })
              }
              placeholder="Description"
              required
            />
            <h1 className="text-lg mb-2 dark:text-neutral-300">
              Select Category
            </h1>
            <select
              value={expense.category}
              className="p-2 px-3 border-[1px] rounded-md mb-6 bg-white dark:bg-slate-300"
              onChange={(e) =>
                setExpense({ ...expense, category: e.target.value })
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
            <div className="flex justify-center">
              <button
                className="w-[10rem] p-2 bg-blue-800 text-white text-lg mt-6 hover:bg-blue-900"
                type="submit"
              >
                Add Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-center col-span-3">
        <div className="flex flex-col mt-3 min-w-[20rem] w-[40rem]">
          <div className="py-5 grid grid-cols-2 place-content-start">
            <div className="col-span-1">
              <h3 className="text-xl font-semibold dark:text-neutral-300">
                YOUR BALANCE
              </h3>
              <h1 className="text-4xl dark:text-neutral-300">
                ${netGain - netLoss}
              </h1>
            </div>
            <div className="col-span-1 grid grid-cols-2 gap-5">
              {netLoss >= 10000 && (
                <button
                  onClick={() => dispatch(themeActions.toggleActivate())}
                  className="bg-yellow-500 rounded-md text-white px-4 py-2 h-full hover:bg-yellow-600 flex items-center">
                  <span>
                    <StarIcon />
                  </span>
                  <span>Activate Premium</span>
                </button>
              )}
              {activated && (
                <button className="bg-green-500 rounded-md text-white px-4 py-2 h-full hover:bg-green-700 flex items-center">
                  <CSVLink data={Object.values(expenseList)}>
                  <span>
                    <DownloadIcon />
                  </span>
                  <span>Download File</span>
                  </CSVLink>
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 bg-white shadow-lg dark:bg-slate-300">
            <span className="flex flex-col justify-center items-center border-r-2">
              <h1 className="text-lg font-semibold">INCOME</h1>
              <h1 className="text-xl font-semibold text-green-600">
                ${netGain}
              </h1>
            </span>
            <span className="flex flex-col justify-center items-center py-3">
              <h1 className="text-lg font-semibold">EXPENSE</h1>
              <h1 className="text-xl font-semibold text-red-600">${netLoss}</h1>
            </span>
          </div>
          <div className="py-5">
            <h1 className="mb-5 dark:text-neutral-300">Transaction History</h1>
            <hr className="border-blue-600" />
          </div>
          {Object.keys(expenseList).map((id) => (
            <List
              item={expenseList[id]}
              key={id}
              id={id}
              assetList={assetList}
              setFetchExpenses={setFetchExpenses}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expenses;
