import firebase from "../../Common/service"
import { makeObservable} from "mobx"
import {action} from "mobx"

class EditVehicleStore {
  constructor(rootStore){
    makeObservable(this,{ 
      update:action,
      getIdFromUrl:action,
    })
    this.rootStore = rootStore 
  }
 
    getIdFromUrl= () =>{
      const str = window.location.pathname
      const char = str.split("/")
      const id = char[2]
      return id
    } 

    update(id,values){
      firebase.database().ref("cars").update({[id]: {...values}})
    }
}

export default EditVehicleStore