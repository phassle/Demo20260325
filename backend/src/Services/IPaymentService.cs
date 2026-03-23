using PortCom.Demo.Models;

namespace PortCom.Demo.Services;

public interface IPaymentService
{
    Task<IEnumerable<Payment>> GetAllAsync();
    Task<Payment?> GetByIdAsync(int id);
}
