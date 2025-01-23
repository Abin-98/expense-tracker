import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import Welcome from "./Welcome"
import userEvent from "@testing-library/user-event"

describe("Welcome component", ()=>{
    test('prints Welcome to Expense Tracker', ()=>{
        render(<Welcome/>);
        expect(screen.getByText(/Welcome to Expense Tracker!!/i).toBeInTheDocument());
    })
    test('prints Verify Email', ()=>{
        render(<Welcome/>);
        expect(screen.getByText(/Verify Email/i).toBeInTheDocument());
    })
    test('prints Update your profile', ()=>{
        render(<Welcome/>);
        expect(screen.getByText(/Update your profile/i).toBeInTheDocument());
    })
    test('prints Welcome to Expense Tracker', ()=>{
        render(<Welcome/>);

        // userEvent.click()
        expect(screen.getByRole(/DRK/i).toBeInTheDocument());
    })
})