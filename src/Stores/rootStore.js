
import VehiclesStore from "../Pages/stores/ListVehiclesStore.jsx"
import EditVehicleStore from "../Pages/stores/EditVehiclesStore.jsx"


class RootStore  {
  constructor(){
    this.vehiclesStore = new VehiclesStore(this)
    this.editVehicleStore = new EditVehicleStore(this)
  }
}

export default RootStore