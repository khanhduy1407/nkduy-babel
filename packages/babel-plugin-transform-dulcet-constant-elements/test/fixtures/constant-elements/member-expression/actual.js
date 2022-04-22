const els = {
  subComponent: () => <span>Sub Component</span>
};
class Component extends Dulcet.Component {
  render = () => <els.subComponent />
}
