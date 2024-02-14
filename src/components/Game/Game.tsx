import { useState } from "react";
import Board from "../Board/Board";
import "./Game.css";

const Game = () => {
	const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState<number>(0);
	const currentSquares = history[currentMove];
	const xIsNext = currentMove % 2 === 0;

	const handlePlay = (cellIndex: number) => {
        if (currentSquares[cellIndex] || calculateWinner(currentSquares)) {
			return;
		}

		const nextSquares = currentSquares.slice();
		if (xIsNext) {
			nextSquares[cellIndex] = "X";
		} else {
			nextSquares[cellIndex] = "O";
		}

		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	};

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

	const jumpTo = (nextMove: number) => {
		setCurrentMove(nextMove);
	};

	const moves = history.map((squares, move) => {
		let description;
		if (move === 0 && move !== currentMove) {
			description = "Go to game start";
		} else if (move > 0 && move !== currentMove) {
			description = "Go to move #" + move;
		} else {
			description = "You are at move #" + move;
		}

		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	});

    const winner = calculateWinner(currentSquares);
	let status;
	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
	}

	return (
		<div className="game">
			<div className="game-board">
                <div>TicTac</div>
                <div>{status}</div>
				<Board isFirstMove={false} boardNo={0} squares={currentSquares} onHandlePlay={handlePlay} />
			</div>
			<div className="game-info">
				<ol>{moves}</ol>
			</div>
		</div>
	);
};

export default Game;
