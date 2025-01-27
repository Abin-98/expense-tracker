import { describe, expect, test } from 'vitest'
import Sample from './sample'
import { render, screen } from '@testing-library/react';

 describe("sample", ()=>{
    test('prints Contact Details', ()=>{
        render(<Sample/>);
        expect(screen.getByText(/sample/i)).toBeInTheDocument();
    })

})