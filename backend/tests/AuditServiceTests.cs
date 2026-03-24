using Centuri.Demo.Services;
using Xunit;

namespace Centuri.Demo.Tests;

public class AuditServiceTests
{
    private readonly AuditService _sut = new();

    [Fact]
    public async Task GetAllAsync_ReturnsAudits()
    {
        var audits = await _sut.GetAllAsync();
        Assert.NotEmpty(audits);
    }

    [Fact]
    public async Task GetByIdAsync_ExistingId_ReturnsAudit()
    {
        var audit = await _sut.GetByIdAsync(1);
        Assert.NotNull(audit);
        Assert.Equal(1, audit.Id);
    }

    [Fact]
    public async Task GetByIdAsync_NonExistingId_ReturnsNull()
    {
        var audit = await _sut.GetByIdAsync(9999);
        Assert.Null(audit);
    }
}
