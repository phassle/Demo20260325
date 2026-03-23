using Microsoft.AspNetCore.Mvc;
using PortCom.Demo.Services;

namespace PortCom.Demo.Controllers;

/// <summary>
/// Existing customer endpoints.
/// The workshop task (YT-1234) is to ADD a CSV export endpoint here.
/// </summary>
[ApiController]
[Route("api/v2/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomersController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var customers = await _customerService.GetAllAsync();
        return Ok(customers);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var customer = await _customerService.GetByIdAsync(id);
        if (customer is null)
            return NotFound();
        return Ok(customer);
    }

    [HttpGet("export")]
    public async Task<IActionResult> Export()
    {
        var role = HttpContext.Items["UserRole"] as string;
        if (role != "admin")
            return Forbid();

        var (customers, truncated) = await _customerService.ExportAsync();

        var csv = new System.Text.StringBuilder();
        csv.AppendLine("Id,Name,Email,OrganizationNumber,CreatedAt");
        foreach (var c in customers)
            csv.AppendLine($"{c.Id},{Escape(c.Name)},{Escape(c.Email)},{Escape(c.OrganizationNumber)},{c.CreatedAt:O}");

        Response.Headers["X-Truncated"] = truncated.ToString().ToLower();
        return Content(csv.ToString(), "text/csv");
    }

    private static string Escape(string value)
        => value.Contains(',') || value.Contains('"') || value.Contains('\n')
            ? $"\"{value.Replace("\"", "\"\"")}\""
            : value;
}
