// ASSESSMENT 4: REACT ASSESSMENT
// As a developer, you are tasked with commenting this code.
// There are 13 sections that need comments.
// Each section is marked with // Here: for JavaScript code and {/* Here: */} for JSX code.
// Comments will describe the code on the line below the comment marks.

import React, { Component } from 'react'

// importing a css file for use in this component and its children
import './App.css';

class App extends Component{
  render(){
    return(
      <div>
        {/* Child class being used in this component.  Will display Board here. */}
        <Board />
      </div>
    )
  }
}

class Board extends Component{
  constructor(){
    // Inherit properties of Component class
    super()
    // Constructor to set state of each new board.
    // gameBoard is an array of 9 null values
    // current player is a unicorn
    // and there is no winner yet
    this.state = {
      gameBoard: Array(9).fill(null),
      currentPlayer: "🦄",
      clickCount: 0, // Adding this to make code functional
      winner: null,
    }
  }

  gamePlay = (index) => {
    // destructuring values from state
    const { gameBoard, currentPlayer, winner, clickCount } = this.state
    // 4) if square is open and no winner
    if(gameBoard[index] === null && winner === null){
      //Assign current player to index possition
      gameBoard[index] = currentPlayer
      //update state with new gameboard, change player, and increment turn
      this.setState({
        gameBoard: gameBoard,
        currentPlayer: currentPlayer === "🦄" ? "🦆" : "🦄",
        clickCount: clickCount+1
      })
    }
    if(winner === null){
      // Check to see if a win state is met
      this.winning()
    }
  }

  winning = () => {
    const { currentPlayer, gameBoard } = this.state
    let winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    winningConditions.map(value => {
      const [a, b, c] = value
      //if a, b, and c indexs of gameboard match
      if(gameBoard[a] 
        && gameBoard[a] === gameBoard[b] 
        && gameBoard[a] === gameBoard[c]){
        //Set winner to current player 
        this.setState({
          winner: currentPlayer
        })
      }
    })
  }

  render(){
    const { gameBoard, currentPlayer, winner } = this.state
    // setting our squares to a variable that will be rendered later
    // map returns an array
    let mappedGameBoard = gameBoard.map((value, index) => {
      return(
        <Square
          value={ value }
          index={ index }
          key={ index }
          {/* This is the function that we want to call on a click */}
          gamePlay={ this.gamePlay }
        />
      )
    })
    return(
      <div>
        <h1>Tic Tac Toe</h1>

          <div className="statusDiv">
            {/* Destructured part of state,  the current player */}
            The Current Player is: { currentPlayer }
          </div>

          <div className="statusDiv">
            {/* More destructure state, if there is a winner, here they are */}
            The Winner is: { winner }
          </div>

          <div id="outcomeBoard">
            {/* display our array of squares */}
            { mappedGameBoard }
          </div>

      </div>
    )
  }
}

class Square extends Component{

  handleSquareClick = () => {
    // each click passes squares index up to gamePlay to update board state, and check for winner
    this.props.gamePlay(this.props.index)
  }

  render(){
    return(
      <div id="square" onClick={ this.handleSquareClick }>
        {/* Renders squares index of gameBoard in parent */}
        { this.props.value }
      </div>
    )
  }
}

export default App
