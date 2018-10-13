/**
 * Created by ggh on 2018/05/06.
 */
import React from 'react';
import { Table, Input, Button, Icon } from 'antd';

const data = [{
    key: '1',
    article_title: '安装windows10系统教程',
    article_describe: '如何安装windows10系统',
    createUser: '高国华',
}, {
    key: '2',
    article_title: '处理高并发需求教程',
    article_describe: '如何处理高并发需求',
    createUser: '高国华',
}, {
    key: '3',
    article_title: '查询数据库教程',
    article_describe: '如何查询数据库',
    createUser: '高国华',
}];

class SearchTable extends React.Component{
    state = {
        filterTitleDropdownVisible: false,
        filterDescribeDropdownVisible: false,
        data,
        searchTitleText: '',
        searchDescribeText: '',
        filtered: false,
    };
    onInputTitleChange=(e)=>{
        this.setState({ searchTitleText: e.target.value });
    };
    onInputDescribeChange=(e)=>{
        this.setState({ searchDescribeText: e.target.value });
    };
    onSearchTitle=(e)=>{
        const { searchTitleText } = this.state;
        const reg = new RegExp(searchTitleText, 'gi');
        this.setState({
            filterTitleDropdownVisible: false,
            filtered: !!searchTitleText,
            data: data.map((record) => {
                const match = record.article_title.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    article_title: (
                        <span>
                            {record.article_title.split(reg).map((text, i) => (
                                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                            ))}
                        </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };
    onSearchDescribe=(e)=>{
        const { searchDescribeText } = this.state;
        const reg = new RegExp(searchDescribeText, 'gi');
        this.setState({
            filterDescribeDropdownVisible: false,
            filtered: !!searchDescribeText,
            data: data.map((record) => {
                const match = record.article_describe.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    article_describe: (
                        <span>
                            {record.article_describe.split(reg).map((text, i) => (
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
            title: '标题',
            dataIndex: 'article_title',
            key: 'article_title',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput1 = ele}
                        placeholder="搜索标题"
                        value={this.state.searchTitleText}
                        onChange={this.onInputTitleChange}
                        onPressEnter={this.onSearchTitle}
                    />
                    <Button type="primary" onClick={this.onSearchTitle}>查找</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterTitleDropdownVisible,
            onFilterDropdownVisibleChange: visible => this.setState({ filterTitleDropdownVisible: visible }, () => this.searchInput1.focus()),
        }, {
            title: '描述',
            dataIndex: 'article_describe',
            key: 'article_describe',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="搜索描述"
                        value={this.state.searchDescribeText}
                        onChange={this.onInputDescribeChange}
                        onPressEnter={this.onSearchDescribe}
                    />
                    <Button type="primary" onClick={this.onSearchDescribe}>查找</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterDescribeDropdownVisible,
            onFilterDropdownVisibleChange: visible => this.setState({ filterDescribeDropdownVisible: visible }, () => this.searchInput.focus()),
        }, {
            title: '创建人',
            dataIndex: 'createUser',
            key: 'createUser',
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: () => <a>编写</a>
        }
        ];

        return (
            <div>
                <Table columns={columns} dataSource={this.state.data} />
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