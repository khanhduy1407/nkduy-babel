var HelloMessage = Dulcet.createClass({
  displayName: "HelloMessage",

  render: function () {
    return Dulcet.createElement(
      "div",
      null,
      "Hello ",
      this.props.name
    );
  }
});

Dulcet.render(Dulcet.createElement(HelloMessage, { name: Dulcet.createElement(
    "span",
    null,
    "Sebastian"
  ) }), mountNode);
