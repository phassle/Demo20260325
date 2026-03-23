using PortCom.Demo.Models;

namespace PortCom.Demo.Services;

/// <summary>
/// Demo implementation with in-memory data.
/// In the real project this would use Entity Framework / SQL Server.
/// </summary>
public class CustomerService : ICustomerService
{
    private static readonly List<Customer> _customers = Enumerable
        .Range(1, 50)
        .Select(i => new Customer
        {
            Id = i,
            Name = $"Customer {i}",
            Email = $"customer{i}@example.com",
            OrganizationNumber = $"5566{i:D6}",
            CreatedAt = DateTime.UtcNow.AddDays(-i),
            IsDeleted = false
        })
        .ToList();

    public Task<IEnumerable<Customer>> GetAllAsync()
        => Task.FromResult<IEnumerable<Customer>>(
            _customers.Where(c => !c.IsDeleted).ToList());

    public Task<Customer?> GetByIdAsync(int id)
        => Task.FromResult(_customers.FirstOrDefault(c => c.Id == id));

    public Task<int> GetCountAsync()
        => Task.FromResult(_customers.Count(c => !c.IsDeleted));

    public Task<(IEnumerable<Customer> Customers, bool Truncated)> ExportAsync(int maxRows = 10_000)
    {
        var active = _customers.Where(c => !c.IsDeleted).ToList();
        var truncated = active.Count > maxRows;
        var result = truncated ? active.Take(maxRows) : active;
        return Task.FromResult<(IEnumerable<Customer>, bool)>((result, truncated));
    }
}
