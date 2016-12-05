/**
 * Created by echo on 2016/12/2.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';

class Individual extends React.Component {

    componentWillMount() {
        const { dispatch } = this.props;
        // dispatch(AppActions.hideTabbar(false));
        dispatch({
            type: 'individual/query',
        });
    }

    render() {
        const { list } = this.props;
        return (
                <div>
                    {list.map((obj, i) => {
                        const number = obj.number;
                        const name = obj.name;
                        return (
                                <div>
                                    <p>{name}</p>
                                </div>
                        );
                    })
                    }
            </div>
        );
    }
}

Individual.propTypes = {
    list: PropTypes.array.isRequired,
    // homeActions: PropTypes.object.isRequired,
    // appActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        list : state.individual.list
    }
}

export default connect(mapStateToProps)(Individual)
