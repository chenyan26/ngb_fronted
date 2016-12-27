/**
 * Created by echo on 2016/12/21.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Input, Table, Modal } from 'antd';

import styles from './StbRecord.less';

const Search = Input.Search;

class StbRecord extends React.Component {

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
                        type: 'stbRecord/hideErrorModal',
                    });
                },
            });
        }
    }

    //---------------- Table 相关--------------------

    renderTable = () => {
        const columns = [{
            title: '克拉号',
            dataIndex: 'number',
            width: 80,
        }, {
            title: '时间',
            dataIndex: 'time',
            width: 120,
        }, {
            title: '类型',
            // dataIndex: 'type',
            width: 80,
            render: (text, record) => { //每一个行的信息 data[record.id]
                const status = ["开机", "关机"];
                return(
                        <div>
                            <p>{status[record.type]}</p>
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
                number: obj.number,
                time: obj.time,
                type: obj.type
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
                                        type: 'stbRecord/query',
                                    });
                                } else {
                                    console.log("queryByNumber");
                                    dispatch({
                                        type: 'stbRecord/queryByNumber',
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

StbRecord.propTypes = {
    list: PropTypes.array.isRequired,
    errorModalVisible: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        list : state.stbRecord.list,
        loading : state.loading.models.stbRecord,
        errorModalVisible: state.stbRecord.errorModalVisible,
        error: state.stbRecord.error,
    }
}

export default connect(mapStateToProps)(StbRecord)
