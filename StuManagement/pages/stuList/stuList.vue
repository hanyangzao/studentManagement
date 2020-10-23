<template>
	<view>
		<view class="stuList">
			<gdl-stuList :stuList="stuList" @del="showDelmodal(arguments)"></gdl-stuList>
		</view>
		
		<!-- 浮动按钮 -->
		<uni-fab 
					:pattern="pattern"
		            :horizontal="horizontal"
					:popMenu="false"
		            @fabClick="newStu"
		>	
		</uni-fab>
		
		<!-- 删除提示 -->
		<u-modal v-model="showDelModel"
				:content="DelModelcontent"
				:show-cancel-button="true"
				@confirm="delStuitem"
		 >
		</u-modal>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stuList:[],
				currentItem:{},
				showDelModel:false,
				DelModelcontent:"是否删除该学员？",
				horizontal:"right",
				pattern:{
					"color":"#ffffff",
					"buttonColor":"#faab5a"
					
				}
				
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
			},
			del(e){
				//console.log(e);
				
				uni.showLoading({
					title: '处理中...'
				})
				uniCloud.callFunction({
					name: 'delStuitem',
					data: {
						id:e[1]
					}
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: res.result.msg,
						showCancel: false
					})
					console.log(res)
					
					this.stuList.splice(e[0],1);
					
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `删除失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			showDelmodal(e){
				this.showDelModel = true;
				this.currentItem=e;
			},
			delStuitem(){
				this.del(this.currentItem);
			},
			newStu(){
				//console.log("跳转");
				uni.navigateTo({
				    url: '../stuNew/stuNew'
				});
			}
			
			
		}
		
	}
</script>

<style lang="scss">

</style>
