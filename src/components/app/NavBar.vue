<template>
	<div>
		<b-navbar class="navbar navbar-expand-lg navbar-dark bg-dark">
			<a class="navbar-brand" href="/">Co'op</a>

			<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

			<b-collapse class="navbar-collapse" id="nav_collapse">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<router-link class="nav-link text-light" :to="{name: 'index'}">Accueil</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link text-light" :to="{name: 'members'}">Membres</router-link>
					</li>
					<li class="nav-item">
						<a class="nav-link btn_channels text-light" @click="isActive = !isActive">Channels</a>
					</li>
				</ul>
				<div class="btn-group mt-1 mb-1" role="group">
					<button type="button" class="btn btn-secondary" @click="showModalAccount()">{{ user.fullname }}</button>
					<button class="btn btn-danger" @click="logout"><i class="fa fa-sign-out"></i></button>
				</div>
			</b-collapse>
		</b-navbar>

		<b-modal ref="modal_account" title="Mes informations">
			<div>
				<p><strong>Nom et/ou prénom :</strong> {{ user.fullname }}</p>
				<p class="mb-0"><strong>Email :</strong> {{ user.email }}</p>
			</div>
			<div slot="modal-footer">
				<button type="button" class="btn btn-secondary" @click="closeModalAccount()">Fermer</button>
			</div>
		</b-modal>

		<transition name="slide-fade">
			<nav v-if="isActive" class="hidden-xs-down bg-faded sidebar">
				<router-link class="btn btn-secondary mb-1" :to="{ name: 'addChannel' }"><i class="fa fa-plus-circle"></i> Ajouter un channel</router-link>
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
            },
            showModalAccount() {
                this.$refs.modal_account.show()
            },
            closeModalAccount() {
                this.$refs.modal_account.hide()
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
		height: calc(100% - 65px);
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