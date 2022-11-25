import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    const styleOne = {
        top: '2px',
        backgroundColor: 'red'
    }

    function Dots() {
        if (props.value === 1) {
            return <div>
                <div className="dot"></div>
            </div>
        } else if (props.value === 2) {
            return <div className="two-wrapper">
                <div className="two-one dot"></div>
                <div className="two-two dot"></div>
            </div>
        } else if (props.value === 3) {
            return <div className="three-wrapper">
                <div className="three-one dot"></div>
                <div className="three-two dot"></div>
                <div className="three-three dot"></div>
            </div>
        } else if (props.value === 4) {
            return <div className="four-wrapper">
                <div className="four-one dot"></div>
                <div className="four-two dot"></div>
                <div className="four-three dot"></div>
                <div className="four-four dot"></div>
            </div>
        } else if (props.value === 5) {
            return <div className="five-wrapper">
                <div className="five-one dot"></div>
                <div className="five-two dot"></div>
                <div className="five-three dot"></div>
                <div className="five-four dot"></div>
                <div className="five-five dot"></div>
            </div>
        } else if (props.value === 6) {
            return <div className="six-wrapper">
                <div className="six-one dot"></div>
                <div className="six-two dot"></div>
                <div className="six-three dot"></div>
                <div className="six-four dot"></div>
                <div className="six-five dot"></div>
                <div className="six-six dot"></div>
            </div>
        }
    }


    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <Dots />
        </div>
    )
}