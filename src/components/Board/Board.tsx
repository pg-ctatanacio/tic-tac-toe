import Square from "../Square/Square";
import SquareSolid from "../Square/SquareSolid";
import "./Board.css";

type BoardType = {
    isFirstMove: boolean;
    boardWinner?: string|null;
    lastMoveIndex?: number;
	xIsNext: boolean;
    boardNo: number;
	squares: (string | null)[];
	onPlay: (boardNo: number, nextSquares: (string | null)[], moveIndex: number, winner: string|null) => void;
    onHandlePlay?: (boardNo: number, cellIndex: number) => void;
};

const Board = ({ isFirstMove, boardWinner, lastMoveIndex, xIsNext, boardNo, squares, onPlay, onHandlePlay }: BoardType) => {
    // console.log('board winner: ' + boardWinner);

    // board should not handle the ways on how to win
    // it should be inside game component.
	const handleClick = (i: number) => {
        // console.log('calculate winner onclick: ', calculateWinner(squares));

        // extreme mode restriction
        let hasWinner = calculateWinner(squares);
        if ((boardNo !== lastMoveIndex)) {
            console.log('Move should be only done in board # ' + lastMoveIndex);
            return;
        }

        // -- end extreme mode restriction

        if (squares[i] || calculateWinner(squares)) {
			return;
		}

		const nextSquares = squares.slice();
		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}

        let winner = null;
        console.log('calculate winner onclick: ', calculateWinner(squares));
        if (calculateWinner(nextSquares)) {
            winner = nextSquares[i];
        }

		onPlay(boardNo, nextSquares, i, winner);
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

	// const winner = calculateWinner(squares);
	// let status;
	// if (winner) {
	// 	status = "Winner: " + winner;
	// } else {
	// 	status = "Next player: " + (xIsNext ? "X" : "O");
	// }

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
                        columns.push(<Square key={index} value={squares[index]} onSquareClick={() => (onHandlePlay) && onHandlePlay(boardNo, index)} />);
                    }
                } else {
                    columns.push(<Square key={index} value={squares[index]} onSquareClick={() => (onHandlePlay) && onHandlePlay(boardNo, index)} />);
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
