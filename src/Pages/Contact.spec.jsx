import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import Contact from "./Contact"

describe("Contact component", ()=>{
    test('prints Contact Details', ()=>{
        render(<Contact/>);
        expect(screen.getByText(/Contact Details/i).toBeInTheDocument());
    })

    test("prints Update", ()=>{
        render(<Contact/>)
        expect(screen.getByText(/Update/i).toBeInTheDocument());
    })
})