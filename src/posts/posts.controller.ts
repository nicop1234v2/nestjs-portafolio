import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginatioDto } from './dto/pagination-dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { User } from 'src/auth/entities/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Auth(ValidRoles.superUser)
  create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginatioDto) {
    return this.postsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.postsService.findOne(term);
  }

  @Patch(':id')
  @Auth(ValidRoles.superUser)
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.superUser)
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.postsService.remove(id);
  }
}
