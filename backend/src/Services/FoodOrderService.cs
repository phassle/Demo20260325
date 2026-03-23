using PortCom.Demo.Models;

namespace PortCom.Demo.Services;

public class FoodOrderService : IFoodOrderService
{
    private static readonly string[] Statuses = ["Delivered", "Processing", "Pending", "Cancelled"];
    private static readonly string[][] ItemSets =
    [
        ["Cheeseburger", "Fries", "Cola"],
        ["Pepperoni Pizza", "Garlic Bread"],
        ["Caesar Salad", "Lemonade"],
        ["Chicken Wings", "Coleslaw", "Sprite"],
        ["Veggie Wrap", "Sparkling Water"],
        ["Double Burger", "Onion Rings", "Milkshake"],
        ["Margherita Pizza", "Tiramisu"],
    ];

    private static readonly List<FoodOrder> _orders = Enumerable
        .Range(1, 40)
        .Select(i => new FoodOrder
        {
            Id = i,
            CustomerName = $"Customer {(i % 50) + 1}",
            Items = [.. ItemSets[i % ItemSets.Length]],
            Total = Math.Round((50000m + (i * 7300m % 150000m)) / 1000m) * 1000m,
            Status = Statuses[i % Statuses.Length],
            CreatedAt = DateTime.UtcNow.AddHours(-i * 3),
        })
        .ToList();

    public Task<IEnumerable<FoodOrder>> GetAllAsync()
        => Task.FromResult<IEnumerable<FoodOrder>>(_orders);

    public Task<FoodOrder?> GetByIdAsync(int id)
        => Task.FromResult(_orders.FirstOrDefault(o => o.Id == id));
}
