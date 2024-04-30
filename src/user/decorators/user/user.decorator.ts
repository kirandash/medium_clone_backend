import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Custom Param Decorator
export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  // ctx is an ExecutionContext object that contains the request object
  const request = ctx.switchToHttp().getRequest();

  // if there is no user object on the request object, return null
  if (!request.user) {
    return null;
  }

  // if data is provided, return the user data from the user object
  if (data) {
    return request.user[data];
  }

  return request.user;
});
