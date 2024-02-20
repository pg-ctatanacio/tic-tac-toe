import Square from "../Square/Square";
import SquareSolid from "../Square/SquareSolid";
import SquareShake from "../Square/SquareShake";
import SquareShakeSolid from "../Square/SquareShakeSolid";
import { calculateWinner } from "../../utils";

import "./Board.css";
import React from "react";

type BoardType = {
    boardWinner?: string|null;
    boardNo?: number;
	squares: (string | null)[];
    boardStyles?: string; 
    onHandlePlay?: (cellIndex: number) => void;
    isExtreme?: boolean;
    onHandleExtremePlay?: (cellIndex: number, boardNo: number|undefined) => void;
    isFocused?: boolean;
};

const Board = ({ boardWinner, boardNo, squares, onHandlePlay, isExtreme = false, isFocused = false, onHandleExtremePlay }: BoardType) => {
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
                            columns.push(<SquareShakeSolid styles="square-solid-x" key={index} shakeOnRender />);
                        } else {
                            columns.push(<SquareSolid key={index} />);
                        }
                    } else if (boardWinner === 'O') {
                        if ([0,1,2,3,5,6,7,8].includes(index)) {
                            columns.push(<SquareShakeSolid key={index} styles="square-solid-o" shakeOnRender />);
                        } else {
                            columns.push(<SquareSolid key={index} />);
                        }
                    } else {
                        columns.push(<Square key={index} value={squares[index]} onSquareClick={() => handleSquareClick(index, boardNo)} />);
                    }
                } else {
                    let textColor = squares[index] === 'X' ? '#d529a2' : '#385ff7';
                    columns.push(<SquareShake key={index} value={squares[index]} color={textColor} onSquareClick={() => handleSquareClick(index, boardNo)} />);
                }
                
            }

            rows.push(<div key={i} className="board-row">{columns}</div>);
        }

        return rows;
    }

	return (
		<div className={`board-container`}>
            <fieldset className={`board-highlight ${!isFocused ? 'board-highlight-hidden' : ''}`}>
                {renderBoard()}
            </fieldset>
		</div>
	);
};

export default Board;
