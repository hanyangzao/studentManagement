<template>
	<view class="stuNew_form">
		<u-form :model="form" ref="uForm" class="form_card" :label-style="formLabelstyle">
				<u-form-item label="姓名"><u-input v-model="form.stuName" placeholder="请输入学员姓名" /></u-form-item>
				<u-form-item label="性别">
					<u-radio-group v-model="form.sex">
						<u-radio v-for="(item, index) in sexList" :key="index" :name="item.name" :disabled="item.disabled">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="年龄"><u-input v-model="form.age" type="number" placeholder="请输入年龄" /></u-form-item>
				<u-form-item label="爸爸">
					<u-input v-model="form.ftel" type="number" placeholder="请输入手机号" />
				</u-form-item>
				<u-form-item label="妈妈">
					<u-input v-model="form.mtel" type="number" placeholder="请输入手机号" />
				</u-form-item>
				<u-form-item label="其他家长" label-width="140">
					<u-input v-model="form.otel" type="number" placeholder="请输入手机号" />
				</u-form-item>
				
				
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					"stuName":"",
					"avatar":"",
					"sex":"",
					"age":"",
					"ftel":"",
					"mtel":"",
					"otel":""
						
					
					
					
				},
				sexList: [
					{
						name: '男',
						disabled: false
					},
					{
						name: '女',
						disabled: false
					}
				],
				formLabelstyle:{
					color:"#1e253f"
				}
				
				
			};
		}
	}
</script>

<style scoped lang="scss">
	.stuNew_form{
		padding: 20rpx;
		.form_card{
			padding:0 20rpx;
			background-color: #fff;
			border-radius: 12rpx;
		}
		
	}

</style>
