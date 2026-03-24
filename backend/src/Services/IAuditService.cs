using Centuri.Demo.Models;
namespace Centuri.Demo.Services;

public interface IAuditService
{
    Task<IEnumerable<Audit>> GetAllAsync();
    Task<Audit?> GetByIdAsync(int id);
}
