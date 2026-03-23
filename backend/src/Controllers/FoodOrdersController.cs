using Microsoft.AspNetCore.Mvc;
using PortCom.Demo.Services;

namespace PortCom.Demo.Controllers;

[ApiController]
[Route("api/v2/[controller]")]
public class FoodOrdersController : ControllerBase
{
    private readonly IFoodOrderService _service;

    public FoodOrdersController(IFoodOrderService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var orders = await _service.GetAllAsync();
        return Ok(orders);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var order = await _service.GetByIdAsync(id);
        if (order is null)
            return NotFound();
        return Ok(order);
    }
}
