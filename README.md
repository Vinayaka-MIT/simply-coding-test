# simply-coding-test

## Setup
```bash
# use correct node version
nvm use 8.11.3

## Install
npm install


# npm
npm run build
npm run start
```

And navigate to <http://localhost:5000/people>

Note :

1. Redux store configuration is present inside src/index.js
2. Routes is defined inside src/index.js
3. I have created a generic table component which takes in following props

Table.propTypes = {
    rowKey: PropTypes.string,
    data: PropTypes.array,
    recordsPerPage: PropTypes.number,
    columns: PropTypes.object,
    rowClickHandler: PropTypes.func
};

4. I am using Axios to call the swapi api's.
5. I have kept the app simple making sure to have achieved the test requirements.
6. For this demo i have set the page size to 4 in order to show pagination.

