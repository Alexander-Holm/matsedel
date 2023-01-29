using Microsoft.EntityFrameworkCore;
using api;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DataContext>(opt =>
{
    string? databaseUri;
    if (builder.Environment.IsDevelopment())
    {
        // Hämtar från secrets.json som sätts lokalt i Visual Studio
        // https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-7.0&tabs=windows
        databaseUri = builder.Configuration[ElephantSql.EnvironmentVariable];
        string apiKey = builder.Configuration["ApiKey"];
        Environment.SetEnvironmentVariable("ApiKey", apiKey);
    }
    else
    {
        // Environment variable sätts på render.com
        databaseUri = Environment.GetEnvironmentVariable(ElephantSql.EnvironmentVariable);
        if (databaseUri is null) throw new KeyNotFoundException("Could not find connection string in environment variable");
    }
    string connectionString = ElephantSql.ConvertToConnectionString(databaseUri);
    opt.UseNpgsql(connectionString);
    // Namn i databasen använder snake_case men Models använder PascalCase.
    // Entity Framework konverterar namnen på class och properties när den anv�nder databasen.
    opt.UseSnakeCaseNamingConvention();
});

builder.Services.AddCors();
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
// UseCors måste ligga efter UseHttpsRedirection() och innan UseAuthorization()
app.UseCors(options => {
    options.AllowAnyHeader();
    options.AllowAnyMethod();
    options.AllowAnyOrigin();
}); 
app.UseAuthorization();
app.MapControllers();

app.Run();