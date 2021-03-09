

import React, { useContext, useState, useRef, useEffect } from 'react'
import Cell from './Cell'
import './Board.css'

const nrows = 5
const ncols = 5
const chanceLightStartsOn = 0.25
const Board = () => {
    const createBoard = () => {
        let boardh = []
        // TODO: create array-of-arrays of true/false values
        for (let y = 0; y < nrows; y++) {
            let row = []
            for (let x = 0; x < ncols; x++) {
                row.push(Math.random() < chanceLightStartsOn)
            }
            boardh.push(row)
        }
        return boardh
    }
    const [hasWon, setHasWon] = useState(false)
    const [board, setBoard] = useState(createBoard)
   useEffect(()=>{
     console.log("cscs");
   })
    const makeTable = () => {
         let tblBoard = []
        for (let y = 0; y < nrows; y++) {
            let row = []
            for (let x = 0; x < ncols; x++) {
                let coord = `${y}-${x}`
                row.push(<Cell key={coord} isLit={board[y][x]} flipCellsAroundMe={() => flipCellsAround(coord)} />)
            }
            tblBoard.push(<tr key={y}>{row}</tr>)
        }
        return tblBoard
        // console.log(tblBoard);
        // return (
        //     <table className='Board'>
        //         <tbody>{tblBoard}</tbody>
        //     </table>
        // )
    }
    const flipCellsAround = (coord) => {
      let [y, x] = coord.split('-').map(Number)

      const flipCell = (y, x) => {
          // if this coord is actually on board, flip it

          if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
              board[y][x] = !board[y][x]
          }
      }
      // TODO: flip this cell and the cells around it
      flipCell(y, x) //Flip initial cell
      flipCell(y, x - 1) //flip left
      flipCell(y, x + 1) //flip right
      flipCell(y - 1, x) //flip below
      flipCell(y + 1, x) //flip above

      // win when every cell is turned off
      // TODO: determine is the game has been won
      let hasWon = board.every((row) => row.every((cell) => !cell))
      console.log("cscs");
      setHasWon(hasWon)
      setBoard(board)
      // this.setState({ board: board, hasWon: hasWon });
  }
    return (
        <div>
            {hasWon ? (
                <div className='winner'>
                    <span className='neon-orange'>YOsU</span>
                    <span className='neon-blue'>WIN!</span>
                </div>
            ) : (
                <div>
                    <div className='Board-title'>
                        <div className='neon-orange'>Ligdvdhts</div>
                        <div className='neon-blue'>Out</div>
                    </div>
                    {/* {makeTable()} */}
                    <table className='Board'>
                <tbody>{makeTable()}</tbody>
            </table>
                </div>
           )}
        </div>
    )
}
export default Board
