<template>
    <div>
        <div class="card">
            <h4 class="card-header">
                Posts
            </h4>
            <div class="card-body">
                <div class="card" v-if="posts.posts.length > 0" v-for="p in posts.posts">
                    {{ p._id }}
                    <div class="card-body">
                        <i class="float-right fa fa-times text-danger" @click="deletePost(p._id)"></i>
                        <p><small>Ecrit le {{ p.updated_at | formatDate }}</small></p>
                        <p class="card-text pl-3 pr-3">{{ p.message }}</p>
                    </div>
                </div>
                <div class="card" v-else>
                    <div class="card-body">
                        <p class="card-text pl-3 pr-3">Aucun post pour cette chaîne !</p>
                    </div>
                </div>
            </div>
        </div>
        <form v-on:submit.prevent="addPost({message, idChannel})" class="input-group mt-3 mb-3">
            <input type="text" class="form-control" id="message" placeholder="Entrer votre message..."
                   v-on:input="$v.message.$touch"
                   v-bind:class="{validate: $v.message.$dirty
										&& !$v.message.$invalid}"
                   v-model="message">
            <button type="submit" v-bind:disabled="$v.$invalid || locked" class="btn btn-primary">Envoyer</button>
        </form>
    </div>
</template>

<script>
    import { required, minLength } from 'vuelidate/lib/validators'

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
            addPost (credentials) {
                this.$store.dispatch('channel/addPost', credentials)
                this._data.message = ''
            },
            deletePost (idPost) {
                this.$store.dispatch('channel/deletePost', { idChannel: this._data.idChannel, idPost: idPost })
            }
        }
    }
</script>

<style scoped>
    i.fa-times {
        cursor: pointer;
    }
</style>
