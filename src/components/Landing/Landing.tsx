import { Link } from "react-router-dom";
import Button from "../Button";
import "./Landing.css";

const Landing = () => {
    return (
        <div className="landing">
            <div className="landing__navigation">
                <LinkButton path="/basic" text="Basic Game" />
                <LinkButton path="/extreme" text="Extreme Mode" />
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