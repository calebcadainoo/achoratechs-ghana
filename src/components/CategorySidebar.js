/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import CategoryItem from './CategoryItem'
import { useDataLayerValue } from '../context-api/DataLayer'
import { actionTypes } from '../context-api/reducer'

function CategorySidebar() {
  // DataLayer - React context api
  const [{ categories, BASE_URL }, dispatch] = useDataLayerValue()

  // make api call
  useEffect(() => {
    fetch(`${BASE_URL}/categories`)
      .then(response => response.json())
      .then(feedback => {
        // set categories value
        dispatch({
					type: actionTypes.SET_CATEGORIES,
					categories: feedback.data,
				})
        console.log('LOCAL CATE: ', categories)
      })
  }, [])


  return (
    <div className="bg-gray-200 flex flex-col h-full overflow-hidden">
      <h3 className="text-xl m-2 my-3">Categories</h3>
      <div className="flex p-4 justify-end">
        <div className="table p-2 rounded shadow-2xl uppercase cursor-pointer text-xs bg-blue-600 text-white hover:bg-white hover:text-blue-600">
          Create Category
        </div>
      </div>
      <section className="text-left p-4 mt-5 overflow-auto ">
        {(typeof categories != "undefined") ? (
          categories.map((category, key) => {
            return <CategoryItem name={category.name} pos={key} id={category.id} key={category.id} />
          })
        ) :('')}
      </section>
    </div>
  )
}

export default CategorySidebar
