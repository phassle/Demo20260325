using Centuri.Demo.Services;
using Xunit;

namespace Centuri.Demo.Tests;

public class DocumentServiceTests
{
    private readonly DocumentService _sut = new();

    [Fact]
    public async Task GetAllAsync_ReturnsDocuments()
    {
        var docs = await _sut.GetAllAsync();
        Assert.NotEmpty(docs);
    }

    [Fact]
    public async Task GetByIdAsync_ExistingId_ReturnsDocument()
    {
        var doc = await _sut.GetByIdAsync(1);
        Assert.NotNull(doc);
        Assert.Equal(1, doc.Id);
    }

    [Fact]
    public async Task GetByIdAsync_NonExistingId_ReturnsNull()
    {
        var doc = await _sut.GetByIdAsync(9999);
        Assert.Null(doc);
    }

    [Fact]
    public async Task GetCountAsync_ReturnsExpectedCount()
    {
        var count = await _sut.GetCountAsync();
        Assert.True(count > 0);
    }

    // TODO: GH-2 — Add tests for CSV export
    // See specs/GH-2-document-export-csv.md for BDD scenarios:
    //   - Admin exports -> 200 + CSV
    //   - Non-admin -> 403
    //   - > 10,000 rows -> truncated
    //   - Empty DB -> header only
}
