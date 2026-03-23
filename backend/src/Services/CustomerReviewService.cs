using PortCom.Demo.Models;

namespace PortCom.Demo.Services;

public class CustomerReviewService : ICustomerReviewService
{
    private static readonly string[] Comments =
    [
        "Really delicious, will order again!",
        "Fast delivery and great taste.",
        "The packaging was excellent.",
        "Good food but a bit pricey.",
        "Best burger in town!",
        "Salad was fresh and crispy.",
        "Pizza could have been hotter.",
        "Amazing flavors, highly recommend.",
        "Portion sizes are generous.",
        "Friendly staff, great experience.",
    ];

    private static readonly string[] Foods =
        ["Cheeseburger", "Pepperoni Pizza", "Caesar Salad", "Chicken Wings", "Veggie Wrap", "Double Burger", "Margherita Pizza"];

    private static readonly List<CustomerReview> _reviews = Enumerable
        .Range(1, 30)
        .Select(i => new CustomerReview
        {
            Id = i,
            CustomerName = $"Customer {(i % 50) + 1}",
            Rating = (i % 5) + 1,
            Comment = Comments[i % Comments.Length],
            FoodItem = Foods[i % Foods.Length],
            Date = DateTime.UtcNow.AddDays(-i),
        })
        .ToList();

    public Task<IEnumerable<CustomerReview>> GetAllAsync()
        => Task.FromResult<IEnumerable<CustomerReview>>(_reviews);

    public Task<CustomerReview?> GetByIdAsync(int id)
        => Task.FromResult(_reviews.FirstOrDefault(r => r.Id == id));
}
