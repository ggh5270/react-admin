/**
 * Created by ggh on 2018/10/15.
 */
import React from 'react';
import { Row, Col, Card,Button } from 'antd';
import SearchTable from './dictionary-data';
import BreadcrumbCustom from '../../../../components/BreadcrumbCustom';
import ActForm from './dictionary-act';

const dictionarylists=()=>(
    <div className="gutter-example">
        <BreadcrumbCustom first="字典管理" srcond="列表" />
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="">
                    <Card title="字典列表" bordered={false}>
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

export default dictionarylists;