import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, MinLength, MaxLength, IsOptional, IsDateString } from 'class-validator';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar', length: 256 })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  title: string;

  @Column({ type: 'varchar'})
  @IsString()
  @MinLength(6)
  content: string;


  @Column({ type: 'uuid' })
  @IsString()
  authorId: string;

  @CreateDateColumn({ type: 'timestamp' }) 
  @IsDateString()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' }) 
  @IsDateString()
  updatedAt: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  @IsDateString()
  @IsOptional()
  deletedAt?: string;
}
