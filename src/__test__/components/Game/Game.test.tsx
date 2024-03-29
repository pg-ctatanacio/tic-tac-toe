import { fireEvent, render, screen } from "@testing-library/react"
import Game from "../../../components/Game/Game";

describe('Test Regular Game', () => {

    it('should render Game component', () => {
        render(<Game />);
        const elem = screen.getByText('TicTacToe');
        expect(elem).toBeInTheDocument();
    })

    it ('should render 9 square components', () => {
        const { container } = render(<Game />);

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const squares = container.getElementsByClassName('square');
        expect(squares.length).toBe(9);
    })

    it ('should change the square value when clicked', () => {
        const { container } = render(<Game />);

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const squares = container.getElementsByClassName('square');
        
        fireEvent.click(squares[0]);

        expect(squares[0]).toHaveTextContent('X');
    })

    it ('should set the value to O if next player clicks the button', () => {
        const { container } = render(<Game />);

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const squares = container.getElementsByClassName('square');
        
        fireEvent.click(squares[0]);
        fireEvent.click(squares[1]);

        expect(squares[1]).toHaveTextContent('O');
    });

    it ('should X win', () => {
        const { container } = render(<Game />);

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const squares = container.getElementsByClassName('square');
        
        fireEvent.click(squares[0]);
        fireEvent.click(squares[1]);
        fireEvent.click(squares[2]);
        fireEvent.click(squares[3]);
        fireEvent.click(squares[4]);
        fireEvent.click(squares[5]);
        fireEvent.click(squares[6]);

        const elem = screen.getByText('Winner: X');
        expect(elem).toBeInTheDocument();
    });

})
