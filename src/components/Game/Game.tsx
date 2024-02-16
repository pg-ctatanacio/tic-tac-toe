import { useState } from "react";
import Board from "../Board/Board";
import Button from "../Button";
import winningSound from '../../assets/sounds/mixkit-achievement-bell-600.wav';
import noWinnerSound from '../../assets/sounds/mixkit-short-electric-fence-buzz-2966.wav';
import clickSound from '../../assets/sounds/mixkit-classic-click-1117.wav';
import boardClickSound from '../../assets/sounds/mixkit-arcade-game-jump-coin-216.wav';
import { calculateWinner, playSound } from "../../utils";

import "./Game.css";

const Game = () => {
	const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState<number>(0);
    const [winner, setWinner] = useState<string|null>(null);
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

        if (calculateWinner(nextSquares)) {
            setWinner(nextSquares[cellIndex]);
        }

        playSound(boardClickSound);
	};

    const handleUndo = () => {
        if (currentMove > 0) {
            setCurrentMove(currentMove - 1);
        }

        playSound(clickSound);
    }

    const handleRedo = () => {
        if (currentMove < history.length - 1) {
            setCurrentMove(currentMove + 1);
        }

        playSound(clickSound);
    }

    const handleRestart = () => {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setWinner(null);

        playSound(clickSound);
    }

    const renderControls = () => {
        if (winner || !checkGameStillRunning()) {
            return <Button text='Restart' style={{width: '100%'}} onClick={handleRestart} />
        } else {
            return (
                <>
                    <Button text='Undo' onClick={handleUndo} disabled={currentMove === 0} />
                    <Button text='Redo' onClick={handleRedo} disabled={currentMove >= history.length - 1} />
                </>
            )
        }
    }

    const checkGameStillRunning = () => {
        return !calculateWinner(currentSquares) && currentSquares.some(e => e === null);
    }

	let status;
	if (winner) {
		status = "Winner: " + winner;
        playSound(winningSound);
    } else if (!checkGameStillRunning()) {
        status = "Too bad we don't have a winner...";
        playSound(noWinnerSound);
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
	}

	return (
		<div className="game">
            <div className="game__title">TicTacToe</div>
            <div className="game__status">{status}</div>
            <div className="game__board">
                <Board boardWinner={winner} squares={currentSquares} onHandlePlay={handlePlay} />
            </div>
            <div className="game__controls">
                {renderControls()}
            </div>
		</div>
	);
};

export default Game;
