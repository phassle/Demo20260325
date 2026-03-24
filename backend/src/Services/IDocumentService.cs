using Centuri.Demo.Models;
namespace Centuri.Demo.Services;

public interface IDocumentService
{
    Task<IEnumerable<Document>> GetAllAsync();
    Task<Document?> GetByIdAsync(int id);
    Task<int> GetCountAsync();
    Task<(IEnumerable<Document> Documents, bool Truncated)> ExportAsync(int maxRows = 10_000);
}
