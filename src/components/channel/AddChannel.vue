<template>
	<div>
		<navbar></navbar>

		<div class="container">
			<h1 class="mt-3">Ajouter un channel</h1>
			<hr />
			<div class="mt-3">
				<form v-on:submit.prevent="addChannel({ label, topic })">
					<div class="form-group">
						<label for="label">Label :</label>
						<input type="text" class="form-control" id="label" placeholder="Label" autofocus
							   v-on:input="$v.label.$touch"
							   v-bind:class="{invalid: $v.label.$error, validate: $v.label.$dirty
										&& !$v.label.$invalid}"
							   v-model="label"
							   v-bind:disabled="locked">
					</div>
					<div v-if="$v.label.$error" class="red-text error mb-3">
						Veuillez saisir un label valide !
					</div>
					<div class="form-group">
						<label for="topic">Topic :</label>
						<input type="text" class="form-control" id="topic" placeholder="Topic"
							   v-on:input="$v.topic.$touch"
							   v-bind:class="{invalid: $v.topic.$error, validate: $v.topic.$dirty
										&& !$v.topic.$invalid}"
							   v-model="topic"
							   v-bind:disabled="locked">
					</div>
					<div v-if="$v.topic.$error" class="red-text error mb-3">
						Veuillez saisir un topic valide !
					</div>
					<div class="mt-4">
						<button type="submit" v-bind:disabled="$v.$invalid || locked" class="btn btn-primary">Valider</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
    import { required, minLength } from 'vuelidate/lib/validators'
    import Navbar from '@/components/app/NavBar'

    export default {
        data() {
            return {
                label: '',
				topic: '',
                locked: false
            }
        },
        components: {
            navbar: Navbar
        },
        validations: {
            label: {
                required,
                minLenght: minLength(1)
            },
			topic: {
                required,
				linLength: minLength(1)
			}
        },
		methods: {
            addChannel(credentials) {
                this.$store.dispatch('channel/addChannel', credentials)
			}
		}
    }
</script>