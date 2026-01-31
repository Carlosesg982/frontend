export interface Vehicle {
  id: string
  marca: string
  modelo: string
  placa: string
  created_at: string
}

export interface Entry {
  id: string
  vehicle_id: string
  motorista: string
  fecha: string
  hora: string
  kilometraje: number
  tipo: 'entrada' | 'salida'
  created_at: string
  vehicles?: Vehicle
}
