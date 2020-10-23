'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('stuList');
	const res =await collection.doc(event.id).remove()
	if (res.deleted === 1) {
		return {
			status: 0,
			msg: '成功删除学员'
		}
	} else {
		return {
			status: -2,
			msg: '删除学员失败'
		}
	}
};
