import {createSlice} from "@reduxjs/toolkit";

const addItemActionCreator = (state, action) => {
    const newItem = action.payload;
    const existingItem = state.items.find(item => item.id === newItem.id);

    if (!existingItem) {
        state.items.push({
            ...newItem,
            quantity: 1,
            total: newItem.price,
        });
    } else {
        existingItem.quantity++;
        existingItem.total += newItem.price;
    }

    state.totalSize++;
}

const removeItemActionCreator = (state, action) => {
    const items = state.items;
    const existingItemIndex = items.findIndex(item => item.id === action.payload);

    if (items[existingItemIndex].quantity === 1) {
        items.splice(existingItemIndex, 1);
    } else {
        const existingItem = items[existingItemIndex];
        existingItem.quantity--;
        existingItem.total -= existingItem.price;
    }

    state.totalSize--;
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalSize: 0,
    },
    reducers: {
        addItem(action, state) {
            addItemActionCreator(action, state);
        },
        removeItem(action, state) {
            removeItemActionCreator(action, state);
        },
    },
});

export const cartSliceActions = cartSlice.actions;