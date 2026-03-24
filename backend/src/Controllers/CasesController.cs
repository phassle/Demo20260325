using Microsoft.AspNetCore.Mvc;
using Centuri.Demo.Services;

namespace Centuri.Demo.Controllers;

[ApiController]
[Route("api/v2/[controller]")]
public class CasesController : ControllerBase
{
    private readonly ICaseService _caseService;

    public CasesController(ICaseService caseService)
    {
        _caseService = caseService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var cases = await _caseService.GetAllAsync();
        return Ok(cases);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var caseItem = await _caseService.GetByIdAsync(id);
        if (caseItem is null)
            return NotFound();
        return Ok(caseItem);
    }
}
