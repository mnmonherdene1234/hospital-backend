export class UserTimeDto {
  image: string;
  name: string;
  phone: string;
  start_time: Date;
  end_time: Date;
}

export class WeeklyTimesDto {
  date: Date;
  day: number;
  times: UserTimeDto[];
}
