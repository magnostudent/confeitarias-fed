import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const authService = {
  async login(username: string, password: string) {
    const response = await api.post('/login', {
      username,
      password,
    })
    const token = response.data.token
    const usuario = JSON.stringify(response.data.usuario)
    const create = response.data.create
    const expires = response.data.expires

    localStorage.setItem('token', token)
    localStorage.setItem('usuario', usuario)
    localStorage.setItem('create', create)
    localStorage.setItem('expires', expires)
    return token
  },
  getUsuario() {
    const usuarioString = localStorage.getItem('usuario')
    if (usuarioString) {
      return JSON.parse(usuarioString)
    }
    return null
  },
  getToken() {
    return localStorage.getItem('token')
  },
  async logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('create')
    localStorage.removeItem('expires')
  },
  isLogado() {
    const token = localStorage.getItem('token')
    const expires = localStorage.getItem('expires')

    if (!token || !expires) {
      return false
    }

    const expiresDate = new Date(expires)
    const now = new Date()

    return expiresDate > now
  },
}

export default authService
