namespace Centuri.Demo.Middleware;

/// <summary>
/// !! STOP RULE: Never touch this file without asking !!
/// Authentication middleware — handles JWT validation and role extraction.
/// This is a sensitive component shared across all endpoints.
/// </summary>
public class AuthMiddleware
{
    private readonly RequestDelegate _next;

    public AuthMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Demo: always sets user as authenticated admin
        // Real implementation validates JWT from Azure AD
        context.Items["UserRole"] = "admin";
        context.Items["UserId"] = "demo-user";
        await _next(context);
    }
}
