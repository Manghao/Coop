<template>
	<div >
		<br />
		<div class="card">
			<h4 class="card-header">
				Posts
			</h4>
			<div class="card-body posts" v-if="posts.posts.length > 0">
				<div class="card" v-for="p in posts.posts" :key="p._id">
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
		<form v-on:submit.prevent="addPost({message, idChannel})" class="mt-3 mb-3">
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
</template>

<script>
	import { mapGetters } from 'vuex'
	import { required, minLength } from 'vuelidate/lib/validators'
	import Vue from 'vue'
	import VueSimplemde from 'vue-simplemde'
	import markdownEditor from 'vue-simplemde/src/markdown-editor'
	import VueMarkdown from 'vue-markdown'
	import VueHighlightJS from 'vue-highlightjs'
 
	Vue.use(VueHighlightJS)
	Vue.use(VueSimplemde)

	export default {
		components: {
			markdownEditor,
			'vue-markdown': VueMarkdown
		},
		props: ['posts', 'members'],
		data() {
			return {
				message: '',
				idChannel: this.posts.idChannel,
				locked: false,
				configs: {
					status: false,
					spellChecker: false
				}
			}
		},
		validations: {
			message: {
				required,
				minLenght: minLength(1)
			}
		},
		computed: {
			simplemde () {
				return this.$refs.markdownEditor.simplemde
			},
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
