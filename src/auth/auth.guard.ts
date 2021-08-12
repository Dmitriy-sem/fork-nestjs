import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const jwt = req.cookies['jwt']
            if (!jwt) {
                throw new UnauthorizedException('Auth to interact with forks')
            }
            //В идеале получать юзера так, но у меня почему-то падает на сроке с verify, поэтому я отправляю id usera in cookies
            const user = this.jwtService.verify(jwt, {
                secret: process.env.SECRET_KEY,
            })
            req.user = userт
            return true
        } catch (error) {
            console.log(error)

            throw new UnauthorizedException('Auth to interact with forks')
        }
    }
}
