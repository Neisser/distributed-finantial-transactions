import { IsString, IsNumber, IsEnum } from 'class-validator';

import { Currency } from '../enums/currency.enum';
import { Banks } from '../enums/banks.enum';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsEnum(Currency)
  currency: Currency;

  @IsEnum(Banks)
  source: Banks;

  @IsEnum(Banks)
  target: Banks;
}