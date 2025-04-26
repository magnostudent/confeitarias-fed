import type { Produto } from '@/models/produto'
import { defineStore } from 'pinia'

interface CarrinhoItem {
  produto: Produto
  quantidade: number
}

export const useCarrinhoStore = defineStore('carrinho', {
  state: () => ({
    itens: JSON.parse(localStorage.getItem('carrinho') || '[]') as CarrinhoItem[],
  }),
  actions: {
    adicionarProduto(produto: Produto, quantidade: number) {
      const item = this.itens.find((item) => item.produto.id === produto.id)
      if (item) {
        item.quantidade += quantidade
      } else {
        this.itens.push({ produto, quantidade })
      }
      this.salvarCarrinho()
    },
    getQuantidadeTotal() {
      return this.itens.reduce((total, item) => total + item.quantidade, 0)
    },
    salvarCarrinho() {
      localStorage.setItem('carrinho', JSON.stringify(this.itens))
    },
    carregarCarrinho() {
      const carrinho = localStorage.getItem('carrinho')
      if (carrinho) {
        this.itens = JSON.parse(carrinho)
      }
    },
    removerProduto(produto: Produto) {
      this.itens = this.itens.filter((item) => item.produto.id !== produto.id)
      this.salvarCarrinho()
    },
  },
})
