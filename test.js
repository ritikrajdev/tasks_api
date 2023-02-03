function middlewareGenerator(schema) {
  return function validateInput(req, res, next) {
    const {error} = schema.validate(req.body);
    if (!error) {
      next();
    } else {
      res.status(400).send({message: err.message});
    }
  };
}
