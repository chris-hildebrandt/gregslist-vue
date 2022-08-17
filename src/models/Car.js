
export class Car{
  constructor(data){
    this.id = data.id
    this.make = data.make || ''
    this.model = data.model || ''
    this.year = data.year || 0
    // you can sort of enforce this by setting min values on the form
    this.price = data.price || 500 
    this.img = data.img || ''
    this.description = data.description || ''
    this.color = data.color || '#65f9a0'
  }

  get Template(){
    return `

    `
  }
}