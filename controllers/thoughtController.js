const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');
module.exports = {
    // get all thoughts 
    getThoughts(req, res) {
        Thought.find().sort({createdAt: -1})
          .then(async (thoughts) => {
            const thoughtData = {
              thoughts,
            };
            return res.json(thoughtData);
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
      // Get a single thought
      getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then( (thought) =>
            !thought
            //return if no thought found with that id
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json({thought}))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
      // create a new thought - DONE
      async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
    
          const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'Thought created, but no user with this id exists! Create new user' });
          }
    
          res.json({ message: 'Thought created!' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
          //update thought
    updateThought(req,res){
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, req.body, {new:true, runValidators:true})
        .then(async (thought) =>
        !thought
        //return if no thought found with that id
          ? res.status(404).json({ message: 'thought does not exist' })
          : res.json({thought}))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },
    // Delete a thought
    deleteThought(req, res) {
      Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>{
        if (!thought) {
          return res.status(404).json({message: "Thought doesn't exist"})
        }

        const userData = User.findOneAndUpdate(
          {thoughts: req.params.thoughtId}, {$pull: {thoughts: req.params.thoughtId}}, {new: true}
        );
        if (!userData) {
          return res.status(404).json({message: "Thought deleted but no user exists with this id"});
        }
        res.json({message: 'This thought has been deleted.'});
      }
          // !thought
          //   ? res.status(404).json({ message: 'thought does not exist' })
          //   : const dbuser 
          //   res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });},

// add reaction to thought
newReaction(req, res) {
    console.log('You are adding a new reaction!');
    console.log(req.body);
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: {reactions: req.body}},
        {runValidators: true, new: true}
    )
    .then((thought)=> 
    !thought 
    ? res
    .status(404).json({message: 'No thought exists with this ID'})
    : res.json(thought)
    )
    .catch((err)=> res.status(500).json(err));
},
async deleteReaction(req,res) {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!thoughtData) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }

    res.json(thoughtData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},
};