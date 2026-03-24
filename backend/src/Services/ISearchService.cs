namespace Centuri.Demo.Services;

public interface ISearchService
{
    Task<IEnumerable<T>> SearchAsync<T>(IEnumerable<T> source, Func<T, string> textSelector, string query);
}
