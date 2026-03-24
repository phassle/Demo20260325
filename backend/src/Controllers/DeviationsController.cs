using Microsoft.AspNetCore.Mvc;
using Centuri.Demo.Services;

namespace Centuri.Demo.Controllers;

[ApiController]
[Route("api/v2/[controller]")]
public class DeviationsController : ControllerBase
{
    private readonly IDeviationService _deviationService;

    public DeviationsController(IDeviationService deviationService)
    {
        _deviationService = deviationService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var deviations = await _deviationService.GetAllAsync();
        return Ok(deviations);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var deviation = await _deviationService.GetByIdAsync(id);
        if (deviation is null)
            return NotFound();
        return Ok(deviation);
    }
}
