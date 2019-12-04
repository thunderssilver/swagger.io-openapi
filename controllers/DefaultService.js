
'use strict';
var low = require('lowdb');
const db = low('db.json');
const express=require('express');
const router=express.Router();
const Post=require('../models/Post');
const bj=require('bjson');



exports.getAllNotes = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  
    //const posts= Post.find();
    //res.end(bj.stringify(posts));
 
Post.find().lean().exec(function (err, users) {
    return res.end(JSON.stringify(users));
});

  
  //res.end(JSON.stringify(db.get('notes').value()));


}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}

exports.postNote = function(args, res, next) {
  /**
   * parameters expected in the args:
  * note (Note)
  **/
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;

  const post =new Post({
    title: args.title.value.title,
  });

  
  try{
  const savedPost= post.save();
  //res.end({title:args.title.value.title});  
  res.end(args.title.value.title +"  " + "saved");
  //res.end(JSON.stringify(savedPost));
  
  }catch(err) {
    res.end({message: err});
  }


/*
  var result = db.get('notes')
    .push({ id: uuid(), title: args.title.value.title })
    .value()
  res.end(JSON.stringify(result));
*/

}

exports.getNotesById = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (String)
  * note (Note)
  **/
  if(args.id.value === '') {
     res.statusCode = 500;
     res.end('ID Required');
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;

  /*try{
    const post= Post.findById(args.id.value);
    res.json(post);
  }catch(err){

    res.json({message:err});
  }*/
const post= Post.findById(args.id.value);
  post.lean().exec(function (err, users) {
    return res.end(JSON.stringify(users));
});
  //res.end(JSON.stringify(db.get('notes').find({ id: args.id.value }).value()));
}

exports.putNotesById = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (String)
  * note (Note)
  **/
  if(args.id.value === '') {
     res.statusCode = 500;
     res.end('ID Required');
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;

  
  Post.findOne({_id:args.id.value }, function (err, doc){
  doc.title = args.title.value.title;
  //doc.visits.$inc();
  doc.save();
  return res.end(JSON.stringify(doc));
});
  
 /* var result = db.get('notes')
    .find({ id: args.id.value })
    .assign({ text: args.title.value.title})
    .value()
  res.end(JSON.stringify(result));
}*/


}
exports.patchNotesById = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (String)
  * note (Note)
  **/
  if(args.id.value === '') {
     res.statusCode = 500;
     res.end('ID Required');
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;

  Post.findOne({_id:args.id.value }, function (err, doc){
  doc.title = args.title.value.title;
  //doc.visits.$inc();
  doc.save();
  return res.end(JSON.stringify(doc));
});
/*
  var result = db.get('notes')
    .find({ id: args.id.value })
    .assign({ text: args.note.value.text })
    .value()
  res.end(JSON.stringify(result));*/
}

exports.deleteNotesById = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (String)
  * note (Note)
  **/
  if(args.id.value === '') {
     res.statusCode = 500;
     res.end('ID Required');
  }
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 204;

  const removedPost= Post.remove({_id:args.id.value});
  removedPost.lean().exec(function (err, users) {
    return res.end(JSON.stringify(users));
});
  /*db.get('notes')
    .remove({ id: args.id.value })
    .value()
  res.end();*/
}
