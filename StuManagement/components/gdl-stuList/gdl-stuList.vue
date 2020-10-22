<template>
	<view class="wrap pd-20">
		<view class="stu_list">
			
			<u-swipe-action :show="item.show" :index="index" 
						v-for="(item, index) in stuList" :key="item._id" 
						@click="swipeClick" @open="swipeOpen"
						:options="options"
					>
					
				<view class="stu_item capsule">	
					<u-avatar :src="item.avatar" :show-sex="true" :sex-icon="item.sex==1?'man':'woman'"></u-avatar>
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
								联系方式:{{item.parents[0].tel}}({{item.parents[0].role}})
							</div> 
						</view>
					</view>
					<view class="del" @click="delStu">
						<u-icon name="trash" color="#888"></u-icon>
					</view>
				</view>
			
			</u-swipe-action>
			
			
		</view>
	</view>
	
</template>

<script>
	export default {
		props: ['stuList'],
		data(){
			return {
				show: false,
				options: [
					{
						text: '收藏',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			}
		},
		methods: {
		
		}
	}
</script>

<style scoped lang="scss">
	.stu_list {
		.stu_item {
			display: flex;
			align-items: center;
			margin-bottom: 20rpx;
			overflow: hidden;
			background-color:lighten($gdl-color-blue,52%);
			
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
		}
	}
</style>
