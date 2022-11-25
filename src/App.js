import React from "react"
import Die from "./components/Die"
import Rolls from "./components/rolls"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import './styles.css'
import {StopWatch} from './components/Stopwatch.jsx';
import {Timer} from "./components/Timer";

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [stopStart, setStopStart] = React.useState(false)
    const [timer, setTimer] = React.useState(false)
    const [tester, setTester] = React.useState(false)
    const [time, setTime] = React.useState(0);
    const [done, setDone] = React.useState(false)

    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollDice() {
        if(!tenzies) {
            setTimer(false)
            setStopStart(true)
            setRolls(oldRolls => oldRolls + 1)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setRolls(0)
            setTenzies(false)
            setDice(allNewDice())
            setTimer(true)
        }
    }
    
    function holdDice(id) {
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        
        if (!tenzies && !allSameValue) {
            setStopStart(true)
        } 

        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)

        if (allSameValue && allHeld) {
            setStopStart(false)
            setTester(true)
        }

        let newTime = {
            time: time,
            id: nanoid()
        }

        setDone(true)

    }, [tenzies])
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="rolls-and-timer">
                <Rolls rolls={rolls}/>
                <StopWatch start={stopStart} timer={timer} time={time} tester={tester} done={done} />
            </div>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )

}