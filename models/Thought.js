const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength:1,
      },  
      username: {
          type: String,
          required: true,
          //the user that created this thought
        },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Reaction',
        },
    ],},
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
