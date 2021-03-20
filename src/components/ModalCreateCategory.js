import React from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root');
function ModalCreateCategory(props) {
  return (
    <ReactModal 
			isOpen={props.open}
			shouldCloseOnOverlayClick={true}
		>
      hahahas
    </ReactModal>
  )
}

export default ModalCreateCategory
