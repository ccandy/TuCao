module.exports.getList = function(collectionName,db,req,res){
	db.open(function(err,db){
		if(err){
			res.send(err);
		}else{
			var collection = db.collection(collectionName);
			collection.find({}).toArray(function(err,docs){
				res.json(docs);
			});
		}
		db.clsoe();
	})
}

module.exports.insertList = function(collectionName,db,req,res){
	db.open(function(err,db){
		if(err){
			res.send(err);
		}else{
			var collection 	= db.collection(function(err,docs){
				collection.insert(req.body,function(err,result{
					if(err){
						res.send(err.message);
					}else{
						res.json(result);
					}
				});
			});
		}
		db.close();
	})
}

module.exports.removeAllList = function(collectionName,db,res){
	db.open(function(err,db){
		if(err){
			res.send(err.message);
			
		}else{
			var collection = db.collection(collectionName);
			collection.remove();
		}
		db.close();
		res.send('removeall');
	});
}

module.exports.removeListByID = function(collectionName,db,req,res){
	db.open(function(err,db){
		if(err){
			res.send(err.message);
		}else{
			var collection = db.collection(collectionName);
			collection.findAndRemove(res.body, function(err,doc){
				if(err){
					res.send(err);
				}else{
					var t_id 	= parseInt(req.params['t_id']);
					var query 	= {'tid':t_id};
					collection.findAndRemove(query, function(err,doc){
						if(err){
							res.send(err.message);
						}else{
							res.json(doc);
						}
					})
				}
			});
		}
		db.close();
	});
}


moudle.exports.postList 	= function(collectionName,db,req,res){
	db.open(function(err,db){
		if(err){
			res.send(err.message);
		}else{
			var collection 	 = db.collection(collectionName);
			collecton.count(function(err,count){
				if(err){
					res.send(err.message);
				}else{
					req.body.tid = count + 1;
					collection.insert(req, function(err,result)){
						if(err){
							res.send(err.message);
						}else{
							res.send(result);
						}
					}
				}
			});
		}
		db.close();
	});
}



