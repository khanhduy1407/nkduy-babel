import Dulcet from "dulcet";

const Parent = ({}) => (
  <div className="parent">
    <Child/>
  </div>
);

export default Parent;

let Child = () => (
  <div className="child">
    ChildTextContent
  </div>
);
