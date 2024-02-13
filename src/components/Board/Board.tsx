import Square from "../Square/Square";
import "./Board.css";

type BoardType = {
	xIsNext: boolean;
	squares: (string | null)[];
	onPlay: (nextSquares: (string | null)[]) => void;
};

const Board = ({ xIsNext, squares, onPlay }: BoardType) => {
	const handleClick = (i: number) => {
		if (squares[i] || calculateWinner(squares)) {
			return;
		}

		const nextSquares = squares.slice();

		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}

		onPlay(nextSquares);
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

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = "Winner: " + winner;
	} else {
		status = "Next player: " + (xIsNext ? "X" : "O");
	}

    const renderBoard = () => {
        let rows = [];
        for (let i = 0; i < 3; i++) {
            let columns = [];
            for (let j = 0; j < 3; j++) {
                // (row * 3) + col
                let index = (i * 3) + j;
                columns.push(<Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} />);
            }

            rows.push(<div key={i} className="board-row">{columns}</div>);
        }

        return rows;
    }

	return (
		<>
			<div className="status">{status}</div>
            {renderBoard()}
		</>
	);
};

export default Board;
