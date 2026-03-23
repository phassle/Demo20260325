using PortCom.Demo.Models;

namespace PortCom.Demo.Services;

public interface IMenuItemService
{
    Task<IEnumerable<MenuItem>> GetAllAsync();
    Task<MenuItem?> GetByIdAsync(int id);
}
