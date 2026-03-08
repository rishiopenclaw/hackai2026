export function errorHandler(err, req, res, next) {
  console.error(err);
  if (res.headersSent) return next(err);

  const status =
    err.status ||
    err.statusCode ||
    (err.name === 'ValidationError' ? 400 : null) ||
    (err.code === 11000 ? 409 : null) ||
    500;

  const message =
    err.code === 11000
      ? `Duplicate value for field: ${Object.keys(err.keyPattern || {}).join(', ') || 'unknown'}`
      : err.message || 'Internal server error';

  res.status(status).json({ error: message });
}
