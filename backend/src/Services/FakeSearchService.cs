using Microsoft.Extensions.Logging;
namespace Centuri.Demo.Services;

public class FakeSearchService : ISearchService
{
    private readonly ILogger<FakeSearchService> _logger;
    public FakeSearchService(ILogger<FakeSearchService> logger) => _logger = logger;

    public Task<IEnumerable<T>> SearchAsync<T>(IEnumerable<T> source, Func<T, string> textSelector, string query)
    {
        _logger.LogInformation("Elasticsearch query: {Query}", query);
        var results = source.Where(item => textSelector(item).Contains(query, StringComparison.OrdinalIgnoreCase));
        return Task.FromResult(results);
    }
}
