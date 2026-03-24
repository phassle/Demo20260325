using Centuri.Demo.Models;
namespace Centuri.Demo.Services;

public class UserService : IUserService
{
    private static readonly IReadOnlyList<User> Users = new List<User>
    {
        new() { Id = 1, Name = "Anna Lindberg",    Email = "anna.lindberg@centuri.se",    Role = UserRole.Admin,   Department = "Quality",     IsActive = true,  CreatedAt = new DateTime(2022, 1, 15) },
        new() { Id = 2, Name = "Erik Johansson",   Email = "erik.johansson@centuri.se",   Role = UserRole.Manager, Department = "Quality",     IsActive = true,  CreatedAt = new DateTime(2022, 3, 1) },
        new() { Id = 3, Name = "Maria Karlsson",   Email = "maria.karlsson@centuri.se",   Role = UserRole.Manager, Department = "Production",  IsActive = true,  CreatedAt = new DateTime(2023, 2, 10) },
        new() { Id = 4, Name = "Lars Pettersson",  Email = "lars.pettersson@centuri.se",  Role = UserRole.Auditor, Department = "Quality",     IsActive = true,  CreatedAt = new DateTime(2023, 6, 1) },
        new() { Id = 5, Name = "Sofia Andersson",  Email = "sofia.andersson@centuri.se",  Role = UserRole.User,    Department = "Production",  IsActive = true,  CreatedAt = new DateTime(2023, 9, 15) },
        new() { Id = 6, Name = "Nils Eriksson",    Email = "nils.eriksson@centuri.se",    Role = UserRole.User,    Department = "R&D",         IsActive = true,  CreatedAt = new DateTime(2024, 1, 10) },
        new() { Id = 7, Name = "Karin Svensson",   Email = "karin.svensson@centuri.se",   Role = UserRole.User,    Department = "Logistics",   IsActive = false, CreatedAt = new DateTime(2022, 5, 20) },
        new() { Id = 8, Name = "Oscar Nilsson",    Email = "oscar.nilsson@centuri.se",    Role = UserRole.User,    Department = "IT",          IsActive = true,  CreatedAt = new DateTime(2024, 4, 1) },
    };

    public Task<IEnumerable<User>> GetAllAsync()
        => Task.FromResult<IEnumerable<User>>(Users);

    public Task<User?> GetByIdAsync(int id)
        => Task.FromResult(Users.FirstOrDefault(u => u.Id == id));
}
