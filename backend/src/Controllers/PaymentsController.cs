using Microsoft.AspNetCore.Mvc;
using PortCom.Demo.Services;

namespace PortCom.Demo.Controllers;

[ApiController]
[Route("api/v2/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _service;

    public PaymentsController(IPaymentService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var payments = await _service.GetAllAsync();
        return Ok(payments);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var payment = await _service.GetByIdAsync(id);
        if (payment is null)
            return NotFound();
        return Ok(payment);
    }
}
