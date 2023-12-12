const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
     await User.find()
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
        .then(async (users) => {
          const usersObj = {
            users,
           
          };
          return res.json(usersObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // Get a single student
   async getSingleUser(req, res) {
     await User.findOne({ _id: req.params.userId.toString() })
      .select('-__v')
      .populate( 'thoughts')
      .populate('friends')
        .then(async (user) =>
          !user
          //return if no user found with that id
            ? res.status(404).json({ message: 'No user exists with that ID' })
            : res.json({user}))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    // create a new user - DONE
    createUser(req, res) {
      User.create(req.body)
        .then((user) => {
          res.json(user);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    },
    //update user
    updateUser(req,res){
        User.findOneAndUpdate(
          {_id: req.params.userId}, 
          req.body,
          {new:true, runValidators:true}
          )
        .then(async (user) =>
        !user
        //return if no user found with that id
          ? res.status(404).json({ message: 'User with this id does not exist' })
          : res.json({user}))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },
    // Delete a user
    deleteUser(req, res) {
      User.findOneAndRemove({ _id: req.params.userId })
        .then((user) => {
        if (!user) {
          return res.status404.json({message: "User with this id does not exist or has already been deleted"})
        }
        Thought.deleteMany({$in: user.thoughts});
        res.json({message: 'User has been deleted, as well as their thoughts and reactions.'})
    })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
   async addFriend (req, res) {
        await User.findOneAndUpdate({_id: req.params.userId}, {$push: {friends: req.params.friendId}}, {new: true})
        .then(user => {
            if (!user){
                return res.status(404).json({message: 'User does not exist'});
            }
            res.json(user);
           //figure out how to automatically add friend to other user as well - future development
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
   async removeFriend (req, res) {
        await User.findOneAndUpdate({_id: req.params.userId}, {$pull: {friends: req.params.friendId}}, {new: true})
        .then(user => {
            if (!user){
                return res.status(404).json({message: 'User does not exist'});
            }
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
}
