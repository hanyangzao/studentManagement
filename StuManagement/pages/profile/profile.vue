<template>
	<view>
		<u-cell-group>
				<u-cell-item icon="setting-fill" title="试听填报" :arrow="true" arrow-direction="right" hover-class="cell-hover-class" @click="goAppointment"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(){
			// this.$u.mpShare = {
			// 	title: '涂彧画室-约课', // 默认为小程序名称，可自定义
			// 	path: '', // 默认为当前页面路径，一般无需修改，QQ小程序不支持
			// 	// 分享图标，路径可以是本地文件路径、代码包文件路径或者网络图片路径。
			// 	// 支持PNG及JPG，默认为当前页面的截图
			// 	imageUrl: '' 
			// }
		},
		
		methods:{
			goAppointment:function(){
				console.log('111');
				uni.navigateTo({
				    url: '../appointment/appointment'
				});
			}
			
		}
		
	}
</script>

<style scoped lang="scss">
	.cell-hover-class {
		background-color: rgb(235, 237, 238);
	}
</style>
