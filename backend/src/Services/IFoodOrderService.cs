using PortCom.Demo.Models;

namespace PortCom.Demo.Services;

public interface IFoodOrderService
{
    Task<IEnumerable<FoodOrder>> GetAllAsync();
    Task<FoodOrder?> GetByIdAsync(int id);
}
