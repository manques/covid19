module.exports = (req, res, next) => {
  console.log('---------headers---------------');
  console.log(req.headers);
  console.log('-----------body-----------------');
  console.log(req.body);
  console.log('--------------file--------------');
  console.log(req.file);
  next();
}
