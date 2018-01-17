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
						<a class="btn btn_channels text-light" @click="isActive = !isActive">Channels</a>
					</li>
				</ul>
				<div class="btn-group mt-1 mb-1" role="group">
					<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#account">{{ user.fullname }}</button>
					<button class="btn btn-danger" @click="logout"><i class="fa fa-sign-out"></i></button>
				</div>
			</div>
		</nav>
		<div class="container">
			<transition name="slide-fade">
				<nav v-if="isActive" class="hidden-xs-down bg-faded sidebar">
					<button class="btn btn-secondary mb-1"><i class="fa fa-plus-circle"></i> Ajouter un channel</button>
					<ul class="nav nav-pills flex-column" v-for="channel, key in channels">
						<li class="nav-item">
							<hr class="m-0" />
							<a class="nav-link" :class="[key === linkActive ? 'text-primary' : '']" @click="getChannelPosts(key, channel._id)">
								<strong>{{ channel.label }}</strong>
								<br />
								<small>{{ channel.topic }}</small>
							</a>
						</li>
					</ul>
				</nav>
			</transition>

			<posts-list :posts="posts">

			</posts-list>
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
    import { mapGetters } from 'vuex'
    import PostsIndex from '@/components/post/Index'

    export default {
        data () {
            return {
                isActive: false,
				linkActive: 0
            }
        },
        components: {
            'posts-list': PostsIndex
        },
        created() {
            this.$store.dispatch('channel/channels')
        },
        computed: {
            ...mapGetters(
                {
                    user: 'auth/getSession',
                    channels: 'channel/getChannels',
                    posts: 'channel/getPosts'
                }
            )
        },
        methods: {
            logout () {
                this.$store.dispatch('auth/logout')
            },
            getChannelPosts (key, idChannel) {
                this._data.isActive = !this._data.isActive
				this._data.linkActive = key
                this.$store.dispatch('channel/channelPosts', idChannel)
            }
        }
    }
</script>

<style>
	.slide-fade-enter-active {
		transition: all .4s ease-in;
	}
	.slide-fade-leave-active {
		transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to {
		transform: translateX(-10px);
		opacity: 0;
	}

	.bg-faded {
		background-color: #f7f7f7;
	}

	.sidebar {
		width: 210px;
		height: 100%;
		position: absolute;
		left: 0;
		z-index: 1000;
		padding: 20px;
		overflow-x: hidden;
		overflow-y: auto;
		border-right: 1px solid #eee;
	}

	.btn_channels {
		cursor: pointer;
	}

	a.nav-link {
		cursor: pointer;
	}
</style>