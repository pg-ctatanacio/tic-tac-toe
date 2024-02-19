import "./Square.css";

type SquareProps = {
    styles?: string;
    size?: number;
};

const SquareSolid = ({ styles, size = 48 }: SquareProps) => {
    return (
		<button style={{height: size, width: size}} className={`square ${styles}`} disabled></button>
	);
}

export default SquareSolid;