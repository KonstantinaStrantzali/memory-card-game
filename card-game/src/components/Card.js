import React from 'react'
import './Card.css'

function Card({card, handleChoice, flipped, disabled}) {
    
    const userClick = () => {
      if (!disabled){
      handleChoice(card)
      }  
    }
 
  return (
      <div className="card">
        <div className={flipped ? "flipped" : ""}>
          <img className="front" src={card.src} alt="card front" />
          <img className="back" src="/img/cover.jpg" onClick={userClick} alt="cover" />
        </div>
      </div>
    )
}

export default Card