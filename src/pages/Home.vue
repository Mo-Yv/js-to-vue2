<template>
	<div class="home-content">
		<h1>Home</h1>
		<div class="home-links">
			<a href="#" v-for="i in 10" :key="i">
				test link{{ i }}
			</a>
		</div>
	</div>
</template>

<script>
export default {
	name: "Home",
	data() {
		return {
			linksArr: [],
		};
	},
};
</script>

<style>
@import url("./css/Home.css");
</style>
