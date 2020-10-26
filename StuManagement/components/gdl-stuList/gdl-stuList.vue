<template>
	<view class="wrap pd-20">
		<view class="stu_list">
			
		
				<view class="stu_item capsule" v-for="(item, index) in stuList" :key="item._id">	
					<u-avatar :src="item.avatar" :show-sex="true" :sex-icon="item.sex=='男'?'man':'woman'"></u-avatar>
					<view class="centerCon">
						<view class="topCon">
							<view class="stuName">
								{{item.stuName}}
							</view>
							<view class="stuAge">
								{{item.age}}岁
							</view>
						</view>
						<view class="bottomCon">
							<div class="tel">
								课程:{{item.course}}
							</div>
						</view>
					</view>
					<view class="delBtn" @click="delStu(index,item._id)">
						<u-icon name="close" color="#888" size="28"></u-icon>
					</view>
				</view>
			
			
			
		</view>
	</view>
	
</template>

<script>
	export default {
		props: ['stuList'],
		data(){
			return {
				
			}
		},
		methods: {
			delStu(index,id){
			   //console.log(index,id);
			   this.$emit("del",index,id);
			}
		}
	}
</script>

<style scoped lang="scss">
	.stu_list {
		margin-bottom:200rpx;
		
		.stu_item {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			overflow: hidden;
			background-color:#fff;
			
			.centerCon{
				flex: 1;
				padding-left: 28rpx;
				color:$gdl-color-black;
				.topCon{
					display: flex;
					align-items:center;
					.stuName{
						padding-right: 20rpx;
						font-weight: bold;
						
					}
					.stuAge{
						color:$uni-text-color-grey
					}
				}
				.bottomCon{
					margin-top: 16rpx;
					.tel{
						//color:$uni-text-color-grey;
						font-size: 24rpx;
					}
				}
				
			}
			.delBtn{
				width: 60rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			
		}
		
		
		
	}
</style>
