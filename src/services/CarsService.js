import { AppState } from "../AppState.js";
import { Car } from "../Models/Car.js";
import { api } from "./AxiosService.js";


class CarsService {

  async getCarById(carId) {
    const res = await api.get(`api/cars/${carId}`)
    AppState.activeCar = new Car(res.data)
  }

  setActiveCar(car){
    AppState.activeCar = car
  }
  
  async getCars() {
    let res = await api.get('/api/cars')
    AppState.cars = res.data.map(c => new Car(c))
  }

  async createCar(newCarFormData) {
    let res = await api.post('/api/cars', newCarFormData)
    let car = new Car(res.data)
    AppState.cars = [...AppState.cars, car]
  }

  async deleteCar(carId) {
    await api.delete(`/api/cars/${carId}`)
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