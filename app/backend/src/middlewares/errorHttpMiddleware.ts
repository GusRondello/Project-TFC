import { ErrorRequestHandler } from 'express';

const httpError:ErrorRequestHandler = (err, _req, res, next) => {
  const { name, message } = err;
  console.log(`name: ${name}`);
  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'UnauthorizedError':
      res.status(401).json({ message });
      break;
    default:
      console.error(err);
      res.sendStatus(500);
  }
  next();
};

export default httpError;
