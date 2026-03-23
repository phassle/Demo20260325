using PortCom.Demo.Services;
using Xunit;

namespace PortCom.Demo.Tests;

public class CustomerServiceTests
{
    private readonly CustomerService _sut = new();

    [Fact]
    public async Task GetAllAsync_ReturnsNonDeletedCustomers()
    {
        var customers = await _sut.GetAllAsync();
        Assert.NotEmpty(customers);
        Assert.All(customers, c => Assert.False(c.IsDeleted));
    }

    [Fact]
    public async Task GetByIdAsync_ExistingId_ReturnsCustomer()
    {
        var customer = await _sut.GetByIdAsync(1);
        Assert.NotNull(customer);
        Assert.Equal(1, customer.Id);
    }

    [Fact]
    public async Task GetByIdAsync_NonExistingId_ReturnsNull()
    {
        var customer = await _sut.GetByIdAsync(9999);
        Assert.Null(customer);
    }

    [Fact]
    public async Task GetCountAsync_Returns50()
    {
        var count = await _sut.GetCountAsync();
        Assert.Equal(50, count);
    }

    // TODO: YT-1234 — Add tests for CSV export
    // See specs/YT-1234-customer-export.md for BDD scenarios:
    //   - Admin exports → 200 + CSV
    //   - Non-admin → 403
    //   - > 10,000 rows → truncated
    //   - Empty DB → header only
}
