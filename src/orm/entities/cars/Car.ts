import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Brand } from '../brands/Brand';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  model: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', nullable: true })
  year: number;

  @Column({ nullable: true })
  color: string;

  @Column({ name: 'brand_id' })
  brandId: number;

  @ManyToOne(() => Brand, (brand) => brand.cars, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}