using Microsoft.AspNetCore.Mvc;
using Centuri.Demo.Services;

namespace Centuri.Demo.Controllers;

/// <summary>
/// Controlled document endpoints.
/// The workshop task (GH-2) is to ADD a CSV export endpoint here.
/// </summary>
[ApiController]
[Route("api/v2/[controller]")]
public class DocumentsController : ControllerBase
{
    private readonly IDocumentService _documentService;

    public DocumentsController(IDocumentService documentService)
    {
        _documentService = documentService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var documents = await _documentService.GetAllAsync();
        return Ok(documents);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var document = await _documentService.GetByIdAsync(id);
        if (document is null)
            return NotFound();
        return Ok(document);
    }

    [HttpGet("export")]
    public async Task<IActionResult> Export()
    {
        var role = HttpContext.Items["UserRole"] as string;
        if (role != "admin")
            return Forbid();

        var (documents, truncated) = await _documentService.ExportAsync();

        var csv = new System.Text.StringBuilder();
        csv.AppendLine("Id,Title,Category,Version,Status,CreatedBy,CreatedAt,UpdatedAt");
        foreach (var d in documents)
            csv.AppendLine($"{d.Id},{Escape(d.Title)},{Escape(d.Category)},{d.Version},{d.Status},{Escape(d.CreatedBy)},{d.CreatedAt:O},{d.UpdatedAt:O}");

        Response.Headers["X-Truncated"] = truncated.ToString().ToLower();
        return Content(csv.ToString(), "text/csv");
    }

    private static string Escape(string value)
        => value.Contains(',') || value.Contains('"') || value.Contains('\n')
            ? $"\"{value.Replace("\"", "\"\"")}\""
            : value;
}
