import { observer,inject } from "mobx-react"
import Toolbar from "@material-ui/core/Toolbar"
import AppBar from "@material-ui/core/AppBar"
import Navigation from "../../Components/Navigation"
import React from "react"



class EditVehicle extends React.Component{
  constructor(props){
    super(props)
    this.state={
      brand:"",
      info:"",
      model:"",
      imageUrl: ""
    }
  }  
  componentDidMount(){
    this.props.rootStore.vehiclesStore.getvehicle()
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
    
  handleEdit = e => {
    e.preventDefault()
    const id = this.props.rootStore.editVehicleStore.getIdFromUrl()
    const brand = this.state.brand
    const info = this.state.info
    const model = this.state.model
    const imageUrl = this.state.imageUrl
    this.props.rootStore.editVehicleStore.update(id,{brand,info,model,imageUrl})
    e.target.reset()
  }

  render(){
       
    const vehiclesStore = this.props.rootStore.vehiclesStore
    const editVehicleStore = this.props.rootStore.editVehicleStore
        
    return(
      <React.Fragment>
        <AppBar position="relative" color="secondary">
          <Toolbar>
            <Navigation /> 
          </Toolbar>
        </AppBar>

        <div className="container py-4" id="container-edit-page">
          {vehiclesStore.state.vehicles.map(vehicle => ( 
            (editVehicleStore.getIdFromUrl() === vehicle.key ) ? 
              <div key={vehicle.key} className="row align-items-md-stretch">
                <div style={{textAlign:"center"}} className="col-md-6">
                  <div className="h-100 p-5 bg-light border rounded-3">
                    <img  src={vehicle.imageUrl} style={{width:"80%"}}/>
                    <p>{vehicle.brand}   {<br />}</p> 
                    <p>{vehicle.info}  {<br />}</p> 
                    <p> Vehicle model: {vehicle.model}  {<br />}</p> 
                  </div>
                </div>

                <div style={{display:"table-caption"}} className="col-md-6">
                  <h1 style={{textAlign:"center"}}>Edit Vehicle</h1>
                  <form onSubmit={(e)=>this.handleEdit(e)}>
                    <div className="form-floating">
                      <input
                        type="text"
                        name="brand"
                        value={this.state.brand}
                        onChange={e =>this.onChange(e)}
                        className="form-control"
                        id="brandLabel"
                      />
                      <label for="brandLabel">Brand</label>
                    </div>

                    <div className="form-floating">
                      <input 
                        type="text"
                        name="info"
                        value={this.state.info}
                        onChange={e => this.onChange(e)}
                        className="form-control"
                        id="infoLabel"
                      />
                      <label for="infoLabel">Info</label>
                    </div>

                    <div className="form-floating">
                      <input 
                        type="text"
                        name="imageUrl"
                        value={this.state.imageUrl}
                        onChange={e => this.onChange(e)}
                        placeholder={vehicle.imageUrl}
                        className="form-control"
                        id="imageUrlLabel"
                      />
                      <label for="imageUrlLabel" style={{fontSize:"13px"}}>{vehicle.imageUrl}</label>
                    </div>

                    <div className="form-floating">
                      <input
                        type="text"
                        name = "model"
                        value={this.state.model}
                        onChange={e => this.onChange(e)}
                        className="form-control"
                        id="modelLabel"
                      />
                      <label for="modelLabel">Model</label>
                    </div>
                
                    <button className="w-100 btn btn-lg btn-primary"> 
                      Edit vehicle
                    </button>
                  </form>
                </div>
              </div> : ""
          ))}
        </div>
      </React.Fragment>
    )
  }
}

export default inject("rootStore")(observer(EditVehicle))