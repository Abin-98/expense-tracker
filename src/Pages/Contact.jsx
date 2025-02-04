import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ContextFile } from "../context/ContextFile";
import { useSelector } from "react-redux";

const Contact = () => {
  const idToken = useSelector((state) => state.auth.idToken);

  const dark = useSelector((state) => state.theme.darkTheme);

  const { navigate } = useContext(ContextFile);
  const [updatedInfo, setUpdatedInfo] = useState({
    name: "",
    profilePic: "",
  });

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDp2l3Q_JVR3OxCwJj3rguXO1Yyy_ehMKM",
        { idToken: idToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data?.users[0]);
        setUpdatedInfo({
          name: res.data?.users[0].displayName,
          profilePic: res.data?.users[0].photoUrl,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDp2l3Q_JVR3OxCwJj3rguXO1Yyy_ehMKM",
        {
          idToken: idToken,
          displayName: updatedInfo.name,
          photoUrl: updatedInfo.profilePic,
          returnSecureToken: true,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        alert("Successfully Updated");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section
      className={`flex justify-center ${
        dark && "dark"
      } bg-neutral-200 dark:bg-neutral-700 h-[100vh]`}
    >
      <div className="flex flex-col container border-2 w-[30rem] p-3 mt-40 bg-white dark:bg-slate-300 h-fit m-5">
        <div className="flex justify-between py-5">
          <h1 className="text-lg font-bold">Contact Details</h1>
          <button
            onClick={handleCancel}
            className="px-2 bg-white border-red-500 border-2 text-red-500"
          >
            Cancel
          </button>
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:grid grid-cols-4 gap-4 items-center">
            <label className="col-span-1">Name:</label>
            <input
              className="w-full border-2 p-2 col-span-3"
              type="text"
              placeholder="Full Name"
              value={updatedInfo.name}
              onChange={(e) =>
                setUpdatedInfo({ ...updatedInfo, name: e.target.value })
              }
              required
            />
            </div>
            <div className="flex flex-col sm:grid grid-cols-4 gap-4 items-center">
            <label className="col-span-1">Profile Pic Url:</label>
            <input
              className="w-full border-2 p-2 col-span-3"
              type="text"
              placeholder="Profile Pic"
              value={updatedInfo.profilePic}
              onChange={(e) =>
                setUpdatedInfo({ ...updatedInfo, profilePic: e.target.value })
              }
            />
          </div>
          <button type="submit" className="text-white bg-yellow-800 p-2">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
