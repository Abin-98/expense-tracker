/* eslint-disable react/prop-types */

const List = ({ item, assetList }) => {
  return (
    <div key={item.id}
      className={`mb-3 bg-white p-2 w-full grid grid-cols-3 gap-x-10 place-items-center rounded-lg shadow-lg border-r-8 ${
        assetList.some((asset) => asset === item.category)
          ? "border-green-600"
          : "border-red-600"
      }`}
    >
      <span className="">{item.category}</span>
      <span className="">{item.description}</span>
      <span className="">${item.amount}</span>
    </div>
  );
};

export default List;
