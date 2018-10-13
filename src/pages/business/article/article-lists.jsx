/**
 * Created by ggh on 2018/05/06.
 */
import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import SearchTable from './article-data';
import BreadcrumbCustom from '../../../components/BreadcrumbCustom';
import ActForm from './article-act';

const articlelists=()=>(
    <div className="gutter-example">
        <BreadcrumbCustom first="文章管理" srcond="列表" />
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="">
                    <Card title="文章列表" bordered={false}>
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

export default articlelists;