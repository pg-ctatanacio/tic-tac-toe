import { useState } from "react";
import Board from "../Board/Board";
import './Extreme.css'

const Extreme = () => {
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [squares, setSquares] = useState<(string | null)[][]>(Array(9).fill(Array(9).fill(null)));
    const [lastMoveIndex, setLastMoveIndex] = useState<number>(0);
    const [boardWinner, setBoardWinner] = useState<(string | null)[]>(Array(9).fill(null));
    const [isFirstMove, setIsFirstMove] = useState<boolean>(true);

    const handlePlay2 = (cellIndex: number, boardNo: number|undefined) => {
        if (boardNo === undefined) {
            console.log('Error board no. not found.');
            return;
        }

        let hasWinner = calculateWinner(squares[boardNo]);

        // Check if board required has winner.
        let requiredBoardHasWin = calculateWinner(squares[lastMoveIndex]);
        if (!hasWinner && (boardNo !== lastMoveIndex) && !requiredBoardHasWin && !isFirstMove) {
            console.log('Move should be only done in board # ' + lastMoveIndex);
            return;
        }

        if (hasWinner && (boardNo === lastMoveIndex)) {
            console.log('Please make a move to other board');
            return;
        }

        if (squares[boardNo][cellIndex] || hasWinner) {
			return;
		}

		const squaresCopy = squares.slice().map(row => row.slice());
		if (xIsNext) {
			squaresCopy[boardNo][cellIndex] = "X";
		} else {
			squaresCopy[boardNo][cellIndex] = "O";
		}

        setLastMoveIndex(cellIndex);
        setSquares(squaresCopy);
        setXIsNext(!xIsNext);

        let boardWinnerCopy = Array(9).fill(null);
        if (calculateWinner(squaresCopy[boardNo])) {
            let winner = squaresCopy[boardNo][cellIndex];
            boardWinnerCopy = boardWinner.slice();
            boardWinnerCopy[boardNo] = winner;
            setBoardWinner(boardWinnerCopy);
        }

        // calculate extreme winner
        if (calculateWinner(boardWinnerCopy)) {
            console.log(squaresCopy[boardNo][cellIndex] + ' is the winner!');
        }

        if (isFirstMove) {
            setIsFirstMove(false);
        }
    }

    const calculateWinner = (squares: (string | null)[]) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a];
			}
		}

		return null;
	};

    const renderMoveLabel = () => {
        if (xIsNext) {
            return <span>X is now on the move.</span>
        } else {
            return <span>O is now on the move.</span>
        }
    }

    return (
        <>
            <div className="extreme-board">
                <div>Extreme TicTac</div>
                {renderMoveLabel()}
                <div className="extreme-board-col">
                    <Board isFirstMove={isFirstMove} boardWinner={boardWinner[0]} lastMoveIndex={lastMoveIndex} boardNo={0} squares={squares[0]} onHandleExtremePlay={handlePlay2} isExtreme />
                    <Board isFirstMove={isFirstMove} boardWinner={boardWinner[1]} lastMoveIndex={lastMoveIndex} boardNo={1} squares={squares[1]} onHandleExtremePlay={handlePlay2} isExtreme />
                    <Board isFirstMove={isFirstMove} boardWinner={boardWinner[2]} lastMoveIndex={lastMoveIndex} boardNo={2} squares={squares[2]} onHandleExtremePlay={handlePlay2} isExtreme />
                </div>
                <div className="extreme-board-col">
                    <Board isFirstMove={isFirstMove} boardWinner={boardWinner[3]} lastMoveIndex={lastMoveIndex} boardNo={3} squares={squares[3]} onHandleExtremePlay={handlePlay2} isExtreme />
                    <Board isFirstMove={isFirstMove} boardWinner={boardWinner[4]} lastMoveIndex={lastMoveIndex} boardNo={4} squares={squares[4]} onHandleExtremePlay={handlePlay2} isExtreme />
                    <Board isFirstMove={isFirstMove} boardWinner={boardWinner[5]} lastMoveIndex={lastMoveIndex} boardNo={5} squares={squares[5]} onHandleExtremePlay={handlePlay2} isExtreme />
                </div>
                <div className="extreme-board-col">
                    <Board isFirstMove={isFirstMove} boardWinner={boardWinner[6]} lastMoveIndex={lastMoveIndex} boardNo={6} squares={squares[6]} onHandleExtremePlay={handlePlay2} isExtreme />
                    <Board isFirstMove={isFirstMove} boardWinner={boardWinner[7]} lastMoveIndex={lastMoveIndex} boardNo={7} squares={squares[7]} onHandleExtremePlay={handlePlay2} isExtreme />
                    <Board isFirstMove={isFirstMove} boardWinner={boardWinner[8]} lastMoveIndex={lastMoveIndex} boardNo={8} squares={squares[8]} onHandleExtremePlay={handlePlay2} isExtreme />
                </div>
            </div>
        </>
    )
}

export default Extreme;