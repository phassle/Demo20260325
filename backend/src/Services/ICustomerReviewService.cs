using PortCom.Demo.Models;

namespace PortCom.Demo.Services;

public interface ICustomerReviewService
{
    Task<IEnumerable<CustomerReview>> GetAllAsync();
    Task<CustomerReview?> GetByIdAsync(int id);
}
