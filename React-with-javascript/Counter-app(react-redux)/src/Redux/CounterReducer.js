// const initialState = 'payrrlfog';

export const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'Increment':
            return state + 1;
        case 'Decrement':
            return state - 1;
        case 'Reset':
            return state = 0;
        default:
            return 'adfafda';
    }
}