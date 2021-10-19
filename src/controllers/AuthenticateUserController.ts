import { AuthenticateUserService } from '../services/AuthenticateUserService';
import { Request, Response } from 'express';

class AuthenticateUserController {
  async handle(req:Request, res:Response) {
    const { code } = req.body
    const service = new AuthenticateUserService
    const result = await service.execute(code)

    return res.json(result)
  }
}


export { AuthenticateUserController }

