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
						<ul class="nav nav-pills flex-column">
							<li class="nav-item">
								<a class="nav-link active" href="#">Channel 1 <span class="sr-only">(current)</span></a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">Channel 2</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">Channel 3</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">Channel 4</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="btn-group" role="group">
				<router-link :to="{name: 'account'}" class="btn btn-secondary">Mon Compte</router-link>
				<button class="btn btn-danger" @click="logout"><i class="fa fa-sign-out"></i></button>
			</div>
		</nav>
		<div class="container-fluid">
			<div class="row">
				<nav class="col-sm-2 col-md-2 hidden-xs-down bg-faded sidebar">
					<ul class="nav nav-pills flex-column">
						<li class="nav-item">
							<a class="nav-link active" href="#">Channel 1 <span class="sr-only">(current)</span></a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Channel 2</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Channel 3</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Channel 4</a>
						</li>
					</ul>
				</nav>

				<div class="col-sm-10 col-md-10 offset-md-2">

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'

    export default {
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