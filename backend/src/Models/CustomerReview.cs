namespace PortCom.Demo.Models;

public class CustomerReview
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = "";
    public int Rating { get; set; }
    public string Comment { get; set; } = "";
    public string FoodItem { get; set; } = "";
    public DateTime Date { get; set; }
}
