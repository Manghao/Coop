<template>
	<div class="row">
		<div class="col s12 m8 offset-m2">
			<h1 class="center">Co'op</h1>
			<div class="card">
				<div class="card-content">
					<span class="card-title center">Connexion</span>
					<p>
						<form v-on:submit.prevent="login({email, password})">
							<div class="row">
								<div class="input-field col s12">
									<input id="email" type="email"
									v-on:input="$v.email.$touch"
									v-bind:class="{invalid: $v.email.$error, validate: $v.email.$dirty && !$v.email.$invalid}" 
									v-model="email"
									v-bind:disabled="locked">
									<label for="email">Email</label>
									<div v-if="$v.email.$error" class="red-text error">
										Veuillez saisir un email valide !
									</div>
								</div>
								<div class="input-field col s12">
									<input id="password" type="password"
									v-on:input="$v.password.$touch"
									v-bind:class="{invalid: $v.password.$error, validate: $v.password.$dirty && !$v.password.$invalid}" 
									v-model="password"
									v-bind:disabled="locked">
									<label for="password">Mot de passe</label>
									<div v-if="$v.password.$error" class="red-text error">
										Veuillez saisir un mot de passe valide !
									</div>
									<div class="infos-form right">
										a-z, A-Z, 0-9, -, _, min. 6 caractères
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col s12 m12">
									<button class="waves-effect waves-light btn blue left" type="submit" name="action" v-bind:disabled="$v.$invalid || locked">Se connecter</button>
									<router-link :to="{name: 'registration'}">
										<span class="waves-effect waves-light btn red right">Créer un compte</span>
									</router-link>
								</div>
							</div>
						</form>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { required, minLength, email } from 'vuelidate/lib/validators'
	import { mapActions } from 'vuex'

	export default {
		data() {
			return {
				email: '',
				password: '',
				locked: false
			}
		},
		validations: {
			email: {
				required,
				email
			},
			password: {
				required,
				minLenght: minLength(6)
			}
		},
		methods: {
			...mapActions('auth', ['login'])
		}
	}
</script>

<style>
body {
	background-color: #eeeeee;
}
.error, .infos-form {
	font-size: 12px;
	margin-top: -20px;
}
</style>