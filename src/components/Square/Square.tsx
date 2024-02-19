import "./Square.css";

type SquareProps = {
	value: string | null;
	onSquareClick: () => void;
    size?: number;
    color?: string;
};

const Square = ({ value, size = 48, color, onSquareClick }: SquareProps) => {
	return (
		<button style={{height: size, width: size}} className="square" onClick={onSquareClick}>
			<span style={{color: color}} className="square__text">{value}</span>
		</button>
	);
};

export default Square;
