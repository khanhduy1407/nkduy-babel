(function () {
  class App extends Dulcet.Component {
    render() {
      return (
        <div>
          <p>Parent</p>
          <AppItem />
        </div>
      );
    }
  }

  const AppItem = () => {
    return <div>child</div>;
  };
});
