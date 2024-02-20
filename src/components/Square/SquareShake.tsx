import { forwardRef, useEffect, useState } from "react";
import "./Square.css";

type SquareShakeProps = {
	value: string | null;
	onSquareClick?: () => void;
    size?: number;
    color?: string;
    shakeOnRender?: boolean;
    ref?: React.RefObject<HTMLButtonElement>
};

const SquareShake = forwardRef<HTMLButtonElement, SquareShakeProps>(({value, size = 48, color, onSquareClick, shakeOnRender = false }, ref) => {
    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (shakeOnRender) {
            setShake(true);
            setTimeout(() => setShake(false), 3000);
        }
    }, [shakeOnRender]);

    const animate = () => {
        // Button begins to shake
        setShake(true);

        if (onSquareClick) {
            onSquareClick();
        }
        
        // Buttons stops to shake after X seconds
        setTimeout(() => setShake(false), 200);
    }

	return (
		<button ref={ref} style={{height: size, width: size}} className={`square ` +  (shake ? `shake` : null)} onClick={animate}>
			<span style={{color: color}}  className ="square__text">{value}</span>
		</button>
	);
});

export default SquareShake;
