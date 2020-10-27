'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('stuList')
	const res = await collection.doc(event.id).update(event.form)
	return res
};
