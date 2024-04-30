import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequest } from '@app/types/expressRequest.interface';
import { verify } from 'jsonwebtoken';
import { UserService } from '../../user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    // if there is no authorization header, set the user to null and continue
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    // if there is an authorization header, extract the token from it
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = verify(token, 'kiranstopsecret');
      const user = await this.userService.findUserById(decoded.id);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
      return;
    }
  }
}
