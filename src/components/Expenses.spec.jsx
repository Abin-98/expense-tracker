import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Expenses from "./Expenses"

describe("Expenses component", ()=>{
    it('prints Add new transaction', ()=>{
        render(<Expenses/>);
        expect(screen.getByText(/Add new transaction/i)).toBeInTheDocument();
    })
})