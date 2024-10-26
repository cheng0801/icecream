<script setup>
// import my_table from '../components/Web_content/my_table.vue';
import Web_home from '@/components/Web_content/Web_home.vue';
import MainTable from '../components/Web_content/MainTable.vue';
import Web_content_Img from './Web_content_Img.vue';


</script>

<template>
    <div class="content">
       
        <Web_content_Img class="Main-img" />
        <Web_home/>
       
        <!-- <my_table class="asd"/> -->
        

        <MainTable class="Main-table"></MainTable>
    </div>
</template>

<style scoped>

/* 
.Main-table {
    margin: 0 auto; */
    /* width: 800px; */

/* } */
/* .asd {
    width: 700px;
    margin: 0 auto;
} */

</style>
