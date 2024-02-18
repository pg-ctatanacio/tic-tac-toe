import { useState } from "react";
import Board from "../Board/Board";
import "./Extreme.css";
import Button from "../Button";
import { calculateWinner, SoundManager } from "../../utils";

import winningSound from "../../assets/sounds/mixkit-achievement-bell-600.wav";
import noWinnerSound from "../../assets/sounds/mixkit-short-electric-fence-buzz-2966.wav";
import clickSound from "../../assets/sounds/mixkit-classic-click-1117.wav";
import boardClickSound from "../../assets/sounds/mixkit-arcade-game-jump-coin-216.wav";

const Extreme = () => {
	const [xIsNext, setXIsNext] = useState<boolean>(true);
	const [squares, setSquares] = useState<(string | null)[][]>(Array(9).fill(Array(9).fill(null)));
	const [lastMoveIndex, setLastMoveIndex] = useState<number>(0);
	const [boardWinner, setBoardWinner] = useState<(string | null)[]>(Array(9).fill(null));
	const [isFirstMove, setIsFirstMove] = useState<boolean>(true);

	const handlePlay2 = (cellIndex: number, boardNo: number | undefined) => {
		if (boardNo === undefined) {
			console.log("Error board no. not found.");
			return;
		}

		let hasWinner = calculateWinner(squares[boardNo]);

		// Check if board required has winner.
		let requiredBoardHasWin = calculateWinner(squares[lastMoveIndex]);
		if (!hasWinner && boardNo !== lastMoveIndex && !requiredBoardHasWin && !isFirstMove) {
			// console.log('Move should be only done in board # ' + lastMoveIndex);
			return;
		}

		if (hasWinner && boardNo === lastMoveIndex) {
			console.log("Please make a move to other board");
			return;
		}

		if (squares[boardNo][cellIndex] || hasWinner) {
			return;
		}

		const squaresCopy = squares.slice().map((row) => row.slice());
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

			SoundManager.playSound(winningSound);
		}

		// calculate extreme winner
		if (calculateWinner(boardWinnerCopy)) {
			console.log(squaresCopy[boardNo][cellIndex] + " is the winner!");
		}

		if (isFirstMove) {
			setIsFirstMove(false);
		}

		SoundManager.playSound(boardClickSound);
	};

	const renderMoveLabel = () => {
		if (xIsNext) {
			return <span>X is now on the move.</span>;
		} else {
			return <span>O is now on the move.</span>;
		}
	};

	return (
		<div className="extreme-board">
			<div className="extreme-board__title">Extreme TicTac</div>
			<div className="extreme-board__status">{renderMoveLabel()}</div>
			<div className="extreme-board-col">
				<Board
					isFocused={0 === lastMoveIndex && !isFirstMove}
					boardWinner={boardWinner[0]}
					boardNo={0}
					squares={squares[0]}
					onHandleExtremePlay={handlePlay2}
					isExtreme
				/>
				<Board
					isFocused={1 === lastMoveIndex && !isFirstMove}
					boardWinner={boardWinner[1]}
					boardNo={1}
					squares={squares[1]}
					onHandleExtremePlay={handlePlay2}
					isExtreme
				/>
				<Board
					isFocused={2 === lastMoveIndex && !isFirstMove}
					boardWinner={boardWinner[2]}
					boardNo={2}
					squares={squares[2]}
					onHandleExtremePlay={handlePlay2}
					isExtreme
				/>
			</div>
			<div className="extreme-board-col">
				<Board
					isFocused={3 === lastMoveIndex && !isFirstMove}
					boardWinner={boardWinner[3]}
					boardNo={3}
					squares={squares[3]}
					onHandleExtremePlay={handlePlay2}
					isExtreme
				/>
				<Board
					isFocused={4 === lastMoveIndex && !isFirstMove}
					boardWinner={boardWinner[4]}
					boardNo={4}
					squares={squares[4]}
					onHandleExtremePlay={handlePlay2}
					isExtreme
				/>
				<Board
					isFocused={5 === lastMoveIndex && !isFirstMove}
					boardWinner={boardWinner[5]}
					boardNo={5}
					squares={squares[5]}
					onHandleExtremePlay={handlePlay2}
					isExtreme
				/>
			</div>
			<div className="extreme-board-col">
				<Board
					isFocused={6 === lastMoveIndex && !isFirstMove}
					boardWinner={boardWinner[6]}
					boardNo={6}
					squares={squares[6]}
					onHandleExtremePlay={handlePlay2}
					isExtreme
				/>
				<Board
					isFocused={7 === lastMoveIndex && !isFirstMove}
					boardWinner={boardWinner[7]}
					boardNo={7}
					squares={squares[7]}
					onHandleExtremePlay={handlePlay2}
					isExtreme
				/>
				<Board
					isFocused={8 === lastMoveIndex && !isFirstMove}
					boardWinner={boardWinner[8]}
					boardNo={8}
					squares={squares[8]}
					onHandleExtremePlay={handlePlay2}
					isExtreme
				/>
			</div>
			<div>
				<Button text="Undo" />
				<Button text="Redo" />
			</div>
		</div>
	);
};

export default Extreme;
