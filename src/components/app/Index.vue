<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<a class="navbar-brand" href="#">Co'op</a>
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
	position: fixed;
	top: 56px;
	bottom: 0;
	left: 0;
	z-index: 1000;
	padding: 20px;
	padding-right: 20px;
	padding-left: 20px;
	overflow-x: hidden;
	overflow-y: auto;
	border-right: 1px solid #eee;
}
</style>