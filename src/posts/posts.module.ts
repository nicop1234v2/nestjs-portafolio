import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Post, PostSchema } from './entities/post.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports:[
    ConfigModule,
    MongooseModule.forFeature([
      {
      name: Post.name,
      schema: PostSchema
    },
  ])
  ],
})
export class PostsModule {}
