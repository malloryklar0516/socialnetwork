const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
    // Drop existing thoughts
    await Thought.deleteMany({});

    // Drop existing users
    await User.deleteMany({});

await User.collection.insertMany([{
  username: 'testuser111',
  email: 'testuser111@gmail.com'
},
{username: 'testuser222',
email: 'testuser222@gmail.com'
}]);

await Thought.collection.insertOne({
  thoughtText: 'test text',
  username: 'testuser111', 
  userId: '66578d6e777b828a24b61a253'
});
console.info('Seeding complete!');
process.exit(0);
});