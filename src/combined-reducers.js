import { combineReducers } from 'redux';
import peopleReducer from '../src/container/people/reducer';
import personReducer from '../src/container/person/reducer';

const CombinedReducers = combineReducers({
    people: peopleReducer,
    person: personReducer
});

export default CombinedReducers;
