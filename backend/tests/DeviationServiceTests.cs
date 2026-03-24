using Centuri.Demo.Services;
using Centuri.Demo.Models;
using Xunit;

namespace Centuri.Demo.Tests;

public class DeviationServiceTests
{
    private readonly DeviationService _sut = new();

    [Fact]
    public async Task GetAllAsync_ReturnsNonClosedDeviations()
    {
        var deviations = await _sut.GetAllAsync();
        Assert.NotEmpty(deviations);
        Assert.All(deviations, d => Assert.NotEqual(DeviationStatus.Closed, d.Status));
    }

    [Fact]
    public async Task GetByIdAsync_ExistingId_ReturnsDeviation()
    {
        var dev = await _sut.GetByIdAsync(1);
        Assert.NotNull(dev);
        Assert.Equal(1, dev.Id);
    }

    [Fact]
    public async Task GetByIdAsync_NonExistingId_ReturnsNull()
    {
        var dev = await _sut.GetByIdAsync(9999);
        Assert.Null(dev);
    }
}
