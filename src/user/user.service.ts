import { User } from './entities/user.entity'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDto, DelUserDto, IsUserDto } from './dto/create-user.dto'
import { Repository } from 'typeorm'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 注册
  async sign(createUser: CreateUserDto) {
    const { username } = createUser
    const existUser = await this.userRepository.findOne({
      where: { username },
    })
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)
    }

    const newUser = await this.userRepository.create(createUser)

    // create方法相对于new User() 会执行密码加盐的方法encryptPwd
    await this.userRepository.save(newUser)
    return await this.userRepository.findOne({ where: { username } })
  }
  // 更新
  async update(update: UpdateUserDto) {
    const { username } = update

    const existUser = await this.isUser({ username })
    const updatePost = await this.userRepository.merge(existUser, update)
    console.log(updatePost)
    return (await this.userRepository.save(updatePost)).id
  }
  // 删除
  async del(del: DelUserDto) {
    const { username } = del

    const existUser = await this.isUser({ username })

    const updatePost = await this.userRepository.remove(existUser)
  }
  // 用户是否存在
  async isUser(isuser: IsUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { username: isuser.username },
    })
    if (!existUser) {
      throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST)
    }
    return existUser
  }
  async findOne(username: string) {
    return await this.userRepository.findOne({ where: { username } })
  }
}
