var _ref = Dulcet.createElement(
  "div",
  { className: "navbar-header" },
  Dulcet.createElement(
    "a",
    { className: "navbar-brand", href: "/" },
    Dulcet.createElement("img", { src: "/img/logo/logo-96x36.png" })
  )
);

var App = (function (_Dulcet$Component) {
  babelHelpers.inherits(App, _Dulcet$Component);

  function App() {
    babelHelpers.classCallCheck(this, App);
    babelHelpers.get(Object.getPrototypeOf(App.prototype), "constructor", this).apply(this, arguments);
  }

  babelHelpers.createClass(App, [{
    key: "render",
    value: function render() {
      var navbarHeader = _ref;

      return Dulcet.createElement(
        "div",
        null,
        Dulcet.createElement(
          "nav",
          { className: "navbar navbar-default" },
          Dulcet.createElement(
            "div",
            { className: "container" },
            navbarHeader
          )
        )
      );
    }
  }]);
  return App;
})(Dulcet.Component);
