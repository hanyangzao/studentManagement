<template>
	<view>
		<view class="appointmentList">
			<view class="item" v-for="item in appointmentList" :key="item._id">
				<view class="header">
					<view class="date">
						{{item.date}}
					</view>
				</view>
				
				<view class="inner">
					<view class="content">
						<view class="name">
							{{item.name}}<text class="age">{{item.age}}</text> 
						</view>
						
						<view class="tel">
							{{item.tel}}
						</view>
						<view class="course">
							{{item.course}}
						</view>
					</view>
					<view class="telBtn" @click="telTo(item.tel)">
						<u-icon name="phone" color="#ffc200" size="50"></u-icon>
					</view>
				</view>
				
				
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appointmentList:[]
			};
		},
		onLoad(){
			this.getAppointmentList();
		},
		onPullDownRefresh(){
			this.getAppointmentList().then((res)=>{
				console.log("停止下拉刷新");
				uni.stopPullDownRefresh();
			})
		},
		methods:{
			getAppointmentList(){
				uni.showLoading({
					title: '获取试听列表...'
				})
				return uniCloud.callFunction({
					name: 'getAppointmentList'
				}).then((res) => {
					uni.hideLoading();
					this.appointmentList=res.result.data;
					console.log("试听列表：",res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `查询失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			telTo(telnum){
				uni.makePhoneCall({
				    phoneNumber: telnum 
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.appointmentList{
		padding: 20rpx;
		.item{
			.header{
				text-align: center;
				.date{
					display: inline-block;
					text-align: center;
					padding: 8rpx;
					background-color: #ddd;
					margin: 0 auto 20rpx;
					border-radius: 6rpx;
					font-size: 24rpx;
				}
			}
			
			.inner{
				display: flex;
				justify-content:space-between;
				align-items: center;
				padding: 20rpx;
				background-color: #fff;
				margin-bottom: 40rpx;
				border-radius: 16rpx;
				line-height: 40rpx;
				.name{
					font-size: 28rpx;
					font-weight: bold;
					
				}
				.age{
					font-size: 24rpx;
					color:$gdl-color-blue;
					padding-left: 20rpx;
					font-weight: normal;
				}
				.telBtn{
					width: 140rpx;
					text-align: center;
					
				}
			}
			
		}
	}
</style>
