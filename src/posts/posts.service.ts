import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Post } from './entities/post.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginatioDto } from './dto/pagination-dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const post = await this.postModel.create(createPostDto);
      return post;
    } catch (error) {
      this.handleExceptions(error);
    }

    return 'This action add post';
  }

   async findAll(paginatioDto: PaginatioDto) {
    const { limit = 4, offset = 0 } = paginatioDto;

    return await this.postModel.find()
    .limit( limit )
    .skip( offset )
    .select('-__v')
  }

  async findOne(term: string) {
    let post: Post;

    //MongoID
    if (!post && isValidObjectId(term)) {
      post = await this.postModel.findById(term);
    }


    if (!post) {
      throw new NotFoundException(
        `Pokemon with id "${term}" not found`,
      );
    }
    return post;

  }

  async update(id: string, updatePostDto: UpdatePostDto) {

    const post = await this.findOne( id );

    console.log(post)

    try {
      await post.updateOne( updatePostDto );
      return { ...post.toJSON(), ...updatePostDto};

    } catch (error) {
      this.handleExceptions( error )
    }
  }

  async remove(id: string) {
    const result = await this.postModel.deleteOne({ _id: id })
    if ( result.deletedCount === 0 )
      throw new BadRequestException(`Pokemon with id "${ id } not found"`);
    return
  }

  private handleExceptions(error: any) {
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Post - Check server logs`,
    );
  }
}
