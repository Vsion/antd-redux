import React from 'react';

export default class Content extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <iframe
        frameBorder="no" marginWidth="0" marginHeight="0"
        className="content-iframe"
        key={this.props.itemKey}
        name={this.props.itemKey}
        src={this.props.url}
        />
      </div>
    );
  }

}
