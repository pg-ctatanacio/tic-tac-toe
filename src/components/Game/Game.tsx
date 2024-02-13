import { useState } from "react";
import Board from "../Board/Board";
import "./Game.css";

const Game = () => {
	const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState<number>(0);
	const currentSquares = history[currentMove];
	const xIsNext = currentMove % 2 === 0;

	const handlePlay = (boardNo: number, nextSquares: (string | null)[]) => {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
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

	return (
		<div className="game">
			<div className="game-board">
				<Board isFirstMove={false} xIsNext={xIsNext} boardNo={0} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className="game-info">
				<ol>{moves}</ol>
			</div>
		</div>
	);
};

export default Game;
