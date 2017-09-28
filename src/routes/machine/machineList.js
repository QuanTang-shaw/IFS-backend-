import { Table,Button,Popconfirm,message } from 'antd';
import { connect } from 'dva';


const machineList =({dispatch,machineList})=>{

    const {machineTableData}=machineList
    const columns = [
        {
            title: '机台编号',
            dataIndex: 'numbering',
            // render: text => <a href="#">{text}</a>,
        },
        {
            title: '机台名称',
            dataIndex: 'name',
        }, 
        {
            title: '机台主管',
            dataIndex: 'principal',
        },
        {
            title: '机台类型',
            dataIndex: 'machineType',
        },
        {
            title:'车间操作',
            width:500,
            render:()=>(
              <div>
                <Button icon="edit">编辑</Button>
                <Popconfirm title="Are you sure delete this task?" onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
                  <Button type="danger" icon="delete">删除</Button>
                </Popconfirm>
              </div>
            )
        }
    ];
    const data = [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      }, {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sidney No. 1 Lake Park',
    }];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',    // Column configuration not to be checked
        }),
    };
    const confirm=(e)=> {
        console.log(e);
        message.success('删除成功');
        dispatch({
            type:'factoryList/delete'
        })
    }
    const cancel=(e)=> {
        console.log(e);
        message.error('Click on No');
    }
    
    return(
        <div>
            <p style={{borderBottom:'solid 2px #b7b5b3',marginBottom:'30px',fontSize:'25px'}}>机台管理</p>
            <Table rowSelection={rowSelection} columns={columns} dataSource={machineTableData} />
        </div>
    )
}
function mapStateToProps(state, ownProps) {
    return {
      machineList: state.machinelist
    };
  }
export default connect(mapStateToProps)(machineList);
