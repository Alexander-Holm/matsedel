using Microsoft.EntityFrameworkCore;
using api;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DataContext>(opt =>
{
    string connectionName = "ElephantSql";
    string? databaseUri;
    if (builder.Environment.IsDevelopment())
    {
        // H�mtar fr�n secrets.json som s�tts lokalt i Visual Studio
        databaseUri = builder.Configuration[connectionName];
    }
    else
    {
        // Environment variable s�tts p� render.com
        databaseUri = Environment.GetEnvironmentVariable(connectionName);
        if (databaseUri is null) throw new KeyNotFoundException("Could not find connection string in environment variable");
    }
    string connectionString = ElephantSql.ConvertToConnectionString(databaseUri);
    opt.UseNpgsql(connectionString);
    // Namn i databasen anv�nder snake_case men Models anv�nder PascalCase.
    // Entity Framework konverterar namnen p� class och properties n�r den anv�nder databasen.
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