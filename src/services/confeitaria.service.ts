import type { Confeitaria } from '@/models/Confeitaria'
import type { Produto } from '@/models/produto'
import type { Usuario } from '@/models/usuario'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const lista = [
  {
    id: 1,
    nome: 'Padaria São José',
    endereco: {
      cep: '01001-000',
      rua: 'Praça da Sé',
      numero: '100',
      bairro: 'Sé',
      cidade: 'São Paulo',
      estado: 'SP',
    },
    latitude: -23.55052,
    longitude: -46.633308,
    telefone: '(11) 3101-1000',
  },
  {
    id: 2,
    nome: 'Confeitaria Delícia',
    endereco: {
      cep: '20040-030',
      rua: 'Avenida Rio Branco',
      numero: '150',
      bairro: 'Centro',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
    },
    latitude: -22.90685,
    longitude: -43.1729,
    telefone: '(21) 2222-2000',
  },
  {
    id: 3,
    nome: 'Padaria Nossa Senhora',
    endereco: {
      cep: '30140-090',
      rua: 'Avenida Afonso Pena',
      numero: '200',
      bairro: 'Centro',
      cidade: 'Belo Horizonte',
      estado: 'MG',
    },
    latitude: -19.91905,
    longitude: -43.93817,
    telefone: '(31) 3222-3000',
  },
  {
    id: 4,
    nome: 'Confeitaria Doce Vida',
    endereco: {
      cep: '40010-010',
      rua: 'Rua Chile',
      numero: '100',
      bairro: 'Centro',
      cidade: 'Salvador',
      estado: 'BA',
    },
    latitude: -12.97111,
    longitude: -38.51083,
    telefone: '(71) 3322-4000',
  },
  {
    id: 5,
    nome: 'Padaria Bom Dia',
    endereco: {
      cep: '50010-120',
      rua: 'Avenida Conde da Boa Vista',
      numero: '150',
      bairro: 'Boa Vista',
      cidade: 'Recife',
      estado: 'PE',
    },
    latitude: -8.04756,
    longitude: -34.87719,
    telefone: '(81) 3422-5000',
  },
  {
    id: 6,
    nome: 'Confeitaria Sabor',
    endereco: {
      cep: '60010-120',
      rua: 'Avenida Dom Pedro I',
      numero: '200',
      bairro: 'Centro',
      cidade: 'Fortaleza',
      estado: 'CE',
    },
    latitude: -3.71839,
    longitude: -38.54339,
    telefone: '(85) 3222-6000',
  },
  {
    id: 7,
    nome: 'Padaria Nova Era',
    endereco: {
      cep: '70010-200',
      rua: 'Avenida W3 Sul',
      numero: '100',
      bairro: 'Asa Sul',
      cidade: 'Brasília',
      estado: 'DF',
    },
    latitude: -15.78012,
    longitude: -47.92917,
    telefone: '(61) 3322-7000',
  },
  {
    id: 8,
    nome: 'Confeitaria Doce Sonho',
    endereco: {
      cep: '80010-000',
      rua: 'Avenida Visconde de Guarapuava',
      numero: '150',
      bairro: 'Centro',
      cidade: 'Curitiba',
      estado: 'PR',
    },
    latitude: -25.42895,
    longitude: -49.27333,
    telefone: '(41) 3222-8000',
  },
  {
    id: 9,
    nome: 'Padaria Pão Quente',
    endereco: {
      cep: '90010-030',
      rua: 'Avenida Ipiranga',
      numero: '200',
      bairro: 'Centro',
      cidade: 'Porto Alegre',
      estado: 'RS',
    },
    latitude: -30.0277,
    longitude: -51.22873,
    telefone: '(51) 3222-9000',
  },
]

const produtos: Produto[] = [
  {
    id: 1,
    nomeProduto: 'Bolo de Chocolate',
    valor: 20.0,
    descricao: 'Um delicioso bolo de chocolate',
    imagem: '/produtos/choco.jpeg',
    confeitaria: 1,
  },
  {
    id: 2,
    nomeProduto: 'Torta de Morango',
    valor: 30.0,
    descricao: 'Um bolo de morango, hum hum hum',
    imagem: '/produtos/morango.png',
    confeitaria: 1,
  },
]

const confeitariaService = {
  async getConfeitarias() {
    //const response = await api.get('/confeitarias');
    //return response.data;
    return lista
  },
  async getConfeitaria(id: number) {
    //const response = await api.get('/confeitarias/' + id);
    //return response.data;

    return lista.find((x) => x.id === id)
  },

  async getProdutos(id: number) {
    //const response = await api.get('/produtos/' + id);
    //return response.data;

    return produtos
  },
  async getProduto(id: number) {
    return produtos.find((x) => x.id === id)
  },
  async getProdutosByUser(usuario: Usuario | undefined) {
    //const id = usuario?.confeitaria
    return produtos
  },
  async criarProduto(produto: Produto) {
    //TODO
  },
  async editarProduto(produto: Produto) {
    //TODO
  },
  async excluirProduto(id: number) {
    //TOOD
  },
  async editarConfeitaria(confeitaria: Confeitaria) {
    //TODO
  },
  async criarConfeitaria(novaConfeitaria: Confeitaria) {
    //TODO
  },
  async excluirConfeitaria(id: number) {
    //TODO
  },
}
export default confeitariaService
