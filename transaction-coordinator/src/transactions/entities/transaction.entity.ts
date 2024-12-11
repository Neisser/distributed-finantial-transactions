import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { Currency } from '../enums/currency.enum';
import { TransactionStatus } from '../enums/transaction-status.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionId: string;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.INITIATED,  // Default status set to 'initiated'
  })
  status: TransactionStatus;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.USD,  // Set default currency (can be modified based on business requirements)
  })
  currency: Currency;

  @Column()
  source: string;

  @Column()
  target: string;

  @Column()
  createdAt: Date;
}
