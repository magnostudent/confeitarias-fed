export interface Confeitaria {
  id: number
  nome: string
  endereco: Endereco
  latitude: number
  longitude: number
  telefone: string
}

export interface Endereco {
  cep: string
  rua: string
  numero: string
  bairro: string
  cidade: string
  estado: string
}
