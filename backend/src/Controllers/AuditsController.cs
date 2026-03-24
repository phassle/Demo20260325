using Microsoft.AspNetCore.Mvc;
using Centuri.Demo.Services;

namespace Centuri.Demo.Controllers;

[ApiController]
[Route("api/v2/[controller]")]
public class AuditsController : ControllerBase
{
    private readonly IAuditService _auditService;

    public AuditsController(IAuditService auditService)
    {
        _auditService = auditService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var audits = await _auditService.GetAllAsync();
        return Ok(audits);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var audit = await _auditService.GetByIdAsync(id);
        if (audit is null)
            return NotFound();
        return Ok(audit);
    }
}
