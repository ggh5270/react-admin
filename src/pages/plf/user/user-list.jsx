/**
 * Created by ggh on 2018/10/15.
 */
import React from 'react';
import { Row, Col, Card } from 'antd';
import SearchTable from './user-data';
import BreadcrumbCustom from '../../../components/BreadcrumbCustom';
import ActForm from './user-act';

const userlists=()=>(
    <div className="gutter-example">
        <BreadcrumbCustom first="人员管理" srcond="列表" />
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="">
                    <Card title="人员管理" bordered={false}>
                        <div style={{marginBottom:16}}>
                            <ActForm />
                        </div>
                        <SearchTable />
                    </Card>
                </div>
            </Col>
        </Row>
    </div>
);

export default userlists;