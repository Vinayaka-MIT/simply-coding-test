export const getPeopleList = (payload) => {
    return payload.map((val, index) => ({
        id: (index+1),
        name: val.name,
        height: val.height,
        mass: val.mass,
        gender: val.gender,
        birthYear: val.birth_year,
        films: val.films
    }));
}