class Component extends Dulcet.Component {
  subComponent = () => <span>Sub Component</span>

  render = () => <this.subComponent />
}
