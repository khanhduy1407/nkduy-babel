const AppItem = () => {
  return <div>child</div>;
};

export default class App extends Dulcet.Component {
  render() {
    return (
      <div>
        <p>Parent</p>
        <AppItem />
      </div>
    );
  }
}
