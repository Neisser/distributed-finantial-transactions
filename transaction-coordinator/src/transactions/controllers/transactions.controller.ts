import { Controller, Get, Post, Body, Param, HttpStatus, HttpException } from '@nestjs/common';

import { TransactionsService } from '../services/transactions.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionsCoordinatorService } from '../services/transactions-coordinator.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService, 
    private readonly transactionsCoordinatorService: TransactionsCoordinatorService
  ) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    try {

      const { amount, source, target, currency } = createTransactionDto;

      const transactionId = await this.transactionsService.generateTransactionId()

      const [error, results] = await this.transactionsCoordinatorService.processTransaction({
        transactionId,
        amount,
        source,
        target,
        currency,
      });

      if(!error) throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR); 

      return {
        status: HttpStatus.CREATED,
        message: results.message,
        data: results.data,
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }
}
