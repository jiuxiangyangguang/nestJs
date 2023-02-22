// use/entities/user.entity.ts
import { Exclude, Transform, Type } from 'class-transformer'
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { hashSync } from 'bcryptjs'
import moment from 'moment'

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  username: string // 用户名

  @Column({ length: 100 })
  nickname: string //昵称

  @Exclude()
  @Column({ select: false }) // 表示查询时隐藏此列
  password: string // 密码

  @Column()
  avatar: string //头像

  @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  role: string // 用户角色

  @CreateDateColumn({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date

  @UpdateDateColumn({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date

  @BeforeInsert()
  async encryptPwd() {
    this.password = await hashSync(this.password, 10)
  }
}
