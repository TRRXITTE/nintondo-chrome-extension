function errorHandler(err, _req, res, _next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    code: err.code || 'internal_error',
    message: err.message || 'Internal Server Error',
    ...(err.details ? { details: err.details } : {}),
  });
}

module.exports = { errorHandler };
