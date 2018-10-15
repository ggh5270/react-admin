/**
 * Created by ggh on 2018/05/06.
 */
import React from 'react';
import { Table, Input, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData } from '@/action';

var data = [];

class SearchTable extends React.Component{
    state = {
        filterKindCodeDropdownVisible: false,
        filterKindNameDropdownVisible: false,
        data,
        searchKindCodeText: '',
        searchKindNameText: '',
        filtered: false,
        loading: false,
        selectedRowKeys: [],
    };
    //render是在componentWillMount之后，可以这样描述componentWillMount-->render-->componentDidMount
    componentDidMount(){  
        const { fetchData } = this.props;
        const queryParam={'pageIndex':'1','pageSize':'10', 'param':{'SearchKindCode':'','SearchCode':''}};
        fetchData({funcName: 'postData',params:{url:'/Dictionary/GetDictionaryPagedList?serviceKey=Dictionary',data:queryParam}, stateName: 'data'});
    };
    componentWillReceiveProps(nextProps) {
        const { data: nextData = {} } = nextProps;
      
        if (nextData.data && nextData.data.IsSucceed === true) { 
            this.setState({ data: JSON.parse(nextData.data.Entity).Items });
        }
    };
    onInputKindCodeChange=(e)=>{
        this.setState({ searchKindCodeText: e.target.value });
    };
    onInputKindNameChange=(e)=>{
        this.setState({ searchKindNameText: e.target.value });
    };
    onSearchKindCode=(e)=>{
        const { searchKindCodeText } = this.state;
        const reg = new RegExp(searchKindCodeText, 'gi');
        this.setState({
            filterTitleDropdownVisible: false,
            filtered: !!searchKindCodeText,
            data: data.map((record) => {
                const match = record.dictionary_KindCode.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    dictionary_KindCode: (
                        <span>
                            {record.dictionary_KindCode.split(reg).map((text, i) => (
                                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                            ))}
                        </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };
    onSearchKindName=(e)=>{
        const { searchKindNameText } = this.state;
        const reg = new RegExp(searchKindNameText, 'gi');
        this.setState({
            filterKindNameeDropdownVisible: false,
            filtered: !!searchKindNameText,
            data: data.map((record) => {
                const match = record.dictionary_KindName.match(reg);
                if (!match) {
                    return null;
                }
                return {
                    ...record,
                    dictionary_KindName: (
                        <span>
                            {record.dictionary_KindName.split(reg).map((text, i) => (
                                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                            ))}
                        </span>
                    ),
                };
            }).filter(record => !!record),
        });
    };
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render(){
        const columns = [{
            title: '类别代码',
            dataIndex: 'Dictionary_KindCode',
            key: 'Dictionary_KindCode',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInputKindCode = ele}
                        placeholder="搜索类别代码"
                        value={this.state.searchKindCodeText}
                        onChange={this.onInputKindCodeChange}
                        onPressEnter={this.onSearchKindCode}
                    />
                    <Button type="primary" onClick={this.onSearchKindCode}>查找</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterKindCodeDropdownVisible,
            onFilterDropdownVisibleChange: visible => this.setState({ filterKindCodeDropdownVisible: visible }, () => this.searchKindCodeText.focus()),
        }, {
            title: '类别名称',
            dataIndex: 'Dictionary_KindName',
            key: 'Dictionary_KindName',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchKindNameInput = ele}
                        placeholder="搜索类别名称"
                        value={this.state.searchKindNameText}
                        onChange={this.onInputKindNameChange}
                        onPressEnter={this.onSearchKindName}
                    />
                    <Button type="primary" onClick={this.onSearchKindName}>查找</Button>
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.filterKindNameDropdownVisible,
            onFilterDropdownVisibleChange: visible => this.setState({ filterKindNameDropdownVisible: visible }, () => this.searchKindNameInput.focus()),
        }, {
            title: '字典代码',
            dataIndex: 'Dictionary_Code',
            key: 'Dictionary_Code',
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: () => <a>编写</a>
        }
        ];

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data} rowKey="Id" />
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

// 用于接收api返回的结果
const mapStateToPorps = state => {
    const { data } = state.httpData;
    return { data };
};

const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});

// export default SearchTable;
export default connect(mapStateToPorps, mapDispatchToProps)(SearchTable);