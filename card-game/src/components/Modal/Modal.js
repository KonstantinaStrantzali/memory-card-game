import React from 'react'
import classes from "./Modal.module.css"

function Modal({closeModal}) {
  return (
    <div>
         <div className={classes.backdrop}>
    
    <div className={classes.modal}>
        <div className={classes.content}>
          <h1>Oh no! You run out of turns!</h1>
          <button onClick={closeModal}>Try again</button>
        </div>
        
        <footer className={classes.actions}>
            
        </footer>

    </div>
    </div>
    </div>
  )
}

export default Modal