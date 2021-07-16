const router = require('express').Router();
const State = require('../model/State');

const device_map = {
  97: 'A',
  98: 'B',
  99: 'C',
};

async function getData(userDate) {
  const queryDate = userDate;
  const mydata = await State.find({ date: queryDate });
  console.log(mydata);
  return mydata;
}

async function getAllData() {
  // const queryDate = userDate;
  const mydata = await State.find();
  console.log(mydata);
  return mydata;
}

router.get('/logs', async (req, res) => {
  // let userDate = req.query.date;
  // console.log(userDate);
  const mydata = await getAllData();
  // console.log(mydata);
  return res.json(mydata);
});

router.get('/', async (req, res) => {
  let userDate = req.query.date;
  console.log(userDate);
  const mydata = await getData(userDate);
  // console.log(mydata);
  return res.json(mydata);
});

router.post('/', async (req, res) => {
  if (req.body.STATE == 1) {
    const device = device_map[req.body.DEVICEID];
    const devState = new State({
      id: req.body.REQUESTNO,
      devid: device,
      ontime: req.body.TIME,
      date: req.body.DATE,
      day: req.body.DAY,
    });
    console.log(devState);
    try {
      const savedState = await devState.save();
      console.log('[On Time Success]');
      console.log(savedState);
      return res.send('Success');
    } catch (err) {
      return res.status(400).send(err);
    }
  } else {
    let randId = Math.floor(Math.random() * 100000);
    console.log(randId, typeof randId);
    State.updateOne(
      { id: req.body.REQUESTNO },
      { $set: { id: randId, offtime: req.body.TIME } },
      err => {
        if (err) return res.status(400).send(err);
        console.log('[Off Time Success]');
        return res.send('Success');
      }
    );
  }
});

module.exports = router;
