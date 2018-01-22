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
						<router-link class="nav-link" :to="{name: index}">Accueil</router-link>
					</li>
					<li class="nav-item">
						<a class="btn btn_channels text-light" @click="isActive = !isActive">Channels</a>
					</li>
				</ul>
				<div class="btn-group mt-1 mb-1" role="group">
					<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#account">{{ user.fullname }}</button>
					<button class="btn btn-danger" @click="logout"><i class="fa fa-sign-out"></i></button>
				</div>
			</div>

			<transition name="slide-fade">
	            <nav v-if="isActive" class="hidden-xs-down bg-faded sidebar">
	                <button class="btn btn-secondary mb-1"><i class="fa fa-plus-circle"></i> Ajouter un channel</button>
	                <ul class="nav nav-pills flex-column" v-for="channel, key in channels">
	                    <li class="nav-item">
	                        <hr class="m-0" />
	                        <router-link class="nav-link" :class="[key === linkActive ? 'text-primary' : '']" :to="{ name: 'channel', params: { channel_id: channel._id }}">
	                            <strong>{{ channel.label }}</strong>
	                            <br />
	                            <small>{{ channel.topic }}</small>
	                        </router-link>
	                    </li>
	                </ul>
	            </nav>
	        </transition>
		</nav>
	</div>
</template>

<script>
    import { mapGetters } from 'vuex'
	import store from '@/store'

    export default {
        data () {
            return {
                isActive: false
            }
        },
        created: () => {
			store.dispatch('channel/channels')
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

    a.nav-link {
        cursor: pointer;
    }
</style>