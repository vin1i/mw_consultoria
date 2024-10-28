import { Fragment } from "react";
import RouterApp from "./routes";
import Global from "./styles/Global";

function App() {
  return (
    <Fragment>
      <RouterApp />
      <Global />
    </Fragment>
  );
}

export default App;
