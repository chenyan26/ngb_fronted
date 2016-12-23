/**
 * Created by echo on 2016/12/23.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Input, Table, Modal } from 'antd';

import styles from './VsRecord.less';

const Search = Input.Search;

class VsRecord extends React.Component {

    componentDidUpdate(prevProps, prevState, prevContext) {
        const { errorModalVisible, dispatch, error } = this.props;
        if (errorModalVisible) {
            Modal.warning({
                title: '提示',
                content: (
                        <div>
                            <br/>
                            <p>请求失败，请重试</p>
                            <br/>
                            <p className={styles.error_p}>{error}</p>
                        </div>
                ),
                onOk(){
                    dispatch({
                        type: 'vsRecord/hideErrorModal',
                    });
                },
            });
        }
    }

    //---------------- Table 相关--------------------

    renderTable = () => {
        const columns = [{
            title: '主叫',
            dataIndex: 'call_number',
            width: 80,
        }, {
            title: '被叫',
            dataIndex: 'answer_number',
            width: 120,
        }, {
            title: '拨出时间',
            dataIndex: 'call_time',
            width: 120,
        }, {
            title: '接通时间',
            dataIndex: 'answer_time',
            width: 120,
        }, {
            title: '结束时间',
            dataIndex: 'end_time',
            width: 120,
        }, {
            title: '呼叫方式',
            // dataIndex: 'way',
            width: 80,
            render: (text, record) => { //每一个行的信息 data[record.id]
                const status = ["NFC", "非NFC"];
                return(
                        <div>
                            <p>{status[record.way]}</p>
                        </div>
                );
            },
        }];

        let data = [];
        const { list, loading } = this.props;

        list.map((obj, i) => {
            data[i] = {
                key: i,
                id: obj.id,
                call_number: obj.call_number,
                answer_number: obj.answer_number,
                call_time: obj.call_time,
                answer_time: obj.answer_time,
                end_time: obj.end_time,
                way: obj.way
            }
        });

        return (
                <Table columns={columns}
                       dataSource={data}
                       pagination={{ pageSize: 30 }}
                       loading={loading}
                       rowKey={record => record.id}
                       scroll={{ y: 500 }} />
        );
    };

    //----------------render--------------------
    render() {
        return (
                <div>
                    <label className={styles.my_label}>搜索</label>
                    <Search placeholder="克拉号"
                            className={styles.search_Input}
                            onSearch={(value) => {
                                const { dispatch } = this.props;
                                if (value === "") {
                                    console.log("query");
                                    dispatch({
                                        type: 'vsRecord/query',
                                    });
                                } else {
                                    console.log("queryByNumber");
                                    dispatch({
                                        type: 'vsRecord/queryByNumber',
                                        payload: {
                                            number: value
                                        }
                                    });
                                }
                                console.log(value);
                            }} />
                    {this.renderTable()}
                </div>
        );
    }
}

VsRecord.propTypes = {
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    errorModalVisible: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        list : state.vsRecord.list,
        loading : state.vsRecord.loading,
        errorModalVisible: state.vsRecord.errorModalVisible,
        error: state.vsRecord.error,
    }
}

export default connect(mapStateToProps)(VsRecord)
