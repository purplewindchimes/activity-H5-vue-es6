<template>
	<h1>ts: {{ts}}</h1>
</template>
<script>
	export default {
		data(){
			return {
				ts:new Date().getTime()
			};
		}
	}
</script>