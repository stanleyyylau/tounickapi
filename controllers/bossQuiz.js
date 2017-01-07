/**
 * Created by Stanley on 1/7/17.
 */

const BossQuiz = require('./../models/BossQuiz');

exports.getScoreByOpenId = (req, res) => {
  const {openId} = req.params;
  BossQuiz.findOne({openId:openId})
    .then((item)=>{
      res.json({
        errcode: 0,
        openId: item.openId,
        name: item.name,
        score: item.score
      })
    })
    .catch((err)=>{
      res.json({
        errcode: 1,
        errmsg: "操作异常，请重试"
      })
  })
};

exports.updateScoreByOpenId = (req, res) => {
  console.log('want to update?...')
  const {openId, name, score} = req.body;
  BossQuiz.findOneAndUpdate({openId:openId}, {openId: openId, name: name, score: score})
    .then((item)=>{
      if(item){
        return BossQuiz.findOne({openId: item.openId})
      }else {
        let newRecord = new BossQuiz({
          openId: openId,
          name: name,
          score: score
        })

        return newRecord.save()
      }
    })
    .then((item) => {
      res.json({
        errcode: 0,
        openId: item.openId,
        name: item.name,
        score: item.score
      })
    })
    .catch((err)=>{
      res.json({
        errcode: 1,
        errmsg: "内部错误，请稍后再试"
      })

  })
};
