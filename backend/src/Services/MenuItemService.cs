using PortCom.Demo.Models;

namespace PortCom.Demo.Services;

public class MenuItemService : IMenuItemService
{
    private static readonly List<MenuItem> _items =
    [
        new() { Id = 1,  Name = "Classic Burger",      Category = "Burgers", Price = 45000, Emoji = "🍔", IsAvailable = true  },
        new() { Id = 2,  Name = "Cheeseburger",        Category = "Burgers", Price = 52000, Emoji = "🍔", IsAvailable = true  },
        new() { Id = 3,  Name = "Double Burger",       Category = "Burgers", Price = 68000, Emoji = "🍔", IsAvailable = true  },
        new() { Id = 4,  Name = "Mushroom Burger",     Category = "Burgers", Price = 55000, Emoji = "🍔", IsAvailable = false },
        new() { Id = 5,  Name = "Pepperoni Pizza",     Category = "Pizza",   Price = 72000, Emoji = "🍕", IsAvailable = true  },
        new() { Id = 6,  Name = "Margherita Pizza",    Category = "Pizza",   Price = 65000, Emoji = "🍕", IsAvailable = true  },
        new() { Id = 7,  Name = "BBQ Chicken Pizza",   Category = "Pizza",   Price = 78000, Emoji = "🍕", IsAvailable = true  },
        new() { Id = 8,  Name = "Caesar Salad",        Category = "Salads",  Price = 38000, Emoji = "🥗", IsAvailable = true  },
        new() { Id = 9,  Name = "Garden Salad",        Category = "Salads",  Price = 32000, Emoji = "🥗", IsAvailable = true  },
        new() { Id = 10, Name = "Chicken Wings",       Category = "Sides",   Price = 48000, Emoji = "🍗", IsAvailable = true  },
        new() { Id = 11, Name = "Onion Rings",         Category = "Sides",   Price = 25000, Emoji = "🧅", IsAvailable = true  },
        new() { Id = 12, Name = "French Fries",        Category = "Sides",   Price = 20000, Emoji = "🍟", IsAvailable = true  },
        new() { Id = 13, Name = "Veggie Wrap",         Category = "Wraps",   Price = 42000, Emoji = "🌯", IsAvailable = true  },
        new() { Id = 14, Name = "Cola",                Category = "Drinks",  Price = 15000, Emoji = "🥤", IsAvailable = true  },
        new() { Id = 15, Name = "Lemonade",            Category = "Drinks",  Price = 18000, Emoji = "🍋", IsAvailable = true  },
    ];

    public Task<IEnumerable<MenuItem>> GetAllAsync()
        => Task.FromResult<IEnumerable<MenuItem>>(_items);

    public Task<MenuItem?> GetByIdAsync(int id)
        => Task.FromResult(_items.FirstOrDefault(m => m.Id == id));
}
