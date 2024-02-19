import { useEffect, useState } from "react";
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
	const [boardWinner, setBoardWinner] = useState<(string | null)[]>(Array(9).fill(null));
	const [isFirstMove, setIsFirstMove] = useState<boolean>(true);
    const [winner, setWinner] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const [history, setHistory] = useState<(string | null)[][][]>([Array(9).fill(Array(9).fill(null))]);
    const [lastMoveIdxArr, setLastMoveIdxArr] = useState<number[]>([]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const currentSquares = history[currentMove];

	const handlePlay = (cellIndex: number, boardNo: number | undefined) => {
		if (boardNo === undefined) {
			console.error("Error board no. not found.");
			return;
		}

        // Check if Game has winner.
        if (winner) {
            return;
        }

		let hasWinner = calculateWinner(currentSquares[boardNo]);

        if (currentMove) {
            // Check if board required has winner.
            let requiredBoardHasWin = calculateWinner(currentSquares[lastMoveIdxArr[currentMove - 1]]);
            if (!hasWinner && boardNo !== lastMoveIdxArr[currentMove - 1] && !requiredBoardHasWin && !isFirstMove) {
                setError('Move should be only done in board # ' + (lastMoveIdxArr[currentMove - 1] + 1));
                return;
            }

            // If user clicks to a board that already have a winner.
            if (hasWinner && boardNo === lastMoveIdxArr[currentMove]) {
                setError("Please make a move to other board");
                return;
            }
        }

        if (currentSquares[boardNo][cellIndex] || hasWinner) {
            return;
        }

        const squaresCopy = currentSquares.slice().map((row) => row.slice());
        if (xIsNext) {
            squaresCopy[boardNo][cellIndex] = "X";
        } else {
            squaresCopy[boardNo][cellIndex] = "O";
        }

        let boardWinnerCopy = Array(9).fill(null);
        if (calculateWinner(squaresCopy[boardNo])) {
            let winner = squaresCopy[boardNo][cellIndex];
            boardWinnerCopy = boardWinner.slice();
            boardWinnerCopy[boardNo] = winner;
            setBoardWinner(boardWinnerCopy);

            SoundManager.playSound(winningSound);
        }

        // calculate extreme game winner
        if (calculateWinner(boardWinnerCopy)) {
            setWinner(squaresCopy[boardNo][cellIndex]);
        } 

        if (isFirstMove) {
            setIsFirstMove(false);
        }

        const nextHistory = [...history.slice(0, currentMove + 1), squaresCopy];
        setHistory(nextHistory);

        const nextMoveIdxArr = lastMoveIdxArr.slice(0, currentMove);
        nextMoveIdxArr.push(cellIndex);

        setLastMoveIdxArr(nextMoveIdxArr);
        setXIsNext(!xIsNext);
        setError('');
        setCurrentMove(nextHistory.length - 1);

		SoundManager.playSound(boardClickSound);
	};

    const handleUndo = () => {
        if (currentMove > 0) {
			setCurrentMove(currentMove - 1);
            setError('');
		}

		SoundManager.playSound(clickSound);
    }

    const handleRedo = () => {
		if (currentMove < history.length - 1) {
			setCurrentMove(currentMove + 1);
            setError('');
		}

		SoundManager.playSound(clickSound);
	};

    const handleRestart = () => {
        setXIsNext(true);
        setBoardWinner((Array(9).fill(null)));
        setIsFirstMove(true);
        setWinner(null);
        setError('');
        setHistory([Array(9).fill(Array(9).fill(null))]);
        setLastMoveIdxArr([]);
        setCurrentMove(0);
    }

    const renderControls = () => {
        if (winner) {
			return <Button text="Restart" style={{ width: "100%" }} onClick={handleRestart} />;
		} else {
			return (
				<>
					<Button text="Undo" onClick={handleUndo} disabled={currentMove === 0} />
					<Button text="Redo" onClick={handleRedo} disabled={currentMove >= history.length - 1} />
				</>
			);
		}
    }

	const renderMoveLabel = () => {
        if (winner) {
            return winner + " is the winner!"
        }

		if (xIsNext) {
			return 'X is now on the move.';
		} else {
			return 'O is now on the move.';
		}
	};

	return (
		<div className="extreme-board">
			<div className="extreme-board__title">Extreme TicTac</div>
			<div className="extreme-board__status">{renderMoveLabel()}</div>
			<div className="extreme-board__error">{error}</div>
			<div className="extreme-board-col">
				<Board
					isFocused={0 === lastMoveIdxArr[currentMove - 1] && !isFirstMove}
					boardWinner={boardWinner[0]}
					boardNo={0}
					squares={currentSquares[0]}
					onHandleExtremePlay={handlePlay}
					isExtreme
				/>
				<Board
					isFocused={1 === lastMoveIdxArr[currentMove - 1] && !isFirstMove}
					boardWinner={boardWinner[1]}
					boardNo={1}
					squares={currentSquares[1]}
					onHandleExtremePlay={handlePlay}
					isExtreme
				/>
				<Board
					isFocused={2 === lastMoveIdxArr[currentMove - 1] && !isFirstMove}
					boardWinner={boardWinner[2]}
					boardNo={2}
					squares={currentSquares[2]}
					onHandleExtremePlay={handlePlay}
					isExtreme
				/>
			</div>
			<div className="extreme-board-col">
				<Board
					isFocused={3 === lastMoveIdxArr[currentMove - 1] && !isFirstMove}
					boardWinner={boardWinner[3]}
					boardNo={3}
					squares={currentSquares[3]}
					onHandleExtremePlay={handlePlay}
					isExtreme
				/>
				<Board
					isFocused={4 === lastMoveIdxArr[currentMove - 1] && !isFirstMove}
					boardWinner={boardWinner[4]}
					boardNo={4}
					squares={currentSquares[4]}
					onHandleExtremePlay={handlePlay}
					isExtreme
				/>
				<Board
					isFocused={5 === lastMoveIdxArr[currentMove - 1] && !isFirstMove}
					boardWinner={boardWinner[5]}
					boardNo={5}
					squares={currentSquares[5]}
					onHandleExtremePlay={handlePlay}
					isExtreme
				/>
			</div>
			<div className="extreme-board-col">
				<Board
					isFocused={6 === lastMoveIdxArr[currentMove - 1] && !isFirstMove}
					boardWinner={boardWinner[6]}
					boardNo={6}
					squares={currentSquares[6]}
					onHandleExtremePlay={handlePlay}
					isExtreme
				/>
				<Board
					isFocused={7 === lastMoveIdxArr[currentMove - 1] && !isFirstMove}
					boardWinner={boardWinner[7]}
					boardNo={7}
					squares={currentSquares[7]}
					onHandleExtremePlay={handlePlay}
					isExtreme
				/>
				<Board
					isFocused={8 === lastMoveIdxArr[currentMove - 1] && !isFirstMove}
					boardWinner={boardWinner[8]}
					boardNo={8}
					squares={currentSquares[8]}
					onHandleExtremePlay={handlePlay}
					isExtreme
				/>
			</div>
			<div className="extreme-board__controls">{renderControls()}</div>
		</div>
	);
};

export default Extreme;
