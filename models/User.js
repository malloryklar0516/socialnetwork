const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //Mongoose matching validation, must match valid email
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }]
    ,
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.virtual('friendCount').get(function (){
    return this.friends.length;
})

const User = model('User', userSchema);
// export user model and schema
module.exports = User;
