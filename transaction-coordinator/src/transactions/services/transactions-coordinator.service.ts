import { Injectable, Logger  } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

import { TransactionsService } from './transactions.service';
import { Transaction } from '../entities/transaction.entity';
import { TransactionStatus, Banks, Currency, Topics, BankResponseStatus } from '../enums';

@Injectable()
export class TransactionsCoordinatorService {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly logger = new Logger(TransactionsCoordinatorService.name);
  
  constructor(
    private readonly TransactionsService: TransactionsService,
  ) {
    this.kafka = new Kafka({ brokers: ['localhost:9092'] });
    
    this.producer = this.kafka.producer()
    
    this.producer.connect()
  }

  async processTransaction(payload : { transactionId: string; amount: number, source: Banks, target: Banks, currency: Currency }): Promise<[Error, {data: Transaction, message: string}]> {
    try {
      const sender = {
      
      }
  
      const receiver = {
        
      }
  
      const transaction = await this.TransactionsService.create(payload);
  
  
      // Initiate the "Prepare" phase
      await this.producer.send({
        topic: Topics.PREPARE,
        messages: [{
          key: transaction.transactionId,
          value: JSON.stringify(transaction)
        }]
      })
  
      this.logger.log(`Prepare phase initiated for transaction: ${transaction.transactionId}`);
  
      return [null, {data: transaction, message: `Processing transaction ${transaction.transactionId}.`}];
    } catch (error) {
      return [error, null]
    }
  }

  async handleBankReponse(bankResponse: any){
    const transaction = await this.TransactionsService.findOne(bankResponse.transactionId)

    if(!transaction) this.logger.error(`Transaction not found.`);

    if(bankResponse.status === BankResponseStatus.YES) {
      transaction.status = TransactionStatus.COMMITTED;

      // Notify all banks to commit
      await this.producer.send({
        topic: Topics.COMMIT,
        messages: [{
          key: transaction.transactionId,
          value: JSON.stringify(transaction),
        }]
      })

      this.logger.log(`Transaction ${transaction.transactionId} committed`);
    } else {
      transaction.status = TransactionStatus.ABORTED;

      // Notify all banks to abort
      await this.producer.send({
        topic: Topics.ABORT,
        messages: [{
          key: transaction.transactionId,
          value: JSON.stringify(transaction),
        }]
      })

      this.logger.warn(`Transaction ${transaction.transactionId} aborted`);
    }
  }
}
