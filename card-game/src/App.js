import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import Modal from './components/Modal/Modal'

const cardImages = [
  { "src": "/img/batman.webp", matched: false },
  { "src": "/img/captain-america.jpg", matched: false },
  { "src": "/img/spiderman.jpg", matched: false },
  { "src": "/img/thorn.webp", matched: false },
  { "src": "/img/iron-man.webp", matched: false },
  { "src": "/img/hulk.webp", matched: false },
  { "src": "/img/iron-man.webp", matched: false },
  { "src": "/img/hulk.webp", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [show, setShow] = useState(true)
  const [modal, setModal] = useState(false)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
    setTurns(0)
    setShow(false)
  }

  // handle a choice
  const handleChoice = (card) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
        
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])


  useEffect(() => {

    if(turns === 1) {
      setModal(true)
      shuffleCards()
    }

  }, [turns])




  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  const closeModal = () => {
    setModal(null)
    
  }

  return (
    <div className="App">
      {modal && (
        <div>
          <Modal closeModal={closeModal}/>
        </div>
      )

      }
     
      {show && (
        <div>
        <h1>Marvel Memory Game</h1>
        <button onClick={shuffleCards} >New Game</button>
        </div>
      )}

      <div className="card-grid">

        {cards.map(card => (
          
          <Card 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>

      {!show && (
        <div>
        <h3>Turns {turns} / 10 </h3>
        <button onClick={shuffleCards} >New Game</button>
        </div>
      )}

    </div>
  );
}

export default App