import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    
    ConfigModule.forRoot(),

    
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), }),
      
    MongooseModule.forRoot('mongodb://portafolio-mongodb:27017/portafolio-db', {
        dbName: 'portafolio-db',
      }),

    PostsModule,
    
    AuthModule,
  
    ],

})
export class AppModule {}
