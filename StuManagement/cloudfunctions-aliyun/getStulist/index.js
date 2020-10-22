'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('stuList')
	const res = await collection.get()
	return res
};
