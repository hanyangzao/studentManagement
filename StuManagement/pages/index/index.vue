<template>
	<view class="container">
		
		<u-grid :col="3">
			<u-grid-item>
				<button class='button' @click="goAppointment">
					<u-icon name="edit-pen" :size="54"></u-icon>
					<view class="grid-text">约课</view>
				</button>
			</u-grid-item>
			<u-grid-item>
				<!-- <button class='button' open-type="getUserInfo" @getuserinfo="goAppointmentList" withCredentials="true">
					<u-icon name="order" :size="54"></u-icon>
					<view class="grid-text">试听列表</view>
				</button> -->
				<button class="button" @click="goAppointmentList">
					<u-icon name="order" :size="54"></u-icon>
					<view class="grid-text">试听列表</view>
				</button>
			</u-grid-item>
			
		</u-grid>
		<u-popup v-model="showLoginpopup" mode="bottom" border-radius="14" class="loginPopup">
			<view class="title">
				请登录
			</view>
			<view class="content">
				<u-form :model="form" ref="uForm" :errory-type="erroryType" :label-style="labelStyle" label-width="200">
					<u-form-item label="手机号" prop="user" :required="true"  :border-bottom="borderBottom">
						<u-input v-model="form.user" type="number" :border="inputBorder" placeholder="请输入手机号" :border-color="borderColor" />
					</u-form-item>
					<u-form-item label="密码" prop="paw" :required="true" :border-bottom="borderBottom">
						<u-input v-model="form.paw" type="password" :border="inputBorder" placeholder="请输入密码" :border-color="borderColor"/>
					</u-form-item>
					
				</u-form>
				<view class="btns">
					<u-button @click="login" size="medium" type="primary" shape="circle" :ripple="true">登录</u-button>
				</view>
				
			</view>
			
		</u-popup>
				
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showLoginpopup:false,
				form:{
					user:'',
					paw:''
				},
				inputBorder:true,
				
				borderColor:"#ccc",
				rules: {
					
					user: [
						{ 
							required: true, 
							message: '请输入电话',
							trigger: ['blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['blur'],
						}
					],
					paw: [
						{ 
							required: true, 
							message: '请输入密码',
							trigger: ['blur'],
						}
					]
				},
				hasLogin:false,
			}
		},
		onLoad(){
			
		},
		onReady() {
			var that=this;
			//判断是否登录
			uni.getStorage({
			    key: 'hasLogin',
			    success: function (res) {
			        console.log(res.data);
					if(res.data=="login"){
						that.hasLogin=true;
					}else{
						taht.hasLogin=false;
					}
			    }
			});
			
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			checkUser(form){
				var that=this;
				uni.showLoading({
					title: '正在登录……'
				})
				return uniCloud.callFunction({
					name: 'checkUser',
					data:{
						...form
					}
				}).then((res) => {
					uni.hideLoading()
					//console.log(res.result);
					return res.result;
						
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `登录失败，错误信息为：${err.message}`,
					})
					console.error(err)
				})
				
				
				
			},
			showLogin(){
				this.showLoginpopup=true;
			},
			goAppointment(index){
				uni.navigateTo({
				    url: '../appointment/appointment'
				});
			},
			goAppointmentList(){
				if(this.hasLogin){
					uni.navigateTo({
					    url: '../appointmentList/appointmentList'
					});
				}else{
					this.showLogin();
				}
				
			},
			login(){
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.checkUser(this.form).then((res)=>{
							if(res==1){//登录成功
								this.showLoginpopup=false;
								this.hasLogin=true;
								
								uni.setStorage({
								    key: 'hasLogin',
								    data: 'login',
								    success: function () {
								        console.log('保存登录状态成功');
								    }
								});
								uni.navigateTo({
								    url: '../appointmentList/appointmentList'
								});
								
							}else{
								uni.showToast({
								    title: '登录信息无效',
									icon:'none',
								    duration: 2000
								});
							}
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			
		}
	}
</script>

<style scoped lang="scss">
	.container {
		.button{
			background-color: #fff;
			&:after{
				display: none;
			}
		}
		.grid-text {
			font-size: 28rpx;
			margin-top: 16rpx;
			color: $u-type-info;
		}
		.loginPopup{
			.title{
				text-align: center;
				padding: 20rpx;
				background-color: #fafafa;
			}
			.content{
				padding:20rpx 80rpx 50rpx;
			}
			.btns{
				margin-top: 20rpx;
				text-align: center;
			}
		}
	}
</style>
