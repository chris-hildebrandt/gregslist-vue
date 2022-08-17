import { AppState } from "../AppState.js";
import { Car } from "../Models/Car.js";
import { api } from "./AxiosService.js";


class CarsService {

  setActiveCar(car){
    AppState.activeCar = car
  }
  
  async getCars() {
    let res = await api.get('/api/cars')
    AppState.cars = res.data.map(c => new Car(c))
  }

  async createCar(newCarFormData) {
    //  to add to AppState:
    // AppState.cars = [...AppState.cars, new Car(newCar)]
    // to add to API:
    // this links to the axiosService so you don't have to type the entire url
    let res = await api.post('/api/cars', newCarFormData)
    // comma after the address to post the data
    // always look at the response from the API with a console.log/debugger or looking at the network tab in devtools
    let car = new Car(res.data)
    AppState.cars = [...AppState.cars, car]
    // one line AppState.cars = [AppState.cars, new Car(res.data)] but this way an error points to one operation instead of 3
    // one line per operation is best practice for debugging

  }

  async deleteCar(carId) {
    await api.delete(`/api/cars/${carId}`)
    // for the delete you cannot do (url, id) because it interprets the request as delete the entire resource. delete requests have to look like this: (`/url/${id}`)
    // you don't need a try catch in the service, it goes in the controller
    AppState.cars = AppState.cars.filter(c => c.id != carId)
  }

  async editCar(carData){
    let res = await api.put(`/api/cars/${carData.id}`, carData)
    let car = new Car(res.data)
    let carIndex = AppState.cars.findIndex(c => c.id == carData.id)
    AppState.cars.splice(carIndex, 1, car)
  }
}

export const carsService = new CarsService()

// get and delete do not send data, so no comma
// puts and posts you send data