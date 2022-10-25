import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'

const cardImages = [
  { "src": "/img/batman.webp" },
  { "src": "/img/spiderman.jpg" },
  { "src": "/img/captain-america.jpg" },
 
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  console.log(setChoiceOne)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
    setTurns(0)
  }

 const handleChoice = (card) => {
  choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
 }

useEffect(() => {
  if (choiceOne && choiceTwo) {
    if (choiceOne.src === choiceTwo.src) {
    console.log("These cards match")
    resetTurns()
  }
    else {
    console.log("These cards dont match")
    resetTurns()
  }
  }
},[choiceOne, choiceTwo])
 
 

 const resetTurns = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prev => prev + 1)
 }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <Card card={card} handleChoice={handleChoice} key={card.id}/>
           
        ))}
      </div>

    </div>
  );
}

export default App