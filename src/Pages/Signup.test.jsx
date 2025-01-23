import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import Signup from "./Signup"

describe("Signup component", ()=>{
    test('prints Have an account?', ()=>{
        render(<Signup/>);
        expect(screen.getByText(/Have an account?/i).toBeInTheDocument());
    })
})