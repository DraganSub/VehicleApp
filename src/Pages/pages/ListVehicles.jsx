import React from "react"
import { inject, observer } from "mobx-react"
import { Link} from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Grid from "@material-ui/core/Grid"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import  useStyles  from "../../Layouts/makeStyles"
import Container from "@material-ui/core/Container"
import TextField from "@material-ui/core/TextField"
import Navigation from "../../Components/Navigation"



class ListVehicle extends React.Component{
  constructor(props){
    super(props)
    const vehicles = this.props.rootStore.vehiclesStore.state.vehicles
    this.state = {
      showForm : false,
      vehicles: vehicles,
      offset: 0,
      vehiclesPerPage: 6,
      currentPage: 1,
      search:""
    } 
  }

  componentDidMount(){
    this.props.rootStore.vehiclesStore.getvehicle()
  }
  
  updateSearch(event){
    this.setState({search:event.target.value.substr(0,20)})
  }

   
  render(){
    const lastVehiclesIndex = this.state.currentPage * this.state.vehiclesPerPage                               //last vehicle index
    const firstVehiclesIndex = lastVehiclesIndex - this.state.vehiclesPerPage                                   //first vehicle index

    const Vehicles = this.props.rootStore.vehiclesStore.state.vehicles                                          //vehicles list

    const paginate = (pageNumber) => this.setState({
      currentPage:pageNumber
    })
      
    const pageNumbers = []
    const totalVehicles = this.state.vehicles.length
    const ceil = totalVehicles /this.state.vehiclesPerPage
    for(let i = 1; i <= Math.ceil(ceil); i++){
      pageNumbers.push(i)
    }
      
    let filteredVehicles = Vehicles.filter(
      (vehicle) => {
        return vehicle.brand.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      }
    )  

    const currentPost = filteredVehicles.slice(firstVehiclesIndex,lastVehiclesIndex) 
    const classes = useStyles

    return(

      <div>
        <React.Fragment>
          <AppBar position="relative" color="secondary">
            <Toolbar>
              <Navigation />
            </Toolbar>
          </AppBar>

          <main>
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <div className="searchInput">
                  <TextField   
                    fullWidth
                    variant="outlined"
                    label="Search"
                    type="text" 
                    className="form-control me-2" 
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)} 
                  />
                </div>
              </Container>
            </div>

            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={4}>
                {currentPost.map((vehicle) => (
                  <Grid item key={vehicle.key} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        component="img"
                        className={classes.media}
                        src={vehicle.imageUrl}
                        title={vehicle.model}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {vehicle.model}
                        </Typography> 
                        <Typography className="brand-dark-color">
                          {vehicle.brand}
                        </Typography>
                        <Typography>
                          {vehicle.info.substring(0, 20) + "..."}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Link to={`/listVehicles/${vehicle.key}`} >
                          <Button size="small" variant="outlined" color="primary">
                            Edit
                          </Button>
                        </Link>
                        <Button size="small" variant="outlined" color="secondary" onClick={() => this.props.rootStore.vehiclesStore.delete(vehicle.key)}>
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid> 
  
              <div className="d-flex justify-content-center" id="pagination">
                <ul className="pagination">
                  {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                      <a onClick={() => paginate(number)} href='#' className='page-link'>
                        {number}
                      </a>
                    </li>
                  ))}
                </ul>   
              </div>
            </Container>

          </main>
        </React.Fragment>        
      </div>
    )
  }
}

export default inject("rootStore")(observer(ListVehicle))