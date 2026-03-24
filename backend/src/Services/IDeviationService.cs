using Centuri.Demo.Models;
namespace Centuri.Demo.Services;

public interface IDeviationService
{
    Task<IEnumerable<Deviation>> GetAllAsync();
    Task<Deviation?> GetByIdAsync(int id);
}
