using Microsoft.EntityFrameworkCore;
using ProEventos.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DataContext>(
    context => context
                .UseSqlite(builder
                    .Configuration
                    .GetConnectionString("Default")
                ));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at 
// https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    
    IApplicationBuilder applicationBuilder = 
        app.UseSwaggerUI(c => 
            c.SwaggerEndpoint(
                "/swagger/v1/swagger.json", 
                "ProEventos.API v1"
            ));
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(x => x.AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowAnyOrigin());

app.MapControllers();

app.Run();
