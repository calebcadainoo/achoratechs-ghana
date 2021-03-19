/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import CategoryItem from './CategoryItem'
import { useDataLayerValue } from '../context-api/DataLayer'
import { actionTypes } from '../context-api/reducer'

function CategorySidebar() {

  const BASE_URL = 'https://test.anchoratechs.com'
  const [currentCategories, setCategories] = useState({})
  const [{ categories }, dispatch] = useDataLayerValue()

  // make api call
  useEffect(() => {
    fetch(`${BASE_URL}/categories`)
      .then(response => response.json())
      .then(data => {
        setCategories(data)
        dispatch({
					type: actionTypes.SET_USER,
					categories: data,
				})
        console.log('LOCAL CATE: ', currentCategories)
      })
  }, [])

  // assign category to DataLayer
  


  return (
    <div className="bg-gray-200 p-4">
      <h3 className="text-xl m-2 my-3">Categories</h3>

      <section className="text-left mt-5">
        {(typeof categories.data != "undefined") ? (
          categories.data.map((category) => {
            return <CategoryItem name={category.name} id={category.id} key={category.id} />
          })
        ) :('')}
      </section>
    </div>
  )
}

export default CategorySidebar
