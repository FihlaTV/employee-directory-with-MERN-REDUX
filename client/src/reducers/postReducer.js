import { FETCH_EMPLOYEES, ADD_EMPLOYEE, EDIT_EMPLOYEE, DELETE_EMPLOYEE } from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_EMPLOYEES:
            return {
                ...state,
                items: action.payload
            }
            case ADD_EMPLOYEE:
            return {
                ...state,
                item: action.payload
            }
            case DELETE_EMPLOYEE:
            return {
                ...state,
                item: action.payload
            }
            case EDIT_EMPLOYEE:
            return {
                ...state,
                item: action.payload
            }
        default:
        return state;
    }
}