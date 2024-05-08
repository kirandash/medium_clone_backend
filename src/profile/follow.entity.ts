import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'follow' })
export class FollowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  followerId: number;

  @Column()
  followingId: number;
}
