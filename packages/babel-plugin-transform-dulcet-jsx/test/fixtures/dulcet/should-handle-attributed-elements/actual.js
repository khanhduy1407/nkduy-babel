var HelloMessage = Dulcet.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

Dulcet.render(<HelloMessage name={
  <span>
    Sebastian
  </span>
} />, mountNode);
