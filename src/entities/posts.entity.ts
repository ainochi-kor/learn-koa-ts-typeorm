import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SharedPropEntity } from "./sharedProp.entity";
import { UserEntity } from "./users.entity";

@Entity({
  name: "posts",
})
export class PostEntity extends SharedPropEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  body: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
