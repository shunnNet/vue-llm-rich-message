<script setup lang="ts">
import { ref } from 'vue'
import { computeFormatHint, ComponentMessage } from '@crazydos/vue-llm-rich-message'
import { openaiClient } from './fetch'
import ProductCardList from './components/ProductCardList.vue'

const content = ref(``)

const slotContents = [
  {
    component: 'reservation-button',
    description: 'A reservation button, click to reserve service, after click, it will show a calendar to select date',
  },
  {
    component: 'service-card-list',
    description: 'A card list show all home services',
  },
  { component: 'customer-service-button', description: 'A Button to call customer service to help.' },
]

const productList = [
  { title: 'House Cleaning Service', price: 1500, image: 'https://fakeimg.pl/300x200/' },
  { title: 'Aircond Cleaning Service', price: 3600, image: 'https://fakeimg.pl/300x200/' },
]

const systemMessage = `You are a customer service, you are talking to a customer who wants to reserve a service, please help him to reserve a service.

${computeFormatHint(slotContents)}
`

const info = ref('')
const generate = () => {
  info.value = 'loading...'
  openaiClient('/chat/completions')
    .post({
      model: 'gpt-3.5-turbo',
      temperature: 0,
      messages: [
        { role: 'system', content: systemMessage },

        // toggle each one of it to see 3 different result
        // { role: 'user', content: 'What services do you have ? I want to clean my house.' },
        // { role: 'user', content: 'I want do reservation.' },
        { role: 'user', content: 'Introduce your services, and where to contact with when I have problem' },
      ],
    })
    .json()
    .then((res) => {
      info.value = ''
      content.value = res.data.value.choices[0].message.content
    })
}

const handleReservation = () => {
  window.alert('Reservation success')
}
const handleCS = () => {
  window.alert('Customer service success')
}
</script>

<template>
  <div>
    <button @click="generate">Generate</button>
    <div>
      {{ info }}
    </div>
  </div>
  <ComponentMessage :message="content">
    <template #service-card-list>
      <ProductCardList :products="productList" />
    </template>
    <template #reservation-button>
      <button @click="handleReservation">Reservation</button>
    </template>
    <template #customer-service-button>
      <button @click="handleCS">Customer Service</button>
    </template>
  </ComponentMessage>
</template>
<style>
.editor-area {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.editor-area textarea {
  width: 100%;
  height: 100%;
  min-height: 500px;
}
</style>
<style>
blockquote {
  white-space: pre-wrap;
}
.code-block {
  display: block;
  padding: 10px;
  line-height: 1.5;
  box-sizing: border-box;
  white-space: pre-wrap;

  background-color: #eee;
}

code {
  background-color: #eee;
}

table {
  width: 100%;
  text-align: center;
  border: 1px solid black;
  border-radius: 50%;
  font-size: 12px;
  border-collapse: collapse;
  margin-bottom: 10px;
}
thead {
  th {
    padding: 10px 0;
    border-bottom: 1px solid #000;
  }
}
th,
td {
  /* text-align: center; */
  border-right: 1px solid #000;
}
td {
  padding: 10px;
}
tr:nth-child(2n) {
  background-color: #eeeeee;
}

th,
td {
  border: 1px solid #000;
}
</style>
