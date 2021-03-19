import React from 'react'
import { useDataLayerValue } from '../context-api/DataLayer'
import { actionTypes } from '../context-api/reducer'

function CategoryItem(props) {

  // DataLayer - React context api
  const [{ categories, BASE_URL }, dispatch] = useDataLayerValue()

  const CategoryEdit = (id) => {
    console.log('EDIT ID: ', id)
  }

  const DeleteCategory = (id) => {
    console.log('DELETE ID: ', id)
    const newCategories = categories.filter((category) => category.id !== id )
    dispatch({
      type: actionTypes.SET_CATEGORIES,
      categories: newCategories,
    })
    // delete from api
    fetch(`${BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(feedback => {
      console.log('DELETE RESPONSE: ', feedback)
    })
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
