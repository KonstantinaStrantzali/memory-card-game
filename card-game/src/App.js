import { useState } from 'react'
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

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
    setTurns(0)
  }

 const handleChoice = (card) => {
  choiceOne ? setChoiceOne(card) : setChoiceTwo(card)

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