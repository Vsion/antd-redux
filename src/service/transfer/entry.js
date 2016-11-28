import common from 'svc2Src/util/js/common'
import React from 'react';
import {render} from 'react-dom';
import HHTransfer from 'svc2Src/components/HHTransfer/HHTransfer';

const App = React.createClass({
  getInitialState() {
    return {
      mockData: [],
      targetKeys: [],
    };
  },
  componentDidMount() {
    this.getMock();
  },
  getMock() {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: false,
        disabled: false,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  },
  handleChange(targetKeys, direction, moveKeys) {
    //console.log(targetKeys, direction, moveKeys);
    this.setState({ targetKeys });
  },
  handleSelectChange(sourceSelectedKeys, targetSelectedKeys) {
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  },
  render() {
    return (
      <HHTransfer
        style={{width:500}}
        dataSource={this.state.mockData}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        onSelectChange={this.handleSelectChange}
        render={item => item.title}
      />
    );
  },
});

render(<App />, document.getElementById("app"));
