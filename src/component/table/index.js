import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            totalPages: this.getTotalPages(props)
        };
    }

    getTotalPages = (props) => {
        const rem = (props.data.length/props.recordsPerPage);
        if(rem > 1) {
            if(rem.toString().indexOf('.') !== -1 ) {
                return parseInt(rem.toString().split('.')[0]) + 1;
            }

            return rem;
        }

        return 1;
    }

    renderData = (rowKey, data, columns) => {
        const { currentPage } = this.state;
        let filteredData = [];
        if(currentPage === 1) {
            filteredData = data.filter(d => d.id <= (currentPage * this.props.recordsPerPage))
        } else {
            filteredData = data.filter(d => d.id > ((currentPage - 1) * this.props.recordsPerPage)
                && d.id <= (currentPage * this.props.recordsPerPage))
        }
        return filteredData.map(item => {
            return (<tr key={item[rowKey]} onClick={() => this.props.rowClickHandler(item[rowKey])}>
                {
                    Object.keys(columns).map(k => {
                        return (<td key={Math.random()}>{item[k]}</td>);
                    })
                }
            </tr>);
        })
    }

    back = () => {
        this.setState({ currentPage: this.state.currentPage - 1 });
    }

    next = () => {
        this.setState({ currentPage: this.state.currentPage + 1 });
    }

    render() {
        const {columns, data, rowKey} = this.props;
        return (
            <div className="container">
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            {Object.values(columns).map(col => (<th key={Math.random()}>
                                <div className="column">
                                    <div>{col}</div>
                                </div>
                            </th>))}
                        </tr>
                        </thead>
                        <tbody className="selectable">
                        {this.renderData(rowKey, data, columns)}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <div className="back"><button disabled={this.state.currentPage === 1}
                                                  className="btn btn-primary" onClick={this.back}>&lt; back</button></div>
                    <div><button disabled={this.state.currentPage === this.state.totalPages}
                                 className="btn btn-primary" onClick={this.next}>&gt; next</button></div>
                </div>
            </div>
        );
    }
}

Table.propTypes = {
    rowKey: PropTypes.string,
    data: PropTypes.array,
    recordsPerPage: PropTypes.number,
    columns: PropTypes.object,
    rowClickHandler: PropTypes.func
};

export default Table;