/* eslint-disable react/prop-types */

const List = ({item}) => {
  return (
    <div className={`mb-3 bg-white p-2 w-full flex gap-x-10 flex-wrap justify-between rounded-lg shadow-lg border-r-4 ${item.amount<0?'border-red-600':'border-green-600'}`}>
        <span className=''>{item.category}</span>
        <span className=''>{item.description}</span>
        <span className=''>${item.amount}</span>
    </div>
  )
}

export default List