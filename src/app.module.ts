import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      entities: [],
      // 🚨 Don't use this in PROD!!!
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
