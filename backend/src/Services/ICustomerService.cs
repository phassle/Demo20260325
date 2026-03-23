using PortCom.Demo.Models;

namespace PortCom.Demo.Services;

public interface ICustomerService
{
    Task<IEnumerable<Customer>> GetAllAsync();
    Task<Customer?> GetByIdAsync(int id);
    Task<int> GetCountAsync();
    Task<(IEnumerable<Customer> Customers, bool Truncated)> ExportAsync(int maxRows = 10_000);
}
