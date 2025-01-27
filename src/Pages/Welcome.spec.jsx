import { render as rtlRender, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"
import Welcome from "./Welcome"
import { Provider } from 'react-redux'
import userEvent from "@testing-library/user-event"
import store from "../store/store"
import ContextProvider from "../context/contextProvider"

const render = component => rtlRender(
    <Provider store={store}>
        <ContextProvider>
        {component}
        </ContextProvider>
    </Provider>
)

describe("Welcome component", ()=>{
    test('prints Welcome to Expense Tracker', ()=>{
        render(<Welcome/>);
        expect(screen.getByText(/Welcome to Expense Tracker!!/i)).toBeInTheDocument();
    })
    test('prints Verify Email', ()=>{
        render(<Welcome/>);
        expect(screen.getByText(/Verify Email/i)).toBeInTheDocument();
    })
    test('prints Update your profile', ()=>{
        render(<Welcome/>);
        expect(screen.getByText(/Update your profile/i)).toBeInTheDocument();
    })
    test('prints Welcome to Expense Tracker', ()=>{
        render(<Welcome/>);

        // userEvent.click()
        expect(screen.getByRole(/DRK/i)).toBeInTheDocument();
    })
})