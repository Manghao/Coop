<template>
	<div class="container">
		<h1 class="text-center mt-5">Co'op</h1>
		<div class="row">
			<div class="col-10 offset-md-1 mt-5">
				<div class="card bg-light">
					<div class="card-header">Connexion</div>
					<div class="card-body">
						<p class="card-text m-0">
							<form v-on:submit.prevent="login({email, password})">
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
								<div v-if="$v.email.$error" class="red-text error  mb-3">
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
								<div v-if="$v.password.$error" class="red-text error  mb-3">
									Veuillez saisir un mot de passe valide !
								</div>
								<div class="text-center mt-3">
									<button type="submit" v-bind:disabled="$v.$invalid || locked" class="btn btn-primary">Se connecter</button>
									<router-link :to="{name: 'registration'}" class="btn btn-danger right">Créer un compte</router-link>
								</div>
							</form>
						</p>
					</div>
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
	color: red;
}
</style>