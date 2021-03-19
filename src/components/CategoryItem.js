import React from 'react'

function CategoryItem(props) {
  const CategoryEdit = (id) => {
    console.log('EDIT ID: ', id)
  }

  const DeleteCategory = (id) => {
    console.log('DELETE ID: ', id)
  }

  return (
    <div id={props.id} className="w-full bg-white shadow-sm p-2 rounded-md flex justify-between mb-4">
      <div className="name">
        {props.name}
      </div>
      <aside className="flex uppercase gap-x-3">
        <div onClick={() => CategoryEdit(props.id)} className="p-1 bg-blue-100 rounded text-blue-500 text-xs px-3 cursor-pointer hover:shadow-md ">
          Edit
        </div>
        <div onClick={() => DeleteCategory(props.id)} className="p-1 bg-red-100 rounded text-red-500 text-xs px-3 cursor-pointer hover:shadow-md ">
          Delete
        </div>
      </aside>
    </div>
  )
}

export default CategoryItem
