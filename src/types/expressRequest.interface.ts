import { Request } from 'express';
import { Users } from '@app/user/user.entity';

export interface ExpressRequest extends Request {
  user?: Users;
}
