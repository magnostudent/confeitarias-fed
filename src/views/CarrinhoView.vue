<template>
  <div class="container mt-5">
    <h1>Carrinho</h1>
    <div v-if="carrinhoStore.itens.length > 0">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in carrinhoStore.itens" :key="item.produto.id">
            <td>{{ item.produto.nomeProduto }}</td>
            <td>{{ item.quantidade }}</td>
            <td>R$ {{ item.produto.valor.toFixed(2) }}</td>
            <td>R$ {{ (item.produto.valor * item.quantidade).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-between">
        <button class="btn btn-danger" @click="esvaziarCarrinho">Esvaziar Carrinho</button>
        <button class="btn btn-success" @click="finalizarCompra">Finalizar Compra</button>
      </div>
    </div>
    <div v-else>
      <p>O carrinho está vazio.</p>
    </div>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">Notificação</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body" id="toast-body"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCarrinhoStore } from '../stores/carrinhoStore'
import compraService from '../services/compraService'

export default defineComponent({
  setup() {
    const carrinhoStore = useCarrinhoStore()

    const esvaziarCarrinho = () => {
      carrinhoStore.itens = []
      carrinhoStore.salvarCarrinho()
    }

    const finalizarCompra = async () => {
      try {
        await compraService.finalizarCompra(carrinhoStore.itens)
        mostrarToast('Compra finalizada com sucesso!', 'bg-success')
        esvaziarCarrinho()
      } catch {
        mostrarToast('Erro ao finalizar compra!', 'bg-danger')
      }
    }

    const mostrarToast = (mensagem: string, classe: string) => {
      const toast = document.getElementById('toast')
      const toastBody = document.getElementById('toast-body')
      toastBody.innerText = mensagem
      toast.classList.add(classe)
      const toastInstance = new (window as any).bootstrap.Toast(toast)
      toastInstance.show()
      setTimeout(() => {
        toastInstance.hide()
        toast.classList.remove(classe)
      }, 3000)
    }

    return {
      carrinhoStore,
      esvaziarCarrinho,
      finalizarCompra,
    }
  },
})
</script>
