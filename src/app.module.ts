import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user/user.module';
import { AuthMiddleware } from '@app/user/middlewares/auth/auth.middleware';
import { ArticleModule } from '@app/article/article.module';
import { ProfileModule } from './profile/profile.module';
import ormConfig from './ormconfig';

@Module({
  imports: [
    TagModule,
    // .forRoot() method is used to configure the database connection
    // TODO: Move the database configuration to a separate file called ormconfig.ts in src. Currently it's not moved because I am unsure about the type
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    ArticleModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // The configure method is used to apply the AuthMiddleware to all routes in the application
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
