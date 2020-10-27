'use strict';
const db=uniCloud.database();
exports.main = async (event, context) => {
	const collection=db.collection('stuList');
	const res=await collection.where({
		_id:event.id
	}).get();
	return res
};
