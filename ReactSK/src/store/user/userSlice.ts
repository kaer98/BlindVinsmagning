import { PayloadAction, createSlice } from "@reduxjs/toolkit";


//Dette er en interface og bruges med TypeScript
export interface UserState {
    id: number,
    username: string,
    fullname: string,


}

//Dette er en initialState. Den type annotates med interfacen.
const initialState: UserState = {
    id: 1,
    username: 'Anson',
    fullname: "AnsonTheOne"
}

/**
 * 
 * 
 * Hvad er en Slice?
 * Du har en Redux store som er en container der indeholder alle de data 
 * omkring application staten.
 * 
 * Men i selve storen har du forskellige slices.
 * 
 */

export const userSlice = createSlice({
    name: 'user',
    //Default value af min Store
    initialState,
    reducers: {
        //Reducer er funktioner som man kalder for at opdatere en state.
        updateUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        }

    }
});

export const { updateUsername } = userSlice.actions;
export default userSlice.reducer;