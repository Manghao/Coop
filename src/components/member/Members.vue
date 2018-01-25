<template>
    <div>
        <navbar></navbar>

        <div class="container">
            <h1 class="mt-3">Mon compte</h1>
            <hr />
            <div class="row">
                <div class="card m-3 col-5">
                    <div class="card-body">
                        <span class="float-right">
                            <i class="fa fa-pencil-square-o mr-1"></i>
                            <i class="fa fa-times text-danger"></i>
                        </span>
                        <p class="card-text"><strong>Nom et/ou prénom :</strong> {{ session.fullname }}</p>
                        <p class="card-text"><strong>Email :</strong> {{ session.email }}</p>
                    </div>
                </div>
            </div>
            <h1 class="mt-3">Liste des membres</h1>
            <hr />
            <div class="row">
                <div v-for="member, key in members" v-if="session._id !== member._id" class="card m-3 col-5">
                    <div class="card-body">
                        <p class="card-text"><strong>Nom et/ou prénom :</strong> {{ member.fullname }}</p>
                        <p class="card-text"><strong>Email :</strong> {{ member.email }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Navbar from '@/components/app/NavBar'
    import store from '@/store'

    export default {
        components: {
            navbar: Navbar
        },
        created: () => {
            store.dispatch('channel/members')
        },
        computed: {
            ...mapGetters(
                {
                    session: 'auth/getSession',
                    members: 'channel/getMembers'
                }
            )
        },
        methods: {

        }
    }
</script>

<style>

</style>