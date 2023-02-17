import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('user') // 表的名称   不填则会自动在数据库新建一张表
export class UserEntity extends BaseEntity {
  // 自增主键
  @PrimaryGeneratedColumn()
  id: number;

  // 列
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'varchar', name: 'sex' })
  // 此处key可自定义，在项目中使用的key
  sex: string;

  @Column({ type: 'int', name: 'age' })
  // 此处key可自定义，在项目中使用的key
  age: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
