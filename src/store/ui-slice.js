import {createSlice} from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        cartIsVisible: false,
    },
    reducers: {
        toggleCartVisibility(state) {
            state.cartIsVisible = !state.cartIsVisible;
        },
    },
});

export const uiSliceActions = uiSlice.actions;