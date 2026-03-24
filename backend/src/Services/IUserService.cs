using Centuri.Demo.Models;
namespace Centuri.Demo.Services;

public interface IUserService
{
    Task<IEnumerable<User>> GetAllAsync();
    Task<User?> GetByIdAsync(int id);
}
