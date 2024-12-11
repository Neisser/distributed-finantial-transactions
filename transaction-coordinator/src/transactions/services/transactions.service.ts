import { Injectable  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionStatus } from '../enums';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    return this.transactionRepository.create({...createTransactionDto, status: TransactionStatus.PENDING,});
  }

  findAll() {
    return `This action returns all transactions`;
  }

  async findOne(id: string) {
    return this.transactionRepository.findOne({
      where: { transactionId: id }
    })
  }

  async generateTransactionId() {
    return Date.now().toString();
  }

}
