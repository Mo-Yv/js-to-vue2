<template>
	<div id="app">
		<NavBar class="navbar" />
		<router-view class="router-view"></router-view>
	</div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
	name: "App",
	components: { NavBar },
};
</script>

<style scoped>
#app {
	overflow-x: auto;
}

.navbar {
	z-index: 999;
}
</style>
