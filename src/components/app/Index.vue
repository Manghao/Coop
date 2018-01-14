<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<a class="navbar-brand" href="#">Co'op</a>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
					</li>
				</ul>
				<a class="btn btn-light mr-1" href="#/login">Connexion <span class="sr-only">(current)</span></a>
				<a class="btn btn-light" href="#/registration">Inscription <span class="sr-only">(current)</span></a>
			</div>
		</nav>
		<div class="container-fluid">
			<div class="row">
				<nav class="col-sm-2 col-md-2 hidden-xs-down bg-faded sidebar">
					<ul class="nav nav-pills flex-column">
						<li class="nav-item">
							<a class="nav-link active" href="#">Channel 1 <span class="sr-only">(current)</span></a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Channel 2</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Channel 3</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Channel 4</a>
						</li>
					</ul>
				</nav>
				<div class="col-sm-10 col-md-10 offset-md-2">

				</div>
			</div>
		</div>
	</div>
</template>

<script>
    export default {

    }
</script>

<style>
	.bg-faded {
		background-color: #f7f7f7;
	}

	.sidebar {
		min-width: 150px;
		position: fixed;
		top: 56px;
		bottom: 0;
		left: 0;
		z-index: 1000;
		padding: 20px;
		overflow-x: hidden;
		overflow-y: auto;
		border-right: 1px solid #eee;
	}

	@media screen and (max-width: 600px) {
		.sidebar {
			max-width: 150px;
		}
	}
</style>