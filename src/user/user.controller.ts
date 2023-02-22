import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, DelUserDto } from './dto/create-user.dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { User } from './entities/user.entity'
import { UpdateUserDto } from './dto/update-user.dto'
import { Roles } from 'src/auth/roles.decorator'
import { RolesGuard } from 'src/auth/role.guard'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign')
  @UseInterceptors(ClassSerializerInterceptor) // 过滤调实例中密码(@Exclude装饰)
  @ApiOperation({ summary: '注册用户' })
  // @ApiResponse({ status: 201, type: [User] })
  @Roles('root')
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.sign(createUserDto)
  }

  @UseInterceptors(ClassSerializerInterceptor) // 过滤调实例中密码(@Exclude装饰)
  @ApiOperation({ summary: '更新数据' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('root', 'admin')
  @Post('update')
  update(@Body() update: UpdateUserDto) {
    return this.userService.update(update)
  }

  @Post('del')
  @UseInterceptors(ClassSerializerInterceptor) // 过滤调实例中密码(@Exclude装饰)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('root')
  @ApiOperation({ summary: '删除用户' })
  del(@Body() del: DelUserDto) {
    return this.userService.del(del)
  }
}
