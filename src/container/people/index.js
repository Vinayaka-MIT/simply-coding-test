import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getPeopleList } from './actions';
import './index.scss';
import Table from '../../component/table';

class People extends Component {
    static propTypes = {
        getPeopleList: PropTypes.func
    }

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        if (!this.props.isDataLoaded) {
            this.props.getPeopleList();
        }
    }

    rowClickHandler = (id) => {
        this.context.router.history.push(`/person/${id}`);
    }

    render() {
        const { columns, isDataLoaded, data } = this.props;
        return (
            <div className="header">
                <div className="title">People</div>
                {
                    isDataLoaded ? (<div><Table columns={columns} data={data} rowKey='id' recordsPerPage={4}
                                                rowClickHandler={this.rowClickHandler} /></div>) : 'Loading...'
                }
            </div>
        );
    }
}

People.propTypes = {
};

function mapStateToProps(state = {}) {
    return {
        ...state,
        isDataLoaded: state.people.isDataLoaded,
        data: state.people.data,
        isError: state.people.isError,
        columns: state.people.columns
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPeopleList
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(People);
