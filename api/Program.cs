using Microsoft.EntityFrameworkCore;
using api;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DataContext>(opt =>
{
    string connectionName = "ElephantSql";
    string? databaseUri;
    if (builder.Environment.IsDevelopment())
    {
        // Hämtar från secrets.json som sätts lokalt i Visual Studio
        databaseUri = builder.Configuration[connectionName];
    }
    else
    {
        // Environment variable sätts på render.com
        databaseUri = Environment.GetEnvironmentVariable(connectionName);
        if (databaseUri is null) throw new KeyNotFoundException("Could not find connection string in environment variable");
    }
    string connectionString = ElephantSql.ConvertToConnectionString(databaseUri);
    opt.UseNpgsql(connectionString);
    // Namn i databasen använder snake_case men Models använder PascalCase.
    // Entity Framework konverterar namnen på class och properties när den använder databasen.
    opt.UseSnakeCaseNamingConvention();
});

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();