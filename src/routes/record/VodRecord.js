/**
 * Created by echo on 2016/12/23.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Table, Modal } from 'antd';

import styles from './StbRecord.less';

class VodRecord extends React.Component {

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
                        type: 'vodRecord/hideErrorModal',
                    });
                },
            });
        }
    }

    //---------------- Table 相关--------------------

    renderTable = () => {
        const columns = [{
            title: '点播用户',
            dataIndex: 'number',
            width: 80,
        }, {
            title: '标题',
            dataIndex: 'name',
            width: 120,
        }, {
            title: '播放时间',
            dataIndex: 'time',
            width: 120,
        }, {
            title: '视频类型',
            // dataIndex: 'type',
            width: 80,
            render: (text, record) => { //每一个行的信息 data[record.id]
                const status = ["VR", "普通"];
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
                name: obj.name,
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
                    {this.renderTable()}
                </div>
        );
    }
}

VodRecord.propTypes = {
    list: PropTypes.array.isRequired,
    errorModalVisible: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        list : state.vodRecord.list,
        loading : state.loading.models.vodRecord,
        errorModalVisible: state.vodRecord.errorModalVisible,
        error: state.vodRecord.error,
    }
}

export default connect(mapStateToProps)(VodRecord)
