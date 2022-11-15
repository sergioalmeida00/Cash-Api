import dotenv from 'dotenv';
import { AppError } from '@shared/erros/AppError';
import express from 'express';
import { router } from './routes';


dotenv.config();
const app = express();


app.use(express.json());
app.use(router);


app.use(
    (err: Error, request: express.Request, response: express.Response, _next: express.NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          message: err.message
        });
      }
  
      return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message} `,
      });
    }
  );

app.listen(3131, ()=> console.log('Server is Running.'));