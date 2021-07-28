import React from "react"
import {v4 as uuidv4} from "uuid"
import { inject, observer } from "mobx-react"
import Toolbar from "@material-ui/core/Toolbar"
import Navigation from "../../Components/Navigation"
import Typography from "@material-ui/core/Typography"
import AppBar from "@material-ui/core/AppBar"
import Container from "@material-ui/core/Container"

class AddVehicle extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.rootStore.vehiclesStore.getvehicle()
  }

  handleSubmit = e => {
    e.preventDefault()
    const id = uuidv4()
    const brand = this.vehicleBrand.value
    const info = this.vehicleInfo.value
    const model = this.vehicleModel.value
    const imageUrl = this.vehicleImageUrl.value
    this.props.rootStore.vehiclesStore.addvehicle({id,brand,info,model,imageUrl})
    e.target.reset()
  };

  render(){
    
    return(
      
      <div>
        <React.Fragment>
          <AppBar position="relative" color="secondary">
            <Toolbar>
              <Navigation />
            </Toolbar>
          </AppBar>
          <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" className="add_title" gutterBottom>
              Add New Vehicle
            </Typography> 

            <form onSubmit={e => this.handleSubmit(e)}>
              <div className="form-floating">
                <input
                  type="text"
                  name="brand"
                  ref={input => (this.vehicleBrand = input)}
                  placeholder="Add a vehicle brand"
                  className="form-control"
                  id="floatingBrand"
                />
                <label for="floatingBrand">Brand</label>
              </div>
        
              <div className="form-floating">
                <input 
                  type="text"
                  name="info"
                  ref={input => (this.vehicleInfo = input)}
                  placeholder="Add a vehicle info"
                  className="form-control"
                  id="floatingInfo"
                />
                <label for="floatingInfo">Info</label>
              </div>

              <div className="form-floating">
                <input
                  type="text"
                  name = "imageUrl"
                  ref={input => (this.vehicleImageUrl = input)}
                  placeholder="Add a vehicle image url"
                  className="form-control"
                  id="floatingImageUrl"
                />
                <label for="floatingImageUrl">ImageUrl</label>
              </div>

              <div className="form-floating">
                <input
                  type="text"
                  name = "model"
                  ref={input => (this.vehicleModel = input)}
                  placeholder="Add a vehicle model"
                  className="form-control"
                  id="floatingModel"
                />
                <label for="floatingModel">Model</label>
              </div>
      
              <button className="w-100 btn btn-lg btn-primary"> 
                Add vehicle
              </button>
            </form>
          </Container>
        </React.Fragment>
      </div>
    )
  }
}

export default inject("rootStore")(observer(AddVehicle))