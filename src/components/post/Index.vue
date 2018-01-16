<template>
    <div>
        <p>Channel d'id: {{ posts.idChannel }}</p>
        <div v-if="posts.posts.length > 0">
            <div v-for="p in posts.posts">
                <p>Post: {{ p }}</p>
            </div>
        </div>
        <div v-else>
            <p>Aucun post pour cette chaîne !</p>
        </div>
        <form v-on:submit.prevent="addPost({message, idChannel})" class="row">
            <input type="text" class="form-control col-10 ml-4 mr-4" id="message" placeholder="Entrer votre message..."
                   v-on:input="$v.message.$touch"
                   v-bind:class="{validate: $v.message.$dirty
										&& !$v.message.$invalid}"
                   v-model="message">
            <button type="submit" v-bind:disabled="$v.$invalid || locked" class="btn btn-primary col-1">Envoyer</button>
        </form>
    </div>
</template>

<script>
    import { required, minLength } from 'vuelidate/lib/validators'
    import { mapActions } from 'vuex'

    export default {
        props: ['posts'],
        data() {
            return {
                message: '',
                idChannel: this.posts.idChannel,
                locked: false
            }
        },
        validations: {
            message: {
                required,
                minLenght: minLength(1)
            }
        },
        methods: {
            ...mapActions('channel', ['addPost'])
        }
    }
</script>
