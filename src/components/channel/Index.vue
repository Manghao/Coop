<template>
    <div>
        <transition name="slide-fade">
            <nav class="hidden-xs-down bg-faded sidebar">
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
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: ['channels'],
        computed: {
            ...mapGetters(
                {
                    linkActive: 'channel/getLinkActive'
                }
            )
        },
        methods: {
            getChannelPosts (key, idChannel) {
                this.$parent.isActive = !this.$parent.isActive
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

    a.nav-link {
        cursor: pointer;
    }
</style>