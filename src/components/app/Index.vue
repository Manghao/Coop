<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<a class="navbar-brand" href="/">Co'op</a>
			<div class="navbar-collapse">
				<div class="dropdown">
					<a class="btn_channels nav-link dropdown-toggle text-light" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Channels
					</a>
					<div class="dropdown-menu sidebar bg-faded m-0" aria-labelledby="dropdownMenuButton">
						<button class="btn btn-secondary mb-1"><i class="fa fa-plus-circle"></i> Ajouter</button>
						<ul class="nav nav-pills flex-column" v-for="channel in channels">
							<li class="nav-item">
								<hr class="m-0" />
								<a class="nav-link" href="#">
									<strong>{{ channel.label }}</strong> 
									<br />
									<small>{{ channel.topic }}</small>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="btn-group" role="group">
				<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#account">{{ user.fullname }}</button>
				<button class="btn btn-danger" @click="logout"><i class="fa fa-sign-out"></i></button>
			</div>
		</nav>
		<div class="container-fluid">
			<div class="row">
				<nav class="col-sm-2 col-md-2 hidden-xs-down bg-faded sidebar">
					<button class="btn btn-secondary mb-1"><i class="fa fa-plus-circle"></i> Ajouter un channel</button>
					<ul class="nav nav-pills flex-column" v-for="channel in channels">
						<li class="nav-item">
							<hr class="m-0" />
							<a class="nav-link" href="#">
								<strong>{{ channel.label }}</strong> 
								<br />
								<small>{{ channel.topic }}</small>
							</a>
						</li>
					</ul>
				</nav>

				<div class="col-sm-10 col-md-10 offset-md-2">

				</div>
			</div>
		</div>

		<div class="modal fade" id="account" tabindex="-1" role="dialog" aria-labelledby="account" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="accountLabel">Mes informations</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p><strong>Nom :</strong> {{ user.fullname }}</p>
						<p><strong>Email :</strong> {{ user.email }}</p>
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
	import { mapActions, mapGetters } from 'vuex'

	export default {
		created() {
			this.$store.dispatch('channel/channels')
		},
		computed: {
			...mapGetters(
				{
					user: 'auth/getSession',
					channels: 'channel/getChannels'
				}
			)
		},
		methods: {
			logout () {
				this.$store.dispatch('auth/logout')
			}
		}
	}
</script>

<style>
	.bg-faded {
		background-color: #f7f7f7;
	}

	.sidebar {
		min-width: 150px;
		position: fixed;
		top: 56px;
		bottom: 0;
		left: 0;
		z-index: 1000;
		padding: 20px;
		overflow-x: hidden;
		overflow-y: auto;
		border-right: 1px solid #eee;
	}

	.btn_channels {
		cursor: pointer;
		display: none;
	}

	@media screen and (max-width: 600px) {
		.sidebar {
			max-width: 150px;
		}
	}

	@media screen and (max-width: 500px) {
		.sidebar {
			display: none;
		}

		.navbar-collapse {
			flex-basis: 0;
		}

		.btn_channels {
			display: block;
		}
	}
</style>