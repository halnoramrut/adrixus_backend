const dummyData = require('../model/dummyData');

exports.getDummyUser = async (req, res) => {
    try {
        const pageNo = parseInt(req.query.pageNo);
        const size = parseInt(req.query.size);

        let skip = size * (pageNo - 1)
        let limit = size;

        dummyData.count({}, async(error, numOfDocs) => {
          const data = await dummyData.find().skip(parseInt(skip)).limit(parseInt(limit));
          return res.status(201).json({ status:true, data : data, total : numOfDocs, message:'Dummy Data!' });
       });
      } catch (err) {
        console.log(err);
        res.status(400).send({ status:false, err :err});
      }
}

exports.search = async (req, res) => {
  try {
    const text = req.query.text;

    const data = await dummyData.find({
      firstname : text
    }) 

    return res.status(201).json({ status: true, data: data, message: 'Search Data!' });
  } catch (err) {
    console.log(err);
    res.status(400).send({ status: false, err: err });
  }
}