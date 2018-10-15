/**
 * Created by ggh on 2018/10/15.
 */
import React from 'react';
import { Input, Button, Icon, Table } from 'antd';

const data = [{
    key: '1',
    UserName: '高国华',
    WorkerNo: '001',
    GenderId: '男',
    Email: 'ggh5270@163.com',
    Phone: '15902029242',
    UserStatus: '在职',
}, {
    key: '2',
    UserName: '小明',
    WorkerNo: '002',
    GenderId: '女',
    Email: 'nono@localhome.com.cn',
    Phone: '15902029242',
    UserStatus: '离职',
}, {
    key: '3',
    UserName: '小花',
    WorkerNo: '003',
    GenderId: '男',
    Email: '',
    Phone: '15902029242',
    UserStatus: '在职',
}];

class SearchTable extends React.Component{
    state = {
        filterTitleDropdownVisible: false,
        filterDescribeDropdownVisible: false,
        data,
        searchWorkerText: '',
        searchUserNameText: '',
        filtered: false,
    };
    onInputWorkerNoChange=(e)=>{
        this.setState({ searchWorkerText: e.target.value });
    };
    onInputUserNameChange=(e)=>{
        this.setState({ searchUserNameText: e.target.value });
    };
    onSearchWorker=(e)=>{
        const { searchWorkerText } = this.state;
        const reg = new RegExp(searchWorkerText, 'gi');
        this.setState({
            filterTitleDropdownVisible: false,
            filtered: !!searchWorkerText,
            data: data.map((record) => {
                const match = record.WorkerNo.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    WorkerNo: (
                        <span>
                            {record.WorkerNo.split(reg).map((text, i) => (
                                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                            ))}
                        </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };
    onSearchUserName=(e)=>{
        const { searchUserNameText } = this.state;
        const reg = new RegExp(searchUserNameText, 'gi');
        this.setState({
            filterDescribeDropdownVisible: false,
            filtered: !!searchUserNameText,
            data: data.map((record) => {
                const match = record.UserName.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    UserName: (
                        <span>
                            {record.UserName.split(reg).map((text, i) => (
                                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                            ))}
                        </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };
    render(){
        const columns = [{
            title: '姓名',
            width: 100,
            dataIndex: 'UserName',
            key: 'UserName',
            fixed: 'left',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="搜索姓名"
                        value={this.state.searchUserNameText}
                        onChange={this.onInputUserNameChange}
                        onPressEnter={this.onSearchUserName}
                    />
                    <Button type="primary" onClick={this.onSearchUserName}>查找</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterDescribeDropdownVisible,
            onFilterDropdownVisibleChange: visible => this.setState({ filterDescribeDropdownVisible: visible }, () => this.searchInput.focus()),
        }, {
            title: '工号',
            dataIndex: 'WorkerNo',
            key: 'WorkerNo',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput1 = ele}
                        placeholder="搜索工号"
                        value={this.state.searchWorkerText}
                        onChange={this.onInputWorkerNoChange}
                        onPressEnter={this.onSearchWorker}
                    />
                    <Button type="primary" onClick={this.onSearchWorker}>查找</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterTitleDropdownVisible,
            onFilterDropdownVisibleChange: visible => this.setState({ filterTitleDropdownVisible: visible }, () => this.searchInput1.focus()),
        },
        {
            title: '性别',
            dataIndex: 'GenderId',
            key: 'GenderId',
        },{
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
        },{
            title: '电话',
            dataIndex: 'Phone',
            key: 'Phone',
        },{
            title: '状态',
            dataIndex: 'UserStatus',
            key: 'UserStatus',
        },{
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: () => <a>编辑</a>,
        }
        ];

     return (
            <div>
                <Table columns={columns} dataSource={this.state.data} scroll={{ x: 1000 }} />
                <style>{`
                    .custom-filter-dropdown {
                      padding: 8px;
                      border-radius: 6px;
                      background: #fff;
                      box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
                    }
                    .custom-filter-dropdown input {
                      width: 130px;
                      margin-right: 8px;
                    }
                    .highlight {
                      color: #f50;
                    }
                `}</style>
            </div>
        );
    };
}

export default SearchTable;