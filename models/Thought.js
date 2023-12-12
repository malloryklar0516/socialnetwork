const { Schema, model, Types } = require('mongoose');
//create reaction schema
const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },  
      username: {
          type: String,
          required: true,
        },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      toJSON: {
        getters: true,
      },
      id: false,
    }
  );
  //create thought schema, references reactionschema
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
    reactions: [reactionSchema]},
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
thoughtSchema.virtual('reactionCount').get(function(){
  return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
//export thought schema and model
module.exports = Thought;
