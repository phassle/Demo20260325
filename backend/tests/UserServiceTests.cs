using Centuri.Demo.Services;
using Xunit;

namespace Centuri.Demo.Tests;

public class UserServiceTests
{
    private readonly UserService _sut = new();

    [Fact]
    public async Task GetAllAsync_ReturnsUsers()
    {
        var users = await _sut.GetAllAsync();
        Assert.NotEmpty(users);
    }

    [Fact]
    public async Task GetByIdAsync_ExistingId_ReturnsUser()
    {
        var user = await _sut.GetByIdAsync(1);
        Assert.NotNull(user);
        Assert.Equal(1, user.Id);
    }

    [Fact]
    public async Task GetByIdAsync_NonExistingId_ReturnsNull()
    {
        var user = await _sut.GetByIdAsync(9999);
        Assert.Null(user);
    }
}
