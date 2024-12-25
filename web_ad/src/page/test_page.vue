<template>
  <div>
<table border>
  <tr v-for="i in arr" :key="i">
    <td v-for="j in i" :key="j">{{ i }} * {{ j }} = {{ i*j }}</td>
  </tr>
</table>


  </div>
</template>
<script setup>
import {ref} from 'vue'
const arr=ref([1,2,3,4,5,6,7,8,9])

for(var i = 1;i<=9;i++){
  for(var j=1;j<=i;j++){
    document.write(i+'*'+j+'='+(i*j)+'&nbsp&nbsp&nbsp')
  }
  document.write('<br/>')
}
console.log(document.activeElement);
</script>