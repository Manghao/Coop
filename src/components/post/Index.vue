<template>
    <div>
        <p>Channel d'id: {{ posts.idChannel }}</p>
        <div v-if="posts.posts">
            <div v-for="p in posts.posts">
                <p>Post: {{ p }}</p>
            </div>
        </div>
        <div v-else>
            <p>Aucun post pour cette chaîne !</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['posts']
    }
</script>
