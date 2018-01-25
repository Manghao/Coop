<template>
	<div>
		<navbar></navbar>

		<div class="container">
			<h1 class="mt-3">Liste des channels</h1>
			<hr />
			<div v-if="channels" class="row">
				<div v-for="channel, key in channels" class="card m-3 col-md-3 col-sm-8 col-lg-3 p-0 mx-auto">
					<img class="card-img-top" src="http://via.placeholder.com/350x150" alt="Card image cap">
					<div class="card-body">
						<router-link :to="{ name: 'channel', params: { channel_id: channel._id }}">
							<h5 class="card-title">
								<span @click="changeChannel(key)">{{channel.label}}</span>
							</h5>
						</router-link>
						<h6 class="card-subtitle mb-2 text-muted">{{channel.topic}}</h6>
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
	computed: {
		...mapGetters(
			{
				channels: 'channel/getChannels',
			}
		)
	},
	methods: {
		changeChannel(key) {
          	this.$store.dispatch('channel/setLinkActive', key)
        }
	}
}
</script>

<style>
/*.container {
	margin-top: 80px;
}*/
</style>