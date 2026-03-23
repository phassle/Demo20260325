using Microsoft.AspNetCore.Mvc;
using PortCom.Demo.Services;

namespace PortCom.Demo.Controllers;

[ApiController]
[Route("api/v2/[controller]")]
public class CustomerReviewsController : ControllerBase
{
    private readonly ICustomerReviewService _service;

    public CustomerReviewsController(ICustomerReviewService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var reviews = await _service.GetAllAsync();
        return Ok(reviews);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var review = await _service.GetByIdAsync(id);
        if (review is null)
            return NotFound();
        return Ok(review);
    }
}
