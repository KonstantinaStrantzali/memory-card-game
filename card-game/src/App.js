import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import Modal from './components/Modal/Modal'

const cardImages = [
  { "src": "/img/shuri.jpg", matched: false },
  { "src": "/img/captain-america.jpg", matched: false },
  { "src": "/img/spiderman.jpg", matched: false },
  { "src": "/img/thorn.webp", matched: false },
  { "src": "/img/iron-man.webp", matched: false },
  { "src": "/img/hulk.webp", matched: false },
  { "src": "/img/ant-man.webp", matched: false },
  { "src": "/img/black-panther.webp", matched: false },
  { "src": "/img/Black-Widow.jpg", matched: false },
  { "src": "/img/rocket.jpg", matched: false },
  
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [show, setShow] = useState(true)
  const [modal, setModal] = useState(false)
  const [disabled, setDisabled] = useState(false)

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
      setDisabled(true)
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

    if(turns === 10) {
      setModal(true)
      shuffleCards()
    }

  }, [turns])




  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
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
        <h2>Welcome to Marvel Memory Game</h2>
        <img className="logo" src="/img/marvel_logo.jpg" alt="card front" />
        <h3>Flip the cards and match the tiles together in pairs while having only 15 turns! </h3>
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
            disabled={disabled}
          />
        ))}
      </div>

      {!show && (
        <div>
        <p>Turns {turns} / 15 </p>
        <button onClick={shuffleCards} >New Game</button>
        </div>
      )}

    </div>
  );
}

export default App