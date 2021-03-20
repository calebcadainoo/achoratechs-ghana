import React, { useEffect, useState } from 'react'
import { useDataLayerValue } from '../context-api/DataLayer'
import { actionTypes } from '../context-api/reducer'
import ReactModal from 'react-modal'
import InputBox from './form-elements/InputBox'
import ModalTitle from './form-elements/ModalTitle'
import { useAlert } from 'react-alert'
import TextAreaBox from './form-elements/TextAreaBox'
import SelectBox from './form-elements/SelectBox'

function ProductCard() {
  // DataLayer - React context api
  const [{ BASE_URL, categories, products }, dispatch] = useDataLayerValue()
	// react alert
  const alert = useAlert()

  // make api call
  useEffect(() => {
    fetch(`${BASE_URL}/items`)
      .then(response => response.json())
      .then(feedback => {
        // set categories value
        dispatch({
					type: actionTypes.SET_PRODUCTS,
					products: feedback.data,
				})
      })
  }, [])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	const [itemObject, setItemObject] = useState('')

	const modalStyle = {
		overflow: {
			background: 'rgba(0, 0, 0, 0.3)'
		},
		content: {
			maxWidth: '500px',
			margin: 'auto',
		}
	}

  const CreateProduct = (evt) => {
		evt.preventDefault()
		const data = JSON.stringify({
			itemObject,
		})

		fetch(`${BASE_URL}/item`, {
			method: evt.target.method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: data,
		})
		.then(response => response.json())
		.then(feedback => {
			// set categories value
			products.unshift(feedback.data)
			dispatch({
				type: actionTypes.SET_PRODUCTS,
				products: products,
			})
			setIsCreateModalOpen(false)
			setItemObject('')
			alert.show(feedback.message)
		})
	}
  
  return (
    <div className="col-span-2 bg-white">
      <h3 className="text-xl m-2 my-3">Product List</h3>
      <div className="flex p-4 justify-end">
        <div onClick={() => setIsCreateModalOpen(true)} className="table p-2 rounded shadow-2xl uppercase cursor-pointer text-xs bg-blue-600 text-white hover:bg-white hover:text-blue-600">
          Create Item
        </div>
      </div>

      <ReactModal 
        isOpen={isCreateModalOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setIsCreateModalOpen(false)}
				style={modalStyle}
      >
				{/* close btn */}
				<button onClick={() => setIsCreateModalOpen(false)} className="btn p-1 uppercase bg-red-100 rounded text-red-500 text-xs px-3 cursor-pointer shadow-md " >Close X</button>
        <ModalTitle title="Add New Item" />
				<form method="POST" onSubmit={CreateProduct}>
					<div className="my-10">
          <InputBox onInputBoxChange={setItemObject} 
							key="i1"
							label="Title" 
							name="itemTitle" 
							stateVal={itemObject}
						/>

            <InputBox onInputBoxChange={setItemObject} 
							key="i2"
							label="Price" 
							name="itemPrice" 
							stateVal={itemObject}
						/>

            <SelectBox onInputBoxChange={setItemObject} 
							key="i3"
							label="Select Category" 
							name="categoryName" 
							optionList={categories}
							stateVal={itemObject}
						/>

            <TextAreaBox onInputBoxChange={setItemObject} 
							key="i4"
							label="Item Name" 
							name="categoryName" 
							stateVal={itemObject}
						/>
					</div>
					<button type="submit" className="w-9/12 m-auto outline-none btn table p-2 px-5 rounded shadow-2xl uppercase cursor-pointer text-xs bg-blue-600 text-white ">
						Add Product
					</button>
				</form>
			</ReactModal>
    </div>
  )
}

export default ProductCard
