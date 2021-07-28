import firebase from "../../Common/service"
import {makeObservable,observable,action,runInAction} from "mobx"

class VehiclesStore {
  constructor(rootStore){
    this.state = {
      vehicles : []      
    }

    makeObservable(this, {
      state: observable, 
      getvehicle:action,
      addvehicle:action,
      delete:action
    })
    this.rootStore =rootStore
  }
  
  getvehicle(){
    firebase.database().ref("cars").orderByChild("brand").on("value",(snapshot) => {
      runInAction(() =>{
        let result = []
        snapshot.forEach((item) => {
          result.push({...item.val(), key:item.key})
        })
        this.state.vehicles = [...result]
      })
    })
  }
      
      addvehicle = (items) =>{
        const id = firebase.database().ref("cars").push().key
        this.update(id,items)
      }

      update(id,items){
        firebase.database().ref("cars").update({[id]: {...items}})
      }
      delete = (id) => {
        firebase.database().ref("cars").child(id).remove()
      }
}

export default VehiclesStore