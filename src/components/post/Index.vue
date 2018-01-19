<template>
    <div>
        <br />
        <div class="card posts">
            <h4 class="card-header">
                Posts
            </h4>
            <div class="card-body" v-if="posts.posts.length > 0">
                <div class="card" v-for="p in posts.posts">
                    <div class="card-body">
                        <i v-if="p.member_id === session._id" class="float-right fa fa-times text-danger" @click="deletePost(p._id)"></i>
                        <p><small>Par <strong>{{ getPostMember(p.member_id) }}</strong> le {{ p.updated_at | formatDate }}</small></p>
                        <p class="card-text pl-3 pr-3">{{ p.message }}</p>
                    </div>
                </div>
            </div>
            <div class="card-body" v-else>
                <div class="alert alert-info m-0" role="alert">
                    Aucun post pour ce channel !
                </div>
            </div>
        </div>
        <form v-on:submit.prevent="addPost({message, idChannel})" class="input-group mt-3 mb-3">
            <input type="text" class="form-control" id="message" placeholder="Entrer votre message..."
                   v-on:input="$v.message.$touch"
                   v-bind:class="{ validate: $v.message.$dirty && !$v.message.$invalid }"
                   v-model="message">
            <button type="submit" v-bind:disabled="$v.$invalid || locked" class="btn btn-primary">Envoyer</button>
        </form>
    </div>
</template>

<script>
    import { required, minLength } from 'vuelidate/lib/validators'
    import { mapGetters } from 'vuex'

    export default {
        props: ['posts', 'members'],
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
        computed: {
            ...mapGetters(
                {
                    session: 'auth/getSession'
                }
            )
        },
        methods: {
            addPost (credentials) {
                this.$store.dispatch('channel/addPost', credentials)
                this._data.message = ''
            },
            deletePost (idPost) {
                this.$store.dispatch('channel/deletePost', { idChannel: this._data.idChannel, idPost: idPost })
            },
            getPostMember (member_id) {
            	let members = this.$store.getters['channel/getMembers']
            	let fullname = null;
            	members.forEach((member) => {
	                if (member._id === member_id) {
	                    fullname = member.fullname
	                }
	            })
	            return fullname
            }
        }
    }
</script>

<style scoped>
    i.fa-times {
        cursor: pointer;
    }

    .posts {
        height: 75vh;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>
