<template>
	<div class="test1">
		<div class="box1"></div>
	</div>
</template>

<script>
export default {
	
}
</script>

<style lang="less" scoped>
.test1 {
	// border-width: 10px;
	// border-style: dotted;
	// border-color: #000;
	padding: 20px;
	background-color: #ccc;
	background-clip: content-box;
	.box1 {
		margin: if(2 > 1, 0, 3px);
		width: 100px;
		height: 100px;
		background-color: rgb(22, 100, 6);
		
	}
}
</style>
