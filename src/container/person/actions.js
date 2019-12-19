import axios from 'axios';

export const GET_PERSON_INFO = 'GET_PERSON_INFO';
export const GET_FILM_INFO = 'GET_FILM_INFO';

export const getPersonInfo = (id) => async (dispatch) => {
    let data = null;
    let config = {
        headers: {'Access-Control-Allow-Origin': '*'}
    };
    const url = `https://swapi.co/api/people/${id}/`;
    await axios.get(url, config)
        .then(response => {
            if (response && response.data) {
                if(response.data.films && response.data.films.length > 0) {
                    const responses = response.data.films.map(url => {
                       return axios.get(url)
                            .then(response => {
                                if(response && response.data) {
                                    return response.data.title;
                                }
                            })
                    });

                    axios.all(responses)
                        .then((data) => {
                            dispatch({
                                type: GET_FILM_INFO,
                                films: data
                            });
                        })
                        .catch((error) => {
                            throw error;
                        });
                }
                data = response.data;
            }
            dispatch({
                type: GET_PERSON_INFO,
                payload: data
            });
        })
        .catch(error => {
            throw error;
        })
    ;
};