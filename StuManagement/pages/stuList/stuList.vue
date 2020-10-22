<template>
	<view>
		<view class="stuList">
			<gdl-stuList :stuList="stuList"></gdl-stuList>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stuList:[]	
			}
		},
		onLoad(){
			this.getStulist();
		},
		methods:{
			getStulist(){
				uni.showLoading({
					title: '获取学员列表...'
				})
				uniCloud.callFunction({
					name: 'getStulist'
				}).then((res) => {
					uni.hideLoading();
					this.stuList=res.result.data;
					//console.log("学员列表：",res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `查询失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			}
		}
		
	}
</script>

<style lang="scss">

</style>
