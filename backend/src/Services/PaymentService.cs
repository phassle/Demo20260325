using PortCom.Demo.Models;

namespace PortCom.Demo.Services;

public class PaymentService : IPaymentService
{
    private static readonly string[] Methods = ["Card", "Cash", "Online"];
    private static readonly string[] Statuses = ["Completed", "Completed", "Completed", "Pending", "Failed"];

    private static readonly List<Payment> _payments = Enumerable
        .Range(1, 40)
        .Select(i => new Payment
        {
            Id = i,
            OrderId = i,
            CustomerName = $"Customer {(i % 50) + 1}",
            Amount = Math.Round((50000m + (i * 7300m % 150000m)) / 1000m) * 1000m,
            Method = Methods[i % Methods.Length],
            Status = Statuses[i % Statuses.Length],
            Date = DateTime.UtcNow.AddHours(-i * 3),
        })
        .ToList();

    public Task<IEnumerable<Payment>> GetAllAsync()
        => Task.FromResult<IEnumerable<Payment>>(_payments);

    public Task<Payment?> GetByIdAsync(int id)
        => Task.FromResult(_payments.FirstOrDefault(p => p.Id == id));
}
