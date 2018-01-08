<template>
	<div class="row">
		<div class="col s12 m8 offset-m2">
			<h1 class="center">Co'op</h1>
			<div class="card">
				<div class="card-content">
					<span class="card-title center">Inscription</span>
					<p>
						<form v-on:submit.prevent="registration({fullname, email, password})">
							<div class="row">
								<div class="input-field col s12">
									<input id="fullname" type="text"
									v-on:input="$v.fullname.$touch"
									v-bind:class="{invalid: $v.fullname.$error, validate: $v.fullname.$dirty && !$v.fullname.$invalid}" 
									v-model="fullname"
									v-bind:disabled="locked">
									<label for="fullname">Nom et/ou Prénom</label>
									<div v-if="$v.fullname.$error" class="red-text error">
										Veuillez saisir un nom et/ou un prénom valide !
									</div>
								</div>
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
								<div class="input-field col s12">
									<input id="passwordr" type="password"
									v-on:input="$v.passwordr.$touch"
									v-bind:class="{invalid: $v.passwordr.$error, validate: $v.passwordr.$dirty && !$v.passwordr.$invalid}" 
									v-model="passwordr"
									v-bind:disabled="locked">
									<label for="passwordr">Confirmer mot de passe</label>
									<div v-if="$v.passwordr.$error" class="red-text error">
										Veuillez saisir un mot de passe valide !
									</div>
									<div class="infos-form right">
										a-z, A-Z, 0-9, -, _, min. 6 caractères
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col s12 m12">
									<button type="submit" name="action" v-bind:disabled="$v.$invalid || locked" class="waves-effect waves-light btn blue left">S'inscrire</button>
									<router-link :to="{name: 'login'}">
										<span class="waves-effect waves-light btn red right">Connexion</span>
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
	import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
	import { mapActions } from 'vuex'

	export default {
		data() {
			return {
				fullname: '',
				email: '',
				password: '',
				passwordr: '',
				locked: false
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
			passwordr: {
				sameAsPassword: sameAs('password')
			}
		},
		methods: {
			...mapActions(['registration'])
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