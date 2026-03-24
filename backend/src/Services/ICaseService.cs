using Centuri.Demo.Models;
namespace Centuri.Demo.Services;

public interface ICaseService
{
    Task<IEnumerable<CaseItem>> GetAllAsync();
    Task<CaseItem?> GetByIdAsync(int id);
}
