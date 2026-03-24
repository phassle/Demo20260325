using Serilog;
using Quartz;
using Centuri.Demo.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, config) =>
    config.ReadFrom.Configuration(context.Configuration));

builder.Services.AddControllers();
builder.Services.AddScoped<IDocumentService, DocumentService>();
builder.Services.AddScoped<IDeviationService, DeviationService>();
builder.Services.AddScoped<IAuditService, AuditService>();
builder.Services.AddScoped<ICaseService, CaseService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ISearchService, FakeSearchService>();
builder.Services.AddSingleton<ICacheService, FakeCacheService>();
builder.Services.AddSingleton<ISchedulerService, FakeSchedulerService>();

builder.Services.AddQuartz(q => { });
builder.Services.AddQuartzHostedService();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
