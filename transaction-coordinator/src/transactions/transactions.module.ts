import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './controllers/transactions.controller';
import { Transaction } from './entities/transaction.entity';
import { TransactionsCoordinatorService } from './services/transactions-coordinator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsCoordinatorService],
  exports: [TransactionsService, TransactionsCoordinatorService]
})
export class TransactionsModule {}
