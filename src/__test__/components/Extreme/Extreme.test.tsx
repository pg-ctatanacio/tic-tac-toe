import { render, screen } from "@testing-library/react"
import Extreme from "../../../components/Extreme/Extreme"

describe('Test Extreme Game', () => {

    it('should render Extreme component', () => {
        render(<Extreme />);
        const elem = screen.getByText('Extreme TicTac');
        expect(elem).toBeInTheDocument();
    })
    
})
