<template>
  <form
    action="https://fin.test.4g12hs.com/api/payment/start"
    method="POST"
  >
    <input name="amount" :value="amount" />
    <input name="amountcurr" :value="amountcurr" />
    <input name="currency" :value="currency" />
    <input name="number" :value="number" />
    <input name="description" :value="description" />
    <input name="trtype" :value="trtype" />
    <input name="account" :value="account" />
    <input name="signature" :value="signature" />

    <button type="submit">Оплатить</button>
  </form>
</template>

<script setup>
import { computed } from "vue"
import md5 from "md5" // npm install md5

const amount = "210.23"
const amountcurr = "USD"
const currency = "MBC"
const number = "32"
const trtype = "1"
const account = "ACC1024356"
const paytoken = ""
const backURL = ""
const secret1 = "ab275762-31f2-9646-a035-e3b6bbacc8e4"
const secret2 = "prTEDYepqGTOOghTKJM@"

// https://fin.test.4g12hs.com/api/payment/
// $account = 'ACC1024356';
// $secret1 = 'ab275762-31f2-9646-a035-e3b6bbacc8e4';
// $secret2 = 'prTEDYepqGTOOghTKJM@';



const description = encodeURIComponent(
  `Тестовая оплата на ${amount} ${amountcurr}`
)

const signature = computed(() => {
  let str = `${amount}:${amountcurr}:${currency}:${number}:${description}:`
  str += `${trtype}:${account}:`

  if (paytoken) str += `${paytoken}:`
  if (backURL) str += `${backURL}:`

  str += `${secret1}:${secret2}`

  return md5(str).toUpperCase()
})
</script>