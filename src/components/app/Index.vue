<template>
	<div>
		<navbar></navbar>

		<div class="container">
			<h1 class="mt-3">Liste des channels</h1>
			<hr />
			<div class="row">
				<div v-for="channel in channels" class="card m-3" style="width: 30%;">
					<div class="card-body">
						<img class="card-img-top" src="http://via.placeholder.com/350x150" alt="Card image cap">
						<router-link :to="{ name: 'channel', params: { channel_id: channel._id }}"><h5 class="card-title">{{channel.label}}</h5></router-link>
						<h6 class="card-subtitle mb-2 text-muted">{{channel.topic}}</h6>
						<router-link class="nav-link btn btn-primary btn-sm" :to="{ name: 'channel', params: { channel_id: channel._id }}">Ouvrir</router-link>
					</div>
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
	}
}
</script>

<style>
.container {
	margin-top: 80px;
}
.slide-fade-enter-active {
	transition: all .25s ease-in;
}
.slide-fade-leave-active {
	transition: all .25s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
	transform: translateX(-10px);
	opacity: 0;
}

.btn_channels {
	cursor: pointer;
}
</style>