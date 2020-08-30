import {USER,REMOVE} from './action.types'

export const initialState = null

export const reducer = (state,action) => {
    switch(action.type){
        case USER:
            return action.payload
        case REMOVE:
            return initialState
        default:
            return state
    }
}