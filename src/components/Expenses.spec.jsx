import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Expenses from "./Expenses"

describe("Expenses component", () => {
    it('prints Add new transaction', () => {
        render(<Expenses/>);
        expect(screen.getByText(/Add new transaction/i)).toBeInTheDocument();
    })

    it('renders expenses', async () => {

        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{id: '1', name: 'name'}],
        })
        render(<Expenses/>);
        
        const listItems = await screen.findAllByRole('listitem');
        expect(listItems).not.toHaveLength(0);
    })
})