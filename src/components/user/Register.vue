<template>
	<div class="container">
		<h1 class="text-center mt-5 mb-5">Co'op</h1>
		<div class="row">
			<b-alert class="col-10 offset-md-1 mb-5" v-if="error" :show="alertCountDown"
				dismissible
				variant="danger"
				@dismissed="alertCountDown=0"
				@dismiss-count-down="alertCountDownChanged">

				<p>{{ error }}</p>
				
				<b-progress variant="danger"
					:max="dismissSecs"
					:value="alertCountDown"
					height="4px">
				</b-progress>
			</b-alert>
			<div class="col-10 offset-md-1">
				<div class="card bg-light">
					<div class="card-header">Inscription</div>
					<div class="card-body">
						<form v-on:submit.prevent="registration({fullname, email, password})">
							<label for="fullname">Nom et/ou Prénom :</label>
							<div class="input-group">
								<div class="input-group-prepend">
									<div class="input-group-text"><i class="fa fa-user"></i></div>
								</div>
								<input type="text" class="form-control" id="fullname" placeholder="Nom et/ou Prénom" autofocus
									   v-on:input="$v.fullname.$touch"
									   v-bind:class="{invalid: $v.fullname.$error, validate: $v.fullname.$dirty
										&& !$v.fullname.$invalid}"
									   v-model="fullname"
									   v-bind:disabled="locked">
							</div>
							<div v-if="$v.fullname.$error" class="red-text error mb-3">
								Veuillez saisir un nom et/ou prénom valide !
							</div>

							<label for="email">Email :</label>
							<div class="input-group">
								<div class="input-group-prepend">
									<div class="input-group-text">@</div>
								</div>
								<input type="email" class="form-control" id="email" placeholder="Email"
									   v-on:input="$v.email.$touch"
									   v-bind:class="{invalid: $v.email.$error, validate: $v.email.$dirty
										&& !$v.email.$invalid}"
									   v-model="email"
									   v-bind:disabled="locked">
							</div>
							<div v-if="$v.email.$error" class="red-text error mb-3">
								Veuillez saisir un email valide !
							</div>

							<label for="password">Mot de passe :</label>
							<div class="input-group">
								<div class="input-group-prepend">
									<div class="input-group-text"><i class="fa fa-key"></i></div>
								</div>
								<input type="password" class="form-control" id="password" placeholder="Mot de passe"
									   v-on:input="$v.password.$touch"
									   v-bind:class="{invalid: $v.password.$error, validate: $v.password.$dirty
										&& !$v.password.$invalid}"
									   v-model="password"
									   v-bind:disabled="locked">
							</div>
							<div v-if="$v.password.$error" class="red-text error mb-3">
								Veuillez saisir un mot de passe valide !
							</div>

							<label for="password">Confirmer mot de passe :</label>
							<div class="input-group">
								<div class="input-group-prepend">
									<div class="input-group-text"><i class="fa fa-key"></i></div>
								</div>
								<input type="password" class="form-control" id="passwordConfirm" placeholder="Mot de passe"
									   v-on:input="$v.passwordConfirm.$touch"
									   v-bind:class="{invalid: $v.passwordConfirm.$error, validate: $v.passwordConfirm.$dirty
										&& !$v.passwordConfirm.$invalid}"
									   v-model="passwordConfirm"
									   v-bind:disabled="locked">
							</div>
							<div v-if="$v.passwordConfirm.$error" class="red-text error mb-3">
								Veuillez saisir un mot de passe valide !
							</div>
							<div class="text-center mt-3">
								<button type="submit" v-bind:disabled="$v.$invalid || locked" class="btn btn-primary">S'inscrire</button>
								<router-link :to="{name: 'login'}" class="btn btn-danger right">Connexion</router-link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
    import { mapActions } from 'vuex'
    import store from '@/store'

    export default {
        data() {
            return {
                fullname: '',
                email: '',
                password: '',
                passwordConfirm: '',
                locked: false,
				alertCountDown: 0,
				dismissSecs: 5,
				error: null
            }
        },
        validations: {
            fullname: {
                required,
                minLenght: minLength(1)
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLenght: minLength(6)
            },
            passwordConfirm: {
                sameAsPassword: sameAs('password')
            }
        },
        methods: {
        	registration(credentials) {
        		store.dispatch('auth/registration', credentials)
        		let err = store.getters['auth/getErrorRegistration']
        		if (err != false) {
					this.error = err
					this.alertCountDown = this.dismissSecs
				}
			},
			alertCountDownChanged (alertCountDown) {
				this.alertCountDown = alertCountDown
			}
        }
    }
</script>

<style>
	.error, .infos-form {
		font-size: 12px;
		margin-top: -20px;
	}
</style>