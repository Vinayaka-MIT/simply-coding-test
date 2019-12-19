import axios from 'axios';

export const GET_PEOPLE_LIST = 'GET_PEOPLE_LIST';

export const getPeopleList = () => async (dispatch) => {
    let data = null;
    let config = {
        headers: {'Access-Control-Allow-Origin': '*'}
    };
    const url = 'https://swapi.co/api/people/';
    await axios.get(url, config)
        .then(response => {
            if (response && response.data.results.length) {
                data = response.data.results;
            }
            dispatch({
                type: GET_PEOPLE_LIST,
                payload: data
            });
        })
        .catch(error => {
            //As a fallback I have created a mock-data.json file in case the url is blocked or there is network issues
            // in accessing the api,
            if(error.toString().includes('Network')) {
                dispatch({
                    type: GET_PEOPLE_LIST,
                    payload: require('./mock-data')
                });
            }
            throw error;
        })
    ;
};