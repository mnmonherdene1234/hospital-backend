import { IsDateString } from 'class-validator';

export class FindAvailableDoctorsDto {
  @IsDateString()
  start_time: Date;

  @IsDateString()
  end_time: Date;
}
