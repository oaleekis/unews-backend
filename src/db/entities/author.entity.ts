import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';

@Entity('authors')
export class AuthorEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar', length: 256 })
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  @IsEmail()
  @MinLength(5)
  @MaxLength(256)
  email: string;

  @Column({ type: 'varchar', length: 256 })
  @IsString()
  @MinLength(6)
  password: string;

  @CreateDateColumn({ type: 'timestamp' }) 
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' }) 
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  @IsOptional()
  deletedAt?: string;
}
