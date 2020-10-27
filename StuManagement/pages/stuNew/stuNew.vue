<template>
	<view class="stuNew_form">
		<view class="form_card">
			<u-form :model="form" ref="uForm"  :label-style="formLabelstyle">
					<u-form-item label="姓名" prop="stuName" ><u-input v-model="form.stuName" placeholder="请输入学员姓名" :disabled="inputDisabled"/></u-form-item>
					<u-form-item label="性别" prop="sex" >
						<u-radio-group v-model="form.sex">
							<u-radio v-for="(item, index) in sexList" :key="index" :name="item.name" :disabled="item.disabled">
								{{ item.name }}
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="年龄" prop="age"><u-input v-model="form.age" type="number" placeholder="请输入年龄" :disabled="inputDisabled"/></u-form-item>
					<u-form-item label="爸爸" prop="ftel">
						<u-input v-model="form.ftel" type="number" placeholder="请输入手机号" :disabled="inputDisabled"/>
						<template v-slot:right >
								<view class="telBtn" @click="telTo(form.ftel)" v-show="form.ftel">
									<u-icon name="phone" color="#007aff" size="34"></u-icon>
								</view>
						</template>
					</u-form-item>
					<u-form-item label="妈妈" prop="mtel">
						<u-input v-model="form.mtel" type="number" placeholder="请输入手机号" :disabled="inputDisabled"/>
						<template v-slot:right >
								<view class="telBtn" @click="telTo(form.mtel)" v-show="form.mtel">
									<u-icon name="phone" color="#007aff" size="34"></u-icon>
								</view>
						</template>
					</u-form-item>
					<u-form-item label="其他家长" prop="otel" label-width="140">
						<u-input v-model="form.otel" type="number" placeholder="请输入手机号" :disabled="inputDisabled"/>
						<template v-slot:right >
								<view class="telBtn" @click="telTo(form.otel)" v-show="form.otel">
									<u-icon name="phone" color="#007aff" size="34"></u-icon>
								</view>
						</template>
					</u-form-item>
					<u-form-item label="选择课程" prop="course" label-width="140">
						<u-input v-model="form.course" type="select" @click="isShowCourse" />
						<u-action-sheet :list="courseList" v-model="showCourse" @click="courseSelect"></u-action-sheet>
					</u-form-item>
					<u-form-item label="课时" prop="courseTime" label-width="140">
						<u-input v-model="form.courseTime" type="number" placeholder="请输入时长(小时)" :disabled="inputDisabled"/>
					</u-form-item>
					<u-form-item label="赠送课时" prop="courseOthertime" label-width="140">
						<u-input v-model="form.courseOthertime" type="number" placeholder="请输入时长(小时)" :disabled="inputDisabled"/>
					</u-form-item>
					<u-form-item label="总课时"  label-width="140">
						
						<u-input v-model="courseTotaltime" type="number" placeholder="" :disabled="true"/>
					</u-form-item>
					<u-form-item label="上课时间" prop="week" label-width="140">
						<u-input v-model="form.week" type="select" @click="isShowWeek" placeholder="请选择周几上课"/>
						<u-select v-model="showWeek" mode="single-column" :default-value="defaultWeek" :list="weekList"  @confirm="weekSelect"></u-select>
						<!-- <u-action-sheet :list="weekList" v-model="showWeek" @click="weekSelect"></u-action-sheet> -->
					</u-form-item>
					<u-form-item label="上课时段" label-width="140">
						
						<u-row gutter="16" class="timeGroup">
							<u-col span="5">
								<view class="time-item">
									<u-input v-model="startTime"  :disabled="true" @click="isStartTimeShow" placeholder="开始时间"/>
									<u-picker v-model="startTimeShow" :default-time="form.defaultstartTime" mode="time" :params="TimeParams" @confirm="startTimePicker"></u-picker>
								</view>
								
							</u-col>
							<u-col span="2">
								<view style="text-align: center;">
									~
								</view>
							</u-col>
							<u-col span="5">
								<view class="time-item">
									<u-input v-model="endTime"  :disabled="true" @click="isEndTimeShow" placeholder="结束时间"/>
									<u-picker v-model="endTimeShow" :default-time="form.defaultendTime" mode="time" :params="TimeParams" @confirm="endTimePicker"></u-picker>
								</view>
								
							</u-col>
						</u-row>
						<!-- <u-input v-model="form.week" type="select" @click="showWeek = true" />
						<u-select v-model="showWeek" mode="single-column"  :list="weekList"  @confirm="weekSelect"></u-select> -->
						<!-- <u-action-sheet :list="weekList" v-model="showWeek" @click="weekSelect"></u-action-sheet> -->
						
						
					</u-form-item>
					
					<u-form-item label="选择老师" prop="teacher" label-width="140">
						<u-input v-model="form.teacher" type="select" @click="isShowTeacher" placeholder="请选择老师"/>
						<u-action-sheet :list="teacherList" v-model="showTeacher" @click="teacherSelect"></u-action-sheet>
					</u-form-item>
					<u-form-item label="备注" prop="remark">
						<u-input v-model="form.remark" type="textarea"  height="100" :auto-height="true" placeholder="备注" :disabled="inputDisabled"/>
					</u-form-item>
					
					
			</u-form>
		</view>
		
		<view class="btnGroup" v-if="showBtnGroup">
			<u-row gutter="32" >
				<u-col span="6" class="btn-item">
					<u-button type="warning" shape="circle" :ripple="true"  @click="cancel">取消</u-button>
				</u-col>
				<u-col span="6" class="btn-item"> 
					<u-button type="primary" shape="circle" :ripple="true" @click="submit">提交</u-button>
				</u-col>
			</u-row>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formObj:{},
				form:{
					"stuName":"",
					"avatar":"",
					"sex":"",
					"age":"",
					"ftel":"",
					"mtel":"",
					"otel":"",
					"course":"",
					"courseTime":"",
					"courseOthertime":"",
					"week":"",
					"defaultstartTime":"",
					"startTime":{
						hour:"09",
						minute:"00"
					},
					"defaultendTime":"",
					"endTime":{
						hour:"10",
						minute:"00"
					},
					"teacher":"",
					"remark":""
					
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
				showCourse:false,
				courseList: [
					// {
					// 	text: '创意美术技法班'
					// },
					// {
					// 	text: '造型基础班'
					// }
					
				],
				showWeek:false,
				defaultWeek:[0],
				weekList: [
					{
						value: '周一',
						label: '周一'
					},
					{
						value: '周二',
						label: '周二'
					},
					{
						value: '周三',
						label: '周三'
					},
					{
						value: '周四',
						label: '周四'
					},
					{
						value: '周五',
						label: '周五'
					},
					{
						value: '周六',
						label: '周六'
					},
					{
						value: '周日',
						label: '周日'
					}
				],
				
				startTimeShow:false,
				endTimeShow:false,
				TimeParams:{
					year: false,
					month: false,
					day: false,
					hour: true,
					minute: true,
					second: false
				},
				showTeacher:false,
				teacherList: [
					// {
					// 	text: '创意美术技法班'
					// },
					// {
					// 	text: '造型基础班'
					// }
					
				],
				formLabelstyle:{
					color:"#1e253f"
				},
				showBtnGroup:true,
				inputDisabled:false,
				rules: {
					stuName: [
						{
							required: true,
							message: '请输入学员姓名',
							// 可以单个或者同时写两个触发验证方式
							trigger: 'blur,change'
						}
					]
					
				}
				
				
			};
		},
		onLoad(obj){
			this.formObj=obj;
			
			if(obj.id){
				
				this.getStuinfo(obj.id);
					
				if(obj.status=="edit"){//编辑
					
				}else{//查看
				    this.formDisabled();
					this.showBtnGroup=false;
				}
				
			}else{//新建
				
			}
			
			
			this.getCourselist();
			this.getTeacherlist();
		},
		onReady(){
			
			//改变标题
			let navTitle="";
			if(this.formObj.status=="new"){
				navTitle="新建学员"
			}else if(this.formObj.status=="edit"){
				navTitle="编辑学员"
			}else{
				navTitle="学员详情"
			}
			
			uni.setNavigationBarTitle({
			    title: navTitle
			});
			
			
			
			
		
			//绑定规则
			this.$refs.uForm.setRules(this.rules);
		},
		computed:{
			startTime:{
				get(){
					return this.form.startTime.hour+":"+this.form.startTime.minute
				}
			},
			endTime:{
				get(){
					return this.form.endTime.hour+":"+this.form.endTime.minute
				}
			},
			courseTotaltime(){
				return parseInt(this.form.courseTime||0)+parseInt(this.form.courseOthertime||0);
			}
				
		},
		methods:{
			getStuinfo(id){
				uni.showLoading({
					title: '获取学员信息...'
				})
				uniCloud.callFunction({
					name: 'getStuinfo',
					data:{
						id
					}
				}).then((res) => {
					
					this.form=res.result.data[0];
					//数据加载完成后再执行
					this.$nextTick(function(){
						   uni.hideLoading();
					        //设置select默认上课时间（周几）
					       this.defaultWeek=[_.findIndex(this.weekList, {'value': this.form.week})];
					        
					        //设置默认打开时间
					        this.form.defaultstartTime=this.form.startTime.hour+":"+this.form.startTime.minute;
					        this.form.defaultendTime=this.form.endTime.hour+":"+this.form.endTime.minute;       
					})
						
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `获取学员信息失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			getCourselist(){
				// uni.showLoading({
				// 	title: '获取课程列表...'
				// })
				uniCloud.callFunction({
					name: 'getCourselist'
				}).then((res) => {
					//uni.hideLoading();
					this.courseList=res.result.data;
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `获取课程列表失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			getTeacherlist(){
				// uni.showLoading({
				// 	title: '获取课程列表...'
				// })
				uniCloud.callFunction({
					name: 'getTeacherlist'
				}).then((res) => {
					//uni.hideLoading();
					this.teacherList=res.result.data;
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `获取教师列表失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			addStu() {
				uni.showLoading({
					title: '添加新学员...'
				})
				uniCloud.callFunction({
					name: 'addStu',
					data: this.form
				}).then((res) => {
					uni.hideLoading()
					console.log(res);
					uni.showModal({
						//content: `成功添加一条数据，文档id为：${res.result.id}`,
						content: `添加学员成功`,
						showCancel: false,
						success:function(res){
							if (res.confirm) {
							    uni.navigateBack();
								uni.$emit('updateStuList',{msg:'更新学员列表'})
							} 
							
						}
					});
					
					
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `添加学员失败`,
						showCancel: false
					})
					console.error(err)
				})
			},
			updateStu(){
				this.$delete(this.form,'_id')
				uni.showLoading({
					title: '更新学员信息...'
				})
				uniCloud.callFunction({
					name: 'updateStu',
					data: {
						id:this.formObj.id,
						form:this.form
					}
				}).then((res) => {
					uni.hideLoading()
					console.log(res);
					uni.showModal({
						//content: `成功添加一条数据，文档id为：${res.result.id}`,
						content: `更新成功`,
						showCancel: false,
						success:function(res){
							if (res.confirm) {
							    uni.navigateBack();
								uni.$emit('updateStuList',{msg:'更新学员列表'})
							} 
							
						}
					});
					
					
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `更新学员失败`,
						showCancel: false
					})
					console.error(err)
				})
			},
			isShowCourse(){
				this.formObj.status=="unedit"?(this.showCourse=false):(this.showCourse=true);
			},
			courseSelect(index){
				this.form.course = this.courseList[index].text;
			},
			isShowWeek(){
				this.formObj.status=="unedit"?(this.showWeek=false):(this.showWeek=true);
			},
			weekSelect(e){
				console.log(e)
				this.form.week=e[0].value
			},
			isStartTimeShow(){
				this.formObj.status=="unedit"?(this.startTimeShow=false):(this.startTimeShow=true);
			},
			startTimePicker(e){
				console.log(e);
				this.form.startTime=e;
			},
			isEndTimeShow(){
				this.formObj.status=="unedit"?(this.endTimeShow=false):(this.endTimeShow=true);
			},
			endTimePicker(e){
				console.log(e);
				this.form.endTime=e;
			},
			isShowTeacher(){
				this.formObj.status=="unedit"?(this.showTeacher=false):(this.showTeacher=true);
			},
			teacherSelect(index){
				this.form.teacher = this.teacherList[index].text;
			},
			formDisabled(){
				this.inputDisabled=true;
				
				_(this.sexList).forEach(function(value) {
				  value.disabled=true;
				});
			},
			telTo(telnum){
				uni.makePhoneCall({
				    phoneNumber: telnum 
				});
			},
			cancel(){
				uni.navigateBack();
			},
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						//判断更新或新建
						if(this.formObj.status=="edit"){
							this.updateStu();
						}else{
							this.addStu();
						}
						
					} else {
						console.log('验证失败');
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.stuNew_form{
		padding: 20rpx;
		.form_card{
			padding:0 30rpx;
			background-color: #fff;
			border-radius: 12rpx;
		}
		
	}
	.timeGroup{
		width: 100%;
		
		.time-item{
			background-color: $gdl-color-gray-light;
			/deep/input{
				text-align: center;
			}
		}
	}
	.btnGroup{
		margin: 40rpx 0;
	}
	.telBtn{
		width: 60rpx;
		text-align: center;
	}
	
	/deep/.u-radio__icon-wrap--disabled{
		    color: #fff;    
	}
	/deep/.u-radio__icon-wrap--disabled--checked{
		background-color: #2979ff;
		border-color: #2979ff;
	}

</style>
