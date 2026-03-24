namespace Centuri.Demo.Models;

public enum UserRole { Admin, Auditor, Manager, User }

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public UserRole Role { get; set; } = UserRole.User;
    public string Department { get; set; } = "";
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }
}
