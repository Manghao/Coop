<template>
	<div>
		<navbar></navbar>

		<div class="container">
			<br />
			<div class="card">
				<h4 class="card-header">
					{{ channel.label }}
				</h4>
				<div class="card-body posts" v-if="channel.posts.length">
					<div class="card" v-for="p in channel.posts" :key="p._id">
						<div class="card-body">
							<i v-if="p.member_id == session._id" class="float-right fa fa-times text-danger" @click="deletePost(p)"></i>
							<p><small>Par <strong>
								<a class="userFullName" data-toggle="modal" data-target="#userInfos" @click="memberInfos(getPostMember(p.member_id))">
									{{ getPostMember(p.member_id).fullname }}
								</a class="nav-link">
							</strong> le {{ p.updated_at | formatDate }}</small></p>
							<p class="card-text pl-3 pr-3">
								<span v-highlightjs>
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
			<form v-on:submit.prevent="addPost({message})" class="mt-3 mb-3">
				<markdown-editor
					class="mb-3"
					v-model="message" 
					:configs="configs" 
					id="message" 
					:highlight="true"
					ref="markdownEditor"
					v-on:input="$v.message.$touch"
					v-bind:class="{ validate: $v.message.$dirty && !$v.message.$invalid }"></markdown-editor>
				<button type="submit" v-bind:disabled="$v.$invalid || locked" class="btn btn-primary btn-block">Envoyer</button>
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
				}
			}
		},
		/*updated: () => {
			let channel_id = router.history.current.params.channel_id
			store.dispatch('channel/channel', channel_id)
		},*/
		created: () => {
			let channel_id = router.history.current.params.channel_id
			store.dispatch('channel/channel', channel_id)
			store.dispatch('channel/members')
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
			}
		},
		beforeRouteUpdate: (to, from, next) => {
			store.dispatch('channel/channel', to.params.channel_id)
			store.dispatch('channel/members')
		    next()
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
                let members = this.$store.getters['channel/getMembers']
                let memebr = null;
                members.forEach((m) => {
                    if (m._id === member_id) {
                        memebr = m
                    }
                })
                return memebr
            },
            memberInfos (member) {
            	this.member = member
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
    .container {
    	margin-top: 80px;
    }
    a.userFullName {
    	cursor: pointer;
    	color: #2c3e50;
    	transition: color 0.2s ease-in;
    }
    a.userFullName:hover {
    	color: #4e5c6b;
    }
</style>