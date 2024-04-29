import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [
    TagModule,
    // .forRoot() method is used to configure the database connection
    // TODO: Move the database configuration to a separate file called ormconfig.ts in src. Currently it's not moved because I am unsure about the type
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'mediumclone',
      password: 'mediumclone',
      database: 'mediumclone',
      // .ts files for src folder and .js files for dist folder
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
