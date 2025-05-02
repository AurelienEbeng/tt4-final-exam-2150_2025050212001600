using Microsoft.EntityFrameworkCore;

using backend.Data;

// Builder
var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin() 
                   .AllowAnyMethod() 
                   .AllowAnyHeader(); 
        });
});
//

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection"); // string

builder.Services.AddDbContext<ApplicationDBContext>(options => options.UseSqlite(connectionString));


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // Easy way to do the API documentation

// stage 2
var app = builder.Build();


if(app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if(!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowAllOrigins");

app.MapControllers();

app.Run();