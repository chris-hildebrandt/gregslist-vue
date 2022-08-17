
export class Car{
  constructor(data){
    this.id = data.id
    this.make = data.make || ''
    this.model = data.model || ''
    this.year = data.year || 0
    this.price = data.price || 500 
    this.img = data.img || data.imgURL
    this.description = data.description || ''
  }
}