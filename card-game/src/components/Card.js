import React from 'react'
import classes from './Card.module.css'

function Card({card, handleChoice}) {
    
    const userClick = (event) => {
      handleChoice(card)     
    }
 
  return (
    <div>
    <div className={classes.card}>
    <img  src={card.src} alt="card front" />
    <img  src="/img/cover.jpg" alt="cover" onClick={userClick}/>
  </div>
  </div>
  )
}

export default Card