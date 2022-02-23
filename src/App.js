
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Overview from "./pages/Overview";

function App() {
  return (

    <BrowserRouter>
      <Route path="/" component={{ Overview }} />
    </BrowserRouter>
  );
}
export default App;