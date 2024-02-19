export enum SchedulerType {
  FIVE_SECONDS = '*/5 * * * * *',
  HALF_MINUTE = '*/30 * * * * *',
  ONE_MINUTE = '* * * * *',
}

export enum CronJobStatus {
  RUNNING = 'RUNNING',
  IDLE = 'IDLE',
}
