namespace PortCom.Demo.Models;

public class Payment
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public string CustomerName { get; set; } = "";
    public decimal Amount { get; set; }
    public string Method { get; set; } = "Card";
    public string Status { get; set; } = "Completed";
    public DateTime Date { get; set; }
}
