using Microsoft.Extensions.Logging;
namespace Centuri.Demo.Services;

public class FakeSchedulerService : ISchedulerService
{
    private readonly List<(string JobName, DateTime ScheduledAt)> _jobs = new();
    private readonly ILogger<FakeSchedulerService> _logger;

    public FakeSchedulerService(ILogger<FakeSchedulerService> logger) => _logger = logger;

    public Task ScheduleJobAsync(string jobName, DateTime scheduledAt)
    {
        _logger.LogInformation("Scheduling job: {JobName} at {ScheduledAt}", jobName, scheduledAt);
        _jobs.Add((jobName, scheduledAt));
        return Task.CompletedTask;
    }

    public Task<IEnumerable<(string JobName, DateTime ScheduledAt)>> GetScheduledJobsAsync()
    {
        _logger.LogInformation("Retrieving {Count} scheduled jobs", _jobs.Count);
        return Task.FromResult<IEnumerable<(string JobName, DateTime ScheduledAt)>>(_jobs.AsReadOnly());
    }
}
