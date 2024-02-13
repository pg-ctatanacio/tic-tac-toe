import "./Square.css";

type SquareProps = {
	value: string | null;
    styles?: string
};

const SquareSolid = ({ value, styles }: SquareProps) => {
    return (
		<button className={`square ${styles}`} disabled>
			{value}
		</button>
	);
}

export default SquareSolid;