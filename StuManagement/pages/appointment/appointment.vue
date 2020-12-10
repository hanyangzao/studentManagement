<template>
	<view class="appointment">
		<view class="bg">
			<swiper class="swiper" 
			:circular="isCircular" 
			:disable-touch="disableTouch" 
			:indicator-dots="indicatorDots"  
			:autoplay="autoplay" 
			:interval="interval" 
			:duration="duration"
			:easing-function="easingFunction"
			>
				<swiper-item class="swiper-item" v-for="(item,index) in bgSrc" :key="index">
					<image class="swiper-item-img" :src="item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="wrap">
			<view class="inner">
				<u-form :model="form" ref="uForm" :errory-type="erroryType" :label-style="labelStyle">
					<u-form-item label="姓名" prop="name" :required="true" :label-position="labelPosition" :border-bottom="borderBottom">
						<u-input v-model="form.name" :type="inputType" :border="inputBorder" placeholder="请输入姓名" :border-color="borderColor" :height="inputHeight"/>
					</u-form-item>
					<u-form-item label="性别" prop="sex" :required="true" :label-position="labelPosition" :border-bottom="borderBottom">
						<u-radio-group v-model="form.sex">
							<u-radio v-for="(item, index) in sexList" :key="index" :name="item.name" :disabled="item.disabled">
								{{ item.name }}
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="美术基础" prop="art" :required="true" :label-position="labelPosition" :border-bottom="borderBottom">
						<u-radio-group v-model="form.art">
							<u-radio v-for="(item, index) in artList" :key="index" :name="item.name" :disabled="item.disabled">
								{{ item.name }}
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="手机号" prop="tel" :required="true" :label-position="labelPosition" :border-bottom="borderBottom">
						<u-input v-model="form.tel" type="number" :border="inputBorder" placeholder="请输入手机号" :border-color="borderColor" :height="inputHeight"/>
					</u-form-item>
					
					<u-form-item label="年龄" prop="age" :required="true" :label-position="labelPosition" :border-bottom="borderBottom">
						<u-input v-model="form.age" :type="inputType" :border="inputBorder" :disabled="true" placeholder="请选择年龄范围" :border-color="borderColor" :height="inputHeight" @click="showAgeSelect=true"/>
						<u-action-sheet :list="ageSelectList" v-model="showAgeSelect" @click="ageSelectCallback"></u-action-sheet>
					</u-form-item>
					<u-form-item label="课程" prop="course" :label-position="labelPosition" :border-bottom="borderBottom">
						<u-input v-model="form.course" :type="inputType" :border="inputBorder" :disabled="true" placeholder="课程" border-color="#ddd" :height="inputHeight" />
						
					</u-form-item>
				</u-form>
				
				<u-modal v-model="showModel" :show-title="false" :show-confirm-button="false">
					<view class="slot-content">
						<rich-text :nodes="modelContent"></rich-text>
					</view>
				</u-modal>
				
				<view class="submitBtn">
					<u-button :plain="true" shape="circle" :ripple="true" ripple-bg-color="#ffc200" :custom-style="customStyle" @click="submit">预约课程</u-button>
				</view>
				
				<!-- <button class='testbutton' open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">授权</button>
				 <button open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">获取电话号码</button>  -->
				
			</view>
		</view>	
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//背景轮播
				isCircular:"true",
				disableTouch:true,
				indicatorDots: false,
				autoplay: true,
				interval: 8000,
				duration: 2000,
				easingFunction:'easeInOutCubic',
				bgSrc:[
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-wka3maxoaxil9e358e/bc8a29b0-3463-11eb-880a-0db19f4f74bb.jpg',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-wka3maxoaxil9e358e/bd6e2110-3463-11eb-880a-0db19f4f74bb.jpg',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-wka3maxoaxil9e358e/be460a80-3463-11eb-b680-7980c8a877b8.jpg'
				],
				//表单
				form: {
					name: '',
					sex: '',
					art:'',
					tel: '',
					age: '',
					course:'',
					
					date:this.$u.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss')
				},
				labelPosition:'top',
				labelStyle:{
					'font-size':'32rpx'
				},
				inputType:"text",
				inputBorder: true,
				borderColor:'#aaa',
				inputHeight:"80",
				borderBottom:false,
				erroryType:['toast','border'],
				customStyle:{
					marginTop: '20px',
					marginBottom: '20px',
					backgroundColor:'#ffd140',
					color: '#fff',
					height:'44px',
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
				artList: [
				{
					name: '没有',
					disabled: false
				},
				{
					name: '有',
					disabled: false
				}
				],
				showAgeSelect:false,
				ageSelectList:[
					{
						text: '3-7岁'
					},
					{
						text: '7-16岁'
					},
					{
						text: '成人'
					}
				],
				rules: {
					name: [
						{ 
							required: true, 
							message: '请输入姓名',
							trigger: ['blur'],
						}
					],
					sex: [
						{ 
							required: true, 
							message: '请选择性别',
							trigger: ['blur'],
						}
					],
					art: [
						{ 
							required: true, 
							message: '请选择是否具有美术基础',
							trigger: ['blur'],
						}
					],
					tel: [
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
					age: [
						{ 
							required: true, 
							message: '请选择年龄范围',
							trigger: ['blur'],
						}
					]
				},
				showModel:false,
				modelContent:`
				<div style="padding:20px 10px;">
				<img style="width:120px;margin-bottom:10px" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-wka3maxoaxil9e358e/ccc10ea0-347e-11eb-899d-733ae62bed2f.png">
				<p style="font-size:18px;margin-top:10px">预约成功,我们将尽快与您联系</p>
				</div>
					
					
				`	
			};
		},
		onLoad(){
			//获取用户信息
			//this.getuserinfo();
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '涂彧美术-约课',
				path: ''
			}
		},
		onShareTimeline(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '涂彧美术-约课',
				path: ''
			}
		},
		methods:{
			getuserinfo: function(){
				// wx登录
				// wx.login({
				//   success (res) {
				// 	if (res.code) {
				// 	  //发起网络请求
				// 	  var code = res.code
				// 		// 获取微信用户信息
						wx.getUserInfo({
						  success: function(res) {
							console.log(res);
							
						  },
						  fail:res=>{
							  console.log("失败");
							  uni.authorize({
									scope:"scope.userInfo",
									success(res) {
										console.log(res);
									},
									fail() {
										uni.openSetting({
											success(authSetting) {
												console.log(authSetting);
											}
										})
									}
								})
						   }
						})
						
				// 	} else {
				// 		console.log("wx.login调用失败");
				// 	}
				//   }
				// })
			},
			
			addStu() {
				uni.showLoading({
					title: '信息提交中...'
				})
				uniCloud.callFunction({
					name: 'addAppointment',
					data: this.form
				}).then((res) => {
					uni.hideLoading()
					console.log(res);
					this.showModel = true;
					// uni.showModal({
						
					// 	content: `预约成功，我们将尽快与您联系`,
					// 	showCancel: false,
					// 	success:function(res){
					// 		if (res.confirm) {
					// 		    console.log("确定");
					// 		} 
							
					// 	}
					// });
					
					
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `请稍后重试`,
						showCancel: false
					})
					console.error(err)
				})
			},
			ageSelectCallback(index){
				var selectText=this.ageSelectList[index].text;
				this.form.age = selectText;
				this.setCourse(selectText);
			},
			setCourse(value){
				switch(value){
					case '3-7岁':
						this.form.course ='创意技法班';
						break;
					case '7-16岁':
						this.form.course ='造型基础班';
						break;
					case '成人':
						this.form.course ='定制课程';
						break;
					 default:
						console.log("选择年龄出错");
					
				}
				
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						this.addStu();
					} else {
						console.log('验证失败');
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.appointment{
		height:100vh;
		position: relative;
		.bg{
			position: absolute;
			z-index: -1;
			left:0;
			right:0;
			top:0;
			bottom: 0;
			background-image: linear-gradient(#0faeff,#e66465);
		}
		.swiper{
			height: 100%;
			//filter: blur(6px);
			opacity: 0.8;
			.swiper-item{
				height: 100%;
				.swiper-item-img{
					height: 100%;
					width: 100%;
				}
			}
		}
		.wrap{
			position: absolute;
			z-index: 10;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.inner{
				position:relative;
				max-height: 90%;
				background-image: url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-wka3maxoaxil9e358e/f6565250-3a02-11eb-b680-7980c8a877b8.png);
				overflow-y: auto;
				width: 90%;
				padding: 20rpx 40rpx;
				box-sizing: border-box;
				border-radius: 16rpx;
				
				// &:after{
				//     content: "";
				//     width:100%;
				//     height:100%;
				//     position: absolute;
				//     left:0;
				//     top:0;
				//     background: inherit;
				//     background-color: #fff;
				// 	opacity: 0.9;
				//     z-index: -1;
				// 	border-radius: 16rpx;
				// }
				.submitBtn{
					margin-bottom: 40rpx;
				}
			}
			
		}
		.slot-content{
			text-align: center;
			img{
				width: 40px;
			}
		}
	}

</style>
