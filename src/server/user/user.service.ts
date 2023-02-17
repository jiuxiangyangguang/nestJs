import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }
  async getAllUserTest(): Promise<UserEntity[]> {
    // 其实这里也可以使用BaseEntity里提供的Read方法，不过建议还是自己写SQL比较好
    return await this.userRepository.query('select * from user');
  }
  async findOne(_id: string): Promise<UserEntity[]> {
    return await this.userRepository.query(
      'SELECT * FROM `mytest`.`user` WHERE id ' + `IN (${_id})`,
    );
  }
  // 添加单个用户
  async addOne(body: Partial<UserEntity>): Promise<UserEntity> {
    const { name } = body;
    if (!name) throw new HttpException('缺少用户名称', 401);
    const isname = await this.userRepository.findOne({ where: { name } });
    if (isname) {
      throw new HttpException('用户名称已存在', 401);
    }
    return await this.userRepository.save(body);
  }
  // 修改用户信息
  async update(body: Partial<UserEntity>): Promise<UserEntity> {
    const { id, name } = body;
    if (!id) throw new HttpException('缺少用户id', 401);
    const isID = await this.userRepository.findOne({ where: { id } });
    if (!isID) {
      throw new HttpException('用户不存在', 401);
    }
    const isname = await this.userRepository.findOne({ where: { name } });
    if (isname) {
      throw new HttpException('用户名称已存在', 401);
    }
    const updatePost = this.userRepository.merge(isID, body);
    return this.userRepository.save(updatePost);
  }
  // 刪除
  async del(body: Partial<UserEntity>): Promise<UserEntity> {
    const { id } = body;
    const existPost = await this.userRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的用户不存在`, 401);
    }
    return await this.userRepository.remove(existPost);
  }
}
