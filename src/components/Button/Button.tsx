import './Button.css';

type ButtonType = {
    text: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    disabled?: boolean;
}

const Button = ({ text, style, disabled = false, onClick }:  ButtonType) => {
    let cursorType = 'pointer';
    if (disabled) {
        cursorType = 'not-allowed';
    }

    return <button style={{...style, ...{cursor: cursorType}}} 
        className="button" 
        onClick={onClick} 
        disabled={disabled}>
            {text}
    </button>
}

export default Button;