namespace PortCom.Demo.Models;

public class FoodOrder
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = "";
    public List<string> Items { get; set; } = [];
    public decimal Total { get; set; }
    public string Status { get; set; } = "Pending";
    public DateTime CreatedAt { get; set; }
}
