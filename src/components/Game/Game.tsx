import { useEffect, useState } from "react";
import Board from "../Board/Board";
import Button from "../Button";
import winningSound from "../../assets/sounds/mixkit-achievement-bell-600.wav";
import noWinnerSound from "../../assets/sounds/mixkit-short-electric-fence-buzz-2966.wav";
import clickSound from "../../assets/sounds/mixkit-classic-click-1117.wav";
import boardClickSound from "../../assets/sounds/mixkit-arcade-game-jump-coin-216.wav";
import toothlessSound from "../../assets/sounds/toothless-dancing.mp3";
import { calculateWinner, SoundManager } from "../../utils";

import "./Game.css";

const Game = () => {
	const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState<number>(0);
	const [winner, setWinner] = useState<string | null>(null);
	const [audio, setAudio] = useState<HTMLAudioElement>(new Audio());
	const currentSquares = history[currentMove];
	const xIsNext = currentMove % 2 === 0;

	useEffect(() => {
		if (winner) {
			let music = SoundManager.playSound(toothlessSound);
			setAudio(music);
		}
	}, [winner]);

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

		if (calculateWinner(nextSquares)) {
			setWinner(nextSquares[cellIndex]);
		}

		SoundManager.playSound(boardClickSound);
	};

	const handleUndo = () => {
		if (currentMove > 0) {
			setCurrentMove(currentMove - 1);
		}

		SoundManager.playSound(clickSound);
	};

	const handleRedo = () => {
		if (currentMove < history.length - 1) {
			setCurrentMove(currentMove + 1);
		}

		SoundManager.playSound(clickSound);
	};

	const handleRestart = () => {
		setHistory([Array(9).fill(null)]);
		setCurrentMove(0);
		setWinner(null);

		SoundManager.playSound(clickSound);
		SoundManager.stopSound(audio);
	};

	const renderControls = () => {
		if (winner || !checkGameStillRunning()) {
			return <Button text="Restart" style={{ width: "100%" }} onClick={handleRestart} />;
		} else {
			return (
				<>
					<Button text="Undo" onClick={handleUndo} disabled={currentMove === 0} />
					<Button text="Redo" onClick={handleRedo} disabled={currentMove >= history.length - 1} />
				</>
			);
		}
	};

	const checkGameStillRunning = () => {
		return !calculateWinner(currentSquares) && currentSquares.some((e) => e === null);
	};

	const getBoardStatus = () => {
		let status;
		if (winner) {
			status = "Winner: " + winner;
		} else if (!checkGameStillRunning()) {
			status = "Too bad we don't have a winner...";
		} else {
			status = "Next player: " + (xIsNext ? "X" : "O");
		}

		return status;
	};

	return (
		<div className="game">
			<div className="game__title">TicTacToe</div>
			<div className="game__status">{getBoardStatus()}</div>
			<div className="game__board">
				<Board boardWinner={winner} squares={currentSquares} onHandlePlay={handlePlay} />
			</div>
			<div className="game__controls">{renderControls()}</div>
		</div>
	);
};

export default Game;
