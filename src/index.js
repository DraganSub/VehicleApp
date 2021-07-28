import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "mobx-react"
import App from "./Pages/App"
import RootStore from "./Stores/rootStore"
import "./index.css"

const store = new RootStore()
const Root =(
  <Provider rootStore={store} >     
    <App />
  </Provider>
)

ReactDOM.render(
  Root,
  document.getElementById("root")
)


