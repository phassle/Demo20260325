using System.Collections.Concurrent;
using Microsoft.Extensions.Logging;
namespace Centuri.Demo.Services;

public class FakeCacheService : ICacheService
{
    private readonly ConcurrentDictionary<string, object> _cache = new();
    private readonly ILogger<FakeCacheService> _logger;

    public FakeCacheService(ILogger<FakeCacheService> logger) => _logger = logger;

    public Task<T?> GetAsync<T>(string key) where T : class
    {
        if (_cache.TryGetValue(key, out var value))
        {
            _logger.LogInformation("Cache HIT for key: {Key}", key);
            return Task.FromResult(value as T);
        }

        _logger.LogInformation("Cache MISS for key: {Key}", key);
        return Task.FromResult<T?>(null);
    }

    public Task SetAsync<T>(string key, T value, TimeSpan? expiry = null) where T : class
    {
        _logger.LogInformation("Cache SET for key: {Key}, expiry: {Expiry}", key, expiry?.ToString() ?? "none");
        _cache[key] = value;
        return Task.CompletedTask;
    }

    public Task RemoveAsync(string key)
    {
        _logger.LogInformation("Cache REMOVE for key: {Key}", key);
        _cache.TryRemove(key, out _);
        return Task.CompletedTask;
    }
}
