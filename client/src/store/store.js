import { legacy_createStore as createStore } from "redux";

let initialState = {
    cart: [],
};

let store = createStore((state = initialState, action) => {
    if (action.type === "ADD_TO_CART") {
        console.log(action.payload);
        return {
            ...state,
            cart: [...state.cart, payload],
        };
    }
    if (action.type === "LIST_CART") {
        return {
            ...state,
            cart: [...action.payload],
        };
    }
    return state;
});

export default store;
