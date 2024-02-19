import { useEffect, useState } from "react";
import "./Square.css";

type SquareShakeProps = {
    styles?: string;
    size?: number;
    shakeOnRender?: boolean;
};

const SquareShakeSolid = ({ styles, size = 48, shakeOnRender = false }: SquareShakeProps) => {
    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (shakeOnRender) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    }, [shakeOnRender]);

	return (
		<button style={{height: size, width: size}} className={`square ${styles} ` +  (shake ? `shake` : null)} disabled></button>
	);
};

export default SquareShakeSolid;
