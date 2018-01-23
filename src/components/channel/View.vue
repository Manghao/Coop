<template>
	<div>
		<navbar></navbar>

		<div class="container">
			<br />
			<div class="card">
				<h4 class="card-header">
					{{ channel.label }}
				</h4>
				<div class="card-body posts" v-if="channel.posts.length > 0">
					<div class="card" v-for="p in channel.posts" :key="p._id">
						<div class="card-body">
							<i v-if="p.member_id == session._id" class="float-right fa fa-times text-danger" @click="deletePost(p)"></i>
							<p><small>Par <strong>{{ getPostMember(p.member_id) }}</strong> le {{ p.updated_at | formatDate }}</small></p>
							<p class="card-text pl-3 pr-3">
								<span v-highlightjs>
									<vue-markdown :highlight="true">{{ p.message }}</vue-markdown>
								</span v-highlightjs>
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
				}
			}
		},
		updated: () => {
			let channel_id = router.history.current.params.channel_id
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