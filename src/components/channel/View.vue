<template>
	<div>
		<navbar></navbar>

		<div class="chat">
			<div class="card" v-if="channel">
				<h4 class="card-header">
					{{ channel.label }}
				</h4>
				<div class="card-body posts" v-if="channel.posts.length">
					<div class="card border-0 rounded-0" v-for="p in channel.posts" :key="p._id">
						<div class="card-body p-2">
							<span v-if="p.member_id === session._id && !edit" class="float-right">
								<i class="fa fa-pencil-square-o mr-1" @click="edit = p._id"></i>
								<i class="fa fa-times text-danger" @click="deletePost(p)"></i>
							</span>

							<p><small>Par <strong>
								<a class="userFullName" data-toggle="modal" data-target="#userInfos" @click="memberInfos(getPostMember(p.member_id))" v-if="getPostMember(p.member_id)">
									{{ getPostMember(p.member_id).fullname }}
								</a>
								<span v-else class="text-danger">Membre supprimé</span>
							</strong> le {{ p.updated_at | formatDate }}</small></p>
							<form v-on:submit.prevent="setPost({post: p, messageEdit})" v-if="edit === p._id" class="input-group">
								<input class="form-control rounded mr-2" type="text" v-model="messageEdit" v-on:input="$v.message.$touch"
									   v-bind:class="{ validate: $v.messageEdit.$dirty && !$v.messageEdit.$invalid }">
								<button type="submit" class="btn btn-primary">Edit</button>
							</form>
							<p class="card-text pl-5 pr-5" v-else>
								<span v-highlightjs :key="p.message">
									<vue-markdown :highlight="true">{{ p.message }}</vue-markdown>
								</span>
							</p>
						</div>
					</div>
				</div>
				<div class="card-body" v-else>
					<div class="alert alert-info m-0" role="alert">
						Aucun post pour ce channel !
					</div>
				</div>
			</div>
			<form v-on:submit.prevent="addPost({message})" class="form-markdown">
				<markdown-editor
						class="mb-1"
						v-model="message"
						:configs="configs"
						id="message"
						:highlight="true"
						ref="markdownEditor"
						v-on:input="$v.message.$touch"
						v-bind:class="{ validate: $v.message.$dirty && !$v.message.$invalid }"></markdown-editor>
				<button type="submit" v-bind:disabled="$v.message.$invalid || locked" class="btn btn-primary btn-sm btn-send">Envoyer</button>
			</form>
		</div>

		<div v-if="member" class="modal fade" id="userInfos" tabindex="1" role="dialog" aria-labelledby="userInfos" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="fullname">{{ member.fullname }}</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p><strong>Email :</strong> {{ member.email }}</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import router from '@/router'
    import store from '@/store'
    import { mapGetters, mapActions } from 'vuex'
    import { required, minLength } from 'vuelidate/lib/validators'
    import Vue from 'vue'
    import VueSimplemde from 'vue-simplemde'
    import markdownEditor from 'vue-simplemde/src/markdown-editor'
    import VueMarkdown from 'vue-markdown'
    import VueHighlightJS from 'vue-highlightjs'
    import Navbar from '@/components/app/NavBar'

    Vue.use(VueHighlightJS)
    Vue.use(VueSimplemde)

    export default {
        components: {
            markdownEditor,
            'vue-markdown': VueMarkdown,
            navbar: Navbar
        },
        data() {
            return {
                isActive: false,
                message: '',
                messageEdit: '',
                locked: false,
                configs: {
                    status: false,
                    spellChecker: false,
                    placeholder: 'Votre message...',
                    showIcons: ['strikethrough', 'code', 'table']
                },
                member: {
                    fullname: null,
                    email: null
                },
                edit: null
            }
        },
        beforeRouteUpdate: (to, from, next) => {
            store.dispatch('channel/members')
            store.dispatch('channel/channel', to.params.channel_id)
            next()
        },
        created: () => {
            let channel_id = router.history.current.params.channel_id
            store.dispatch('channel/members')
            store.dispatch('channel/channel', channel_id)
        },
        computed: {
            simplemde () {
                return this.$refs.markdownEditor.simplemde
            },
            ...mapGetters(
                {
                    channel: 'channel/getChannel',
                    session: 'auth/getSession',
                    members: 'channel/getMembers'
                }
            )
        },
        validations: {
            message: {
                required,
                minLenght: minLength(1)
            },
            messageEdit: {
                required,
                minLenght: minLength(1)
            }
        },
        methods: {
            addPost (credentials) {
                this.$store.dispatch('channel/addPost', credentials)
                this._data.message = ''
            },
            deletePost (post) {
                this.$store.dispatch('channel/deletePost', post)
            },
            getPostMember (member_id) {
                let member = null;
                this.members.forEach((m) => {
                    if (m._id === member_id) {
                        member = m
                    }
                })
                return member
            },
            memberInfos (member) {
                this.member = member
            },
            setPost (credentials) {
                this.$store.dispatch('channel/setPost', credentials)
                this._data.messageEdit = ''
                this._data.edit = null
            }
        }
    }
</script>

<style>
	i.fa-times, i.fa-pencil-square-o {
		cursor: pointer;
	}

	.chat {
		position: fixed;
		width: 100%;
		height: calc(100% - 60px);
	}

	.chat > .card {
		height: calc(100% - 150px);
	}

	.posts {
		overflow-x: hidden;
		overflow-y: auto;
	}

	.posts > .card:nth-child(1n+2) > .card-body {
		border-top: 1px solid lightgrey;
	}

	.btn-send {
		width: 70px;
		margin: 0 calc((100% - 70px) / 2);
	}

	a.userFullName {
		cursor: pointer;
		color: #2c3e50;
		transition: color 0.2s ease-in;
	}
	a.userFullName:hover {
		color: #4e5c6b;
	}
	.form-markdown {
		bottom: 0;
		width: 100%;
		height: 150px;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.markdown-editor .CodeMirror, .markdown-editor .CodeMirror-scroll {
		min-height: 50px;
		max-height: 60px;
	}
</style>