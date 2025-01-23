import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import Expenses from "./Expenses"

describe("Expenses component", ()=>{
    test('prints Add new transaction', ()=>{
        render(<Expenses/>);
        expect(screen.getByText(/Add new transaction/i).toBeInTheDocument());
    })
})