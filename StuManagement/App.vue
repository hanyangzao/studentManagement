//引入vcansole
// var VConsole = require('./util/vconsole.min.js');
<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	mounted(){
		// var vConsole=new VConsole();
		// console.log('vConsole 启用');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
//引入iconfont字體
@import url("./static/fonts/iconfont.css");
//引入uView基础样式
@import "uview-ui/index.scss";	
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */

//頁面別景色
page{
	background-color: #f5f5f5;
}
</style>
