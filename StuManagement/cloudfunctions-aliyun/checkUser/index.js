'use strict';
const db=uniCloud.database();
exports.main = async (event, context) => {
	const collection=db.collection('adminList');
	const res=await collection.where({
		user:event.user,
		paw:event.paw
		
	}).get();
	
	
	return res.data.length
};
