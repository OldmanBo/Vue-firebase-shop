<template>
    <div class="not_found_page">
        <h1>Page not found. Try going </h1>
        <router-link :to="{ name: 'Index' }" >HOME</router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .not_found_page {
        text-align: center;
        padding: 200px;
    }
    .not_found_page a{
        display: block;
        font-size: 2rem;
        margin-top: 30px;
    }
</style>