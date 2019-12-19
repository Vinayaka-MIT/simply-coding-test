import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {getPersonInfo} from './actions';
import './index.scss';

class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {person: []};
        const {match} = this.props;
        this.id = match.params.id;
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        if (this.props.data.length > 0) {
            this.props.getPersonInfo(this.id);
        }
    }

    back = () => {
        this.context.router.history.push('/people');
    }

    render() {
        const { personInfo, films, isDataReceived, isFilmInfoReceived } = this.props;
        return (
            <div className="header">
                <div className="title">Person Information</div>
                {
                    isDataReceived ? (<div className="spacing">
                        <div className="row">
                            <div className="col-md-1">Name</div>
                            <div>{personInfo.name}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-1">Height</div>
                            <div>{personInfo.height}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-1">Birth Year</div>
                            <div>{personInfo.birthYear}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-1">Gender</div>
                            <div>{personInfo.gender}</div>
                        </div>
                    </div>) : (<div className="spacing"><b>Fetching information...</b></div>)
                }
                {
                    isFilmInfoReceived ? (<div className="row spacing"><div className="col-md-8"><table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Films</th>
                        </tr>
                        </thead>
                        <tbody>
                        {films.map(item => (<tr key={Math.random()}>
                            <td>{item}
                            </td>
                        </tr>))}
                        </tbody>
                    </table></div></div>) : (<div className="spacing"><b>Retrieving movie information...</b></div>)
                }
                <br/>
                <div className="row spacing">
                    <button
                       className="btn btn-primary" onClick={this.back}>Back</button>
                </div>
            </div>
        );
    }
}

Person.propTypes = {
    data: PropTypes.array,
    match: PropTypes.object,
    getPersonInfo: PropTypes.func
};

function mapStateToProps(state = {}) {
    return {
        ...state,
        data: state.people.data,
        personInfo: state.person.personInfo,
        films: state.person.films,
        isDataReceived: state.person.isDataReceived,
        isFilmInfoReceived: state.person.isFilmInfoReceived
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPersonInfo
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);
