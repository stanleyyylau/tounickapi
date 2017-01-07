/**
 * Created by Stanley on 1/7/17.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bossQuizSchama = new Schema({
  openId: String,
  name: String,
  score: Number
})

const BossQuiz = mongoose.model('bossQuiz', bossQuizSchama);

module.exports = BossQuiz;