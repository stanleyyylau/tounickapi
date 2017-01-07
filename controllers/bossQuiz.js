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
  const {openId, name, score} = req.body;

  if(!openId || !name || !score){
    return res.json({
      errcode: 1,
      errmsg: "必须提交openId, name 和score"
    })
  }

  if(typeof openId !== 'string'){
    return res.json({
      errcode: 1,
      errmsg: "提交的openId必须为字符串类型"
    })
  }

  if(typeof name !== 'string'){
    return res.json({
      errcode: 1,
      errmsg: "提交的name必须为字符串类型"
    })
  }

  if(typeof score !== 'number'){
    return res.json({
      errcode: 1,
      errmsg: "提交的分数必须为数字类型"
    })
  }

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
      console.log(err)
      res.json({
        errcode: 1,
        errmsg: "内部错误，请稍后再试"
      })

  })
};
