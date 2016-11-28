import React from 'react';
import { Row, Col,AutoComplete , Icon } from 'antd';

const dataSource = ['12345', '23456', '34567'];

export default class Nav extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Row>
        <Col span={6}><Icon type="menu-fold" /></Col>
        <Col span={18}><AutoComplete dataSource={dataSource} /></Col>
      </Row>
    );
  }

}
