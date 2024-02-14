import Square from "../Square/Square";
import SquareSolid from "../Square/SquareSolid";
import "./Board.css";
import { calculateWinner } from "../../utils";

type BoardType = {
    isFirstMove: boolean;
    boardWinner?: string|null;
    lastMoveIndex?: number;
    boardNo?: number;
	squares: (string | null)[];
    boardStyles?: string; 
    onHandlePlay?: (cellIndex: number) => void;
    isExtreme?: boolean;
    onHandleExtremePlay?: (cellIndex: number, boardNo: number|undefined) => void;
};

const Board = ({ isFirstMove, boardWinner, lastMoveIndex, boardNo, squares, onHandlePlay, isExtreme = false, onHandleExtremePlay }: BoardType) => {
    const handleSquareClick = (cellIndex: number, boardNo: number|undefined) => {
        if (isExtreme && onHandleExtremePlay) {
            onHandleExtremePlay(cellIndex, boardNo);
        }

        if (onHandlePlay && !onHandleExtremePlay) {
            onHandlePlay(cellIndex)
        }
    }

    const renderBoard = () => {
        let rows = [];
        for (let i = 0; i < 3; i++) {
            let columns = [];
            for (let j = 0; j < 3; j++) {
                // (row * 3) + col
                let index = (i * 3) + j;

                // columns.push(<Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} />);

                if (calculateWinner(squares)) {
                    if (boardWinner === 'X') {
                        if ([0,2,4,6,8].includes(index)) {
                            columns.push(<SquareSolid styles="square-solid-x" key={index} value={null} />);
                        } else {
                            columns.push(<SquareSolid key={index} value={null} />);
                        }
                    } else if (boardWinner === 'O') {
                        if ([0,1,2,3,5,6,7,8].includes(index)) {
                            columns.push(<SquareSolid key={index} styles="square-solid-o" value={null} />);
                        } else {
                            columns.push(<SquareSolid key={index} value={null} />);
                        }
                    } else {
                        columns.push(<Square key={index} value={squares[index]} onSquareClick={() => handleSquareClick(index, boardNo)} />);
                    }
                } else {
                    columns.push(<Square key={index} value={squares[index]} onSquareClick={() => handleSquareClick(index, boardNo)} />);
                }
                
            }

            rows.push(<div key={i} className="board-row">{columns}</div>);
        }

        return rows;
    }

    const getBoardHighlight = () => {
        let highlight = '';
        if (boardNo === lastMoveIndex && !isFirstMove) {
            highlight = 'board-highlight-focus';
        } 
        // else if (calculateWinner(squares)) {
        //     highlight = 'board-highlight-win';
        // }

        return highlight
    }

	return (
		<div className={`board-container ${getBoardHighlight()}`}>
			{/* <div className="status">{status}</div> */}
            {renderBoard()}
		</div>
	);
};

export default Board;
