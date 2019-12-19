import {getPersonInfo} from "./person-utils";
import * as actions from "../person/actions";

const initialState = {
    personInfo: {},
    isDataReceived: false,
    isFilmInfoReceived: false,
    films: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.GET_PERSON_INFO: {
            return {
                ...state,
                personInfo: getPersonInfo(action.payload),
                isDataReceived: true
            };
        }
        case actions.GET_FILM_INFO: {
            return {
                ...state,
                films: action.films,
                isFilmInfoReceived: true
            };
        }
        default:
            return { ...state };
    }
}
