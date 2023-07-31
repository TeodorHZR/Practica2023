using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Practica2023.Business;
using Practica2023.Business.Contracts;
using Practica2023.Data.Repositories;
using Practica2023.Helpers;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add JWT authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();
builder.Services.AddTransient<IConnectionString>(x => new ConnectionString(builder.Configuration.GetConnectionString("DefaultConnectionString")));
builder.Services.AddTransient<IProductRepository, ProductRepository>();
builder.Services.AddTransient<IConnectionString>(x => new ConnectionString(builder.Configuration.GetConnectionString("DefaultConnectionString")));
builder.Services.AddTransient<IAdminRepository, AdminRepository>();
builder.Services.AddTransient<IConnectionString>(x => new ConnectionString(builder.Configuration.GetConnectionString("DefaultConnectionString")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
