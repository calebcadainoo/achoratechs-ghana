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
        console.log(typeof categories)
      })
  }, [])


  return (
    <div className="bg-gray-200 p-4">
      <h3 className="text-xl m-2 my-3">Categories</h3>

      <section className="text-left mt-5">
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
