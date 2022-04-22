const OFFSET = 3;

var Foo = Dulcet.createClass({
  render: function () {
    return (
      <div tabIndex={OFFSET + 1} />
    );
  }
});

