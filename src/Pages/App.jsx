
import React, { Component } from "react"
import { inject, observer } from "mobx-react"
import AddVehicle from "./pages/AddVehiclePage"
import Navigation from "../Components/Navigation"
import {BrowserRouter as Router,Route} from "react-router-dom"
import ListVehicles from "./pages/ListVehicles"
import * as ROUTES from "../Common/constants/routes"
import EditVehicle from "./pages/EditVehiclePage"
import HomePage from "../Layouts/HomePage"

class App extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.rootStore.vehiclesStore.getvehicle()
  }
  render() { 
    return (
      
      <div>
        <Router>
          <div>  
            <Route exact path={ROUTES.HOME} component={HomePage}/>
            <Route exact path={ROUTES.ADD_VEHICLE} component={AddVehicle} />
            <Route exact path={ROUTES.LIST_VEHICLE} component={ListVehicles} />
            <Route path={ROUTES.EDIT_VEHICLE} component={EditVehicle}/>
          </div> 
        </Router>
      </div>
    )
  }
}
  
export default inject("rootStore")(observer(App))
