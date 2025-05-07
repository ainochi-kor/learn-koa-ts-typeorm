import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { SharedPropEntity } from "./sharedProp.entity";
import { PostEntity } from "./posts.entity";

export type UserType = "admin" | "user";

@Entity({
  name: "users",
})
export class UserEntity extends SharedPropEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name", nullable: false })
  firstName: string;

  @Column({ name: "last_name", nullable: false })
  lastName: string;

  @Column({ name: "birth_of_date", nullable: true, type: "date" })
  birthOfDate: Date;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ default: "user" })
  type: UserType;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @OneToMany(() => PostEntity, (post) => post.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  posts: PostEntity[];
  

  accessToken?: string;
}
