<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<a class="navbar-brand" href="/">Co'op</a>
			<button @click="isActive ? isActive = !isActive : null" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<router-link class="nav-link" :to="{name: 'index'}">Accueil</router-link>
					</li>
					<li class="nav-item">
						<a class="nav-link btn_channels text-light" @click="isActive = !isActive">Channels</a>
					</li>
				</ul>
				<div class="btn-group mt-1 mb-1" role="group">
					<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#account">{{ user.fullname }}</button>
					<button class="btn btn-danger" @click="logout"><i class="fa fa-sign-out"></i></button>
				</div>
			</div>

			<div class="modal fade" id="account" tabindex="1" role="dialog" aria-labelledby="accountModal" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="accountModal">Mes informations</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<p>{{ user.fullname }}</p>
							<p>{{ user.email }}</p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
		<transition name="slide-fade">
			<nav v-if="isActive" class="hidden-xs-down bg-faded sidebar">
				<button class="btn btn-secondary mb-1"><i class="fa fa-plus-circle"></i> Ajouter un channel</button>
				<ul class="nav nav-pills flex-column">
					<li class="nav-item" v-for="channel, key in channels" :key="channel._id">
						<hr class="m-0" />
						<span @click="changeChannel(key)">
							<router-link class="nav-link side-link" :class="[key === linkActive ? 'text-primary' : '']" :to="{ name: 'channel', params: { channel_id: channel._id }}">
	                    		<strong>{{ channel.label }}</strong>
		                        <br />
		                        <small>{{ channel.topic }}</small>
	                    	</router-link>
						</span>
					</li>
				</ul>
			</nav>
		</transition>
	</div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import store from '@/store'

    export default {
        data() {
            return {
                isActive: false,
            }
        },
        created: () => {
            store.dispatch('channel/channels')
        },
        computed: {
            ...mapGetters(
                {
                    user: 'auth/getSession',
                    channels: 'channel/getChannels',
                    linkActive: 'channel/getLinkActive'
                }
            )
        },
        methods: {
            logout () {
                this.$store.dispatch('auth/logout')
            },
            changeChannel(key) {
                this._data.isActive = !this._data.isActive
                this.$store.dispatch('channel/setLinkActive', key)
            }
        }
    }
</script>

<style>
	.bg-faded {
		background-color: #f7f7f7;
	}

	.sidebar {
		width: 210px;
		height: 100vh;
		position: absolute;
		left: 0;
		z-index: 1000;
		padding: 20px;
		overflow-x: hidden;
		overflow-y: auto;
		border-right: 1px solid #eee;
	}

	a.side-link {
		color: #000;
	}

	a.nav-link {
		cursor: pointer;
	}

	.modal-backdrop {
		z-index: 1;
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
</style>