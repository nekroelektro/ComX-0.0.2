import * as React from "react";
import * as ReactDOM from "react-dom";
// import createBrowserHistory from "history/createBrowserHistory";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
