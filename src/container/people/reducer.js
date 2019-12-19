import * as actions from './actions';
import { getPeopleList } from './people-utils';

const columns = {
    name: 'Name',
    height: 'Height',
    mass: 'Mass'
}

const initialState = {
    isDataLoaded: false,
    data: [],
    columns: columns
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.GET_PEOPLE_LIST: {
            return {
                ...state,
                data: getPeopleList(action.payload),
                isDataLoaded: true
            };
        }

        default:
            return {...state};
    }
}
