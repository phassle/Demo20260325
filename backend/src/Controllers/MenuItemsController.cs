using Microsoft.AspNetCore.Mvc;
using PortCom.Demo.Services;

namespace PortCom.Demo.Controllers;

[ApiController]
[Route("api/v2/[controller]")]
public class MenuItemsController : ControllerBase
{
    private readonly IMenuItemService _service;

    public MenuItemsController(IMenuItemService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _service.GetAllAsync();
        return Ok(items);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _service.GetByIdAsync(id);
        if (item is null)
            return NotFound();
        return Ok(item);
    }
}
