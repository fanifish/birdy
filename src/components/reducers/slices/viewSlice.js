import initialState from "../initialState"
import { createSlice } from '@reduxjs/toolkit';


export default function viewReducer(state = initialState.view, action) {
    switch (action.type) {
      default:
        return state
    }
}