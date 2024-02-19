import { fireEvent, render, screen } from "@testing-library/react"
import Extreme from "../../../components/Extreme/Extreme"

describe('Test Extreme Game', () => {

    it('should render Extreme component', () => {
        render(<Extreme />);
        const elem = screen.getByText('Extreme TicTac');
        expect(elem).toBeInTheDocument();
    })
    
    it ('should render 81 square components', () => {
        const { container } = render(<Extreme />);

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const squares = container.getElementsByClassName('square');
        expect(squares.length).toBe(81);
    })

    it ('should change the square value when clicked', () => {
        const { container } = render(<Extreme />);

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const squares = container.getElementsByClassName('square');
        
        fireEvent.click(squares[0]);

        expect(squares[0]).toHaveTextContent('X');
    })

    it ('should set the value to O if next player clicks the button', () => {
        const { container } = render(<Extreme />);

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const squares = container.getElementsByClassName('square');
        
        fireEvent.click(squares[0]);
        fireEvent.click(squares[1]);

        expect(squares[1]).toHaveTextContent('O');
    });

    it ('should not able to set the value to O if next player clicks the button on the next board', () => {
        const { container } = render(<Extreme />);

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const squares = container.getElementsByClassName('square');
        
        fireEvent.click(squares[0]);
        fireEvent.click(squares[9]);

        expect(squares[9]).toHaveTextContent('');
    });
})
