function errorHandlingMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  switch (err.name) {
  case 'InvalidInputError': {
    return res.status(400).json({ message: err.message });
  }
  case 'NotFoundError': {
    return res.status(404).json({ message: err.message });
  }
  default: {
    return res.status(500).json({ message: 'something unexpected happened' });
  }
  }
}

module.exports = {
  errorHandlingMiddleware
};