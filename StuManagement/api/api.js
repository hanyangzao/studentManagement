import {BASE_URL} from './baseUrl.js'

export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		
		let token=uni.getStorageSync('token');
		
		let objectHeader={
			"Authorization":"Bearer "+token
		};
		
		//console.log("获取",objectHeader);
		uni.request({
			url:BASE_URL+options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: options.header?_.merge(objectHeader,options.header):objectHeader,
			// dataType:options.dataType||'',
			success: (res)=>{
				//console.log("接口请求到的数据:"+JSON.stringify(res));
				if(res.data.code == 401||res.data.code == 403||res.statusCode==403) {
					return uni.showToast({
						// title: res.data.msg
						title:"您的权限不足",
						icon:'none',
						mask:true,
						duration:600000000
					});
					
				}
				
				resolve(res)
			},
			fail: (err)=>{
				uni.showToast({
					title: '请求失败，请刷新页面重试',
					icon:'none'
				})
				reject(err)
			}
		})
	})
}