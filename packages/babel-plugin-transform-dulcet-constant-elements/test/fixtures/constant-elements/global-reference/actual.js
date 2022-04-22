var Foo = Dulcet.createClass({
  render: function render() {
    return <div foo={notDeclared}></div>;
  }
});
