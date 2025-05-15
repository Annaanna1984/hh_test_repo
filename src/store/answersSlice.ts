import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type State = {
    itemsCount: number | null;
    draft: Record<number, number | null>;
    submitted: Record<number, number | null> | null;
    unsureFlags: Record<number, boolean>;
};

const answersSlice = createSlice({
    name: 'answers',
    initialState: {
        itemsCount: null,
        draft: {},
        submitted: null,
        unsureFlags: {},
    } as State,
    reducers: {
        setItemsCount(state, action: PayloadAction<number>) {
            state.itemsCount = action.payload
        },
        setAnswer(state, action: PayloadAction<{ id: number; value: number }>) {
            const {id, value} = action.payload;
            state.draft[id] = value;
            delete state.unsureFlags[id];
        },
        markUnsure(state, action: PayloadAction<number>) {
            const id = action.payload;
            const prev = state.unsureFlags[id];

            if (prev) {
                delete state.unsureFlags[id];
                delete state.draft[id];
            } else {
                state.unsureFlags[id] = true;
                state.draft[id] = null;
            }
        },
        submitAnswers(state) {
            state.submitted = {...state.draft};
            state.draft = {};
            state.unsureFlags = {};
        },
    },
});

export const {setItemsCount, setAnswer, markUnsure, submitAnswers} = answersSlice.actions;
export default answersSlice.reducer;
