import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException();
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;
      if (payload.role !== 1) {
        throw new UnauthorizedException();
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
  private extractTokenFromHeader(request: Request): string {
    const authorizationHeader =
      request.headers['authorization'] || request.headers['Authorized'];
    if (authorizationHeader) {
      const [type, token] = authorizationHeader.split(' ');
      if (type === 'Bearer') {
        return token;
      }
    }
    throw new UnauthorizedException();
  }
}
