namespace Centuri.Demo.Services;

public interface ISchedulerService
{
    Task ScheduleJobAsync(string jobName, DateTime scheduledAt);
    Task<IEnumerable<(string JobName, DateTime ScheduledAt)>> GetScheduledJobsAsync();
}
