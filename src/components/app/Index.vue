<template>
	<div>
		<navbar></navbar>

		<div class="container">
			<h1 class="mt-3">Liste des channels <router-link class="btn btn-secondary" :to="{ name: 'addChannel' }"><i class="fa fa-plus-circle"></i> Ajouter un channel</router-link></h1>
			<hr />
			<div v-if="channels" class="row">
				<div v-for="channel, key in channels" :key="channel._id" class="card m-3 ml-5 mb-4 col-md-3 col-sm-8 col-lg-3 p-0">
					<img class="card-img-top" src="http://via.placeholder.com/350x150" alt="Card image cap">
					<div class="card-body">
						<span v-if="channel.member_id === session._id"  class="float-right">
							<i class="fa fa-pencil-square-o mr-1" @click="showEditChannel(channel)"></i>
							<i class="fa fa-times text-danger" @click="deleteChannel(channel)"></i>
						</span>
						<router-link :to="{ name: 'channel', params: { channel_id: channel._id }}">
							<h5 class="card-title d-inline-block">
								<span @click="changeChannel(key)">{{channel.label}}</span>
							</h5>
						</router-link>
						<h6 class="card-subtitle mb-4 text-muted">{{channel.topic}}</h6>
						<router-link :to="{ name: 'channel', params: { channel_id: channel._id }}">
							<span class="nav-link btn btn-primary btn-sm" @click="changeChannel(key)">Ouvrir</span>
						</router-link>
					</div>
				</div>
			</div>
			<div v-else>
				<div class="alert alert-info col-lg-12 col-sm-12 col-md-12">
					Il n'y a pour le moment aucun channel.
				</div>
			</div>

			<form v-on:submit.prevent="setChannel(editChannel)">
				<b-modal ref="modal" :title="'Editer ' + editChannel.label">
					<div class="form-group">
						<label for="channel-label">Label :</label>
						<input id="channel-label" class="form-control" :value="editChannel.label" autofocus required>
					</div>
					<div>
						<label for="channel-topic">Topic :</label>
						<input id="channel-topic" class="form-control" :value="editChannel.topic" required>
					</div>
					<div slot="modal-footer">
						<button type="submit" class="btn btn-primary">Editer</button>
						<button type="button" class="btn btn-secondary" @click="closeModal()">Fermer</button>
					</div>
				</b-modal>
			</form>
		</div>
	</div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Navbar from '@/components/app/NavBar'

    export default {
        components: {
            navbar: Navbar
        },
        data() {
            return {
                editChannel: {
                    oldChannel: null,
                    label: null,
                    topic: null
                }
            }
        },
        computed: {
            ...mapGetters(
                {
                    session: 'auth/getSession',
                    channels: 'channel/getChannels',
                }
            )
        },
        methods: {
            showEditChannel(channel) {
                this._data.editChannel.oldChannel = channel
                this._data.editChannel.label = channel.label
                this._data.editChannel.topic = channel.topic
                this.$refs.modal.show()
            },
            changeChannel(key) {
                this.$store.dispatch('channel/setLinkActive', key)
            },
            setChannel(editChannel) {
                let label_value = this.$el.querySelector('input#channel-label').value
                let topic_value = this.$el.querySelector('input#channel-topic').value
                this.$store.dispatch('channel/setChannel', {
                    oldChannel: editChannel.oldChannel,
                    label: label_value,
                    topic: topic_value
                })
				this.closeModal()
            },
            deleteChannel(channel) {
                this.$store.dispatch('channel/deleteChannel', channel)
            },
			closeModal() {
                this.$refs.modal.hide()
			}
        }
    }
</script>

<style>
	i.fa-times, i.fa-pencil-square-o {
		cursor: pointer;
	}
</style>