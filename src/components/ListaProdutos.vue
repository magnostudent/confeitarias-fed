<template>
  <div class="container mt-5">
    <h1 class="mb-4">Produtos</h1>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="produto in produtos" :key="produto.id">
        <div class="card h-100">
          <img
            :src="produto.imagem"
            class="card-img-top img-fluid"
            style="height: 200px; object-fit: cover"
            :alt="produto.nomeProduto"
          />
          <div class="card-body">
            <h5 class="card-title">{{ produto.nomeProduto }}</h5>
            <p class="card-text">Valor: R$ {{ produto.valor }}</p>
            <p class="card-text">{{ produto.descricao }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <input
                type="number"
                class="form-control w-25"
                v-model="quantidades[produto.id]"
                value="1"
              />
              <button class="btn btn-primary" @click="adicionarAoCarrinho(produto)">
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import confeitariaService from '@/services/confeitaria.service'
import { useCarrinhoStore } from '@/stores/carrinhoStore'
import { defineComponent, onMounted, ref } from 'vue'

interface Produto {
  id: number
  nomeProduto: string
  valor: number
  descricao: string
  imagem: string
}

interface CarrinhoItem {
  produto: Produto
  quantidade: number
}

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const produtos = ref<Produto[]>([])

    onMounted(async () => {
      const response = await confeitariaService.getProdutos(props.id)
      produtos.value = response
    })

    const carrinho = ref<CarrinhoItem[]>([])
    const quantidades = ref<{ [key: number]: number }>({})

    const carrinhoStore = useCarrinhoStore()

    const adicionarAoCarrinho = (produto: Produto) => {
      const quantidade = quantidades.value[produto.id]
      if (quantidade > 0) {
        carrinhoStore.adicionarProduto(produto, quantidade)
        quantidades.value[produto.id] = 0
      }
    }

    return {
      produtos,
      carrinho,
      quantidades,
      adicionarAoCarrinho,
    }
  },
})
</script>
