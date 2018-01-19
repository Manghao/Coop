<template>
    <div>
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
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: ['channels', 'isActive'],
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
                this.$store.dispatch('channel/channelPosts', idChannel)
            }
        }
    }
</script>
