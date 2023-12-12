const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  newReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);
// push created thought id to the associated user's thoughts array field.

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

  router.route('/:thoughtId/reactions').post(newReaction);

  router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
module.exports = router;
