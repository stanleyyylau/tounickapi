/**
 * Created by Stanley on 1/7/17.
 */

const dbConnection = require('./config/dbConnection')()
const BossQuiz = require('./models/BossQuiz')


setTimeout(function () {
  var newRecord = new BossQuiz({
    openId: "fwrefwefaewf",
    name: "Stanley",
    score: 100
  })

  newRecord.save().then((item)=>{
    console.log(item)
    console.log('save to db, item')
  })
}, 3000)

BossQuiz.find({}).then((all)=>{
  console.log(all)
})