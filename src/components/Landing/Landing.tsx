import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

import SquareShake from "../Square/SquareShake";
import Button from "../Button";

import "./Landing.css";

const Landing = () => {
    const squares = Array(9).fill(null);
    squares[0] = 'X';
    squares[4] = 'O';
    squares[8] = 'X';

    const squareRefs = useRef<(HTMLButtonElement|null)[]>([]);

    useEffect(() => {
        const randomClickSquares = () => {
            const rand = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
            squareRefs.current[rand]?.click();
        }

        const interval = setInterval(() => {
            randomClickSquares();
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="landing">
            <div className="landing__title doodle-border">
                <span>Tictactoe</span>
            </div>
            <div className="landing__logo">
                <DummyBoard squares={squares} squareRefs={squareRefs} />
            </div>
            <div className="landing__navigation">
                <LinkButton path="/basic" text="Basic Game" />
                <LinkButton path="/extreme" text="Extreme Mode" />
            </div>
        </div>
    )
}

type DummyBoard = {
    squares: (string | null)[];
    squareRefs: React.RefObject<(HTMLButtonElement|null)[]>
}

const DummyBoard = ({ squares, squareRefs }: DummyBoard) => {
    return (
        <div className={`board-container`}>
            <div className="board-row">
                <SquareShake ref={el => squareRefs.current?.push(el)} value={squares[0]} color={squares[0] === 'X' ? '#d529a2' : '#385ff7'} />
                <SquareShake ref={el => squareRefs.current?.push(el)} value={squares[1]} color={squares[1] === 'X' ? '#d529a2' : '#385ff7'} />
                <SquareShake ref={el => squareRefs.current?.push(el)} value={squares[2]} color={squares[2] === 'X' ? '#d529a2' : '#385ff7'} />
            </div>
            <div className="board-row">
                <SquareShake ref={el => squareRefs.current?.push(el)} value={squares[3]} color={squares[3] === 'X' ? '#d529a2' : '#385ff7'} />
                <SquareShake ref={el => squareRefs.current?.push(el)} value={squares[4]} color={squares[4] === 'X' ? '#d529a2' : '#385ff7'} />
                <SquareShake ref={el => squareRefs.current?.push(el)} value={squares[5]} color={squares[5] === 'X' ? '#d529a2' : '#385ff7'} />
            </div>
            <div className="board-row">
                <SquareShake ref={el => squareRefs.current?.push(el)} value={squares[6]} color={squares[6] === 'X' ? '#d529a2' : '#385ff7'} />
                <SquareShake ref={el => squareRefs.current?.push(el)} value={squares[7]} color={squares[7] === 'X' ? '#d529a2' : '#385ff7'} />
                <SquareShake ref={el => squareRefs.current?.push(el)} value={squares[8]} color={squares[8] === 'X' ? '#d529a2' : '#385ff7'} />
            </div>
        </div>
    )
}

type LinkButtonType = {
    path: string;
    text: string;
}

const LinkButton = ({ path, text }: LinkButtonType) => {
    return (
        <Link to={path}>
            <Button text={text} />
        </Link>
    )
}

export default Landing;