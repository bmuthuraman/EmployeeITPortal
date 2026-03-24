using Application.Interfaces;
using Infrastructure.Data;
using Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DB Factory (FIXED)
builder.Services.AddScoped<IDbConnectionFactory, DbConnectionFactory>();
// Repository
builder.Services.AddScoped<IRequestRepository, RequestRepository>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173") // Vite default
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowReact");
// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Employee IT Portal API V1");
        c.RoutePrefix = string.Empty; // 👈 THIS MAKES SWAGGER OPEN AT ROOT
    });
}

app.UseAuthorization();

app.MapControllers();
app.Run();