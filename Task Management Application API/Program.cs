using Task_Management_Application_API.DB;
using Microsoft.EntityFrameworkCore; 
using Microsoft.AspNetCore.Authentication.Cookies; 


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppliccationDbContext>(options =>
   options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/api/user/login";
        options.AccessDeniedPath = "/api/user/accessdenied";
    });

builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularOrigins",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
var app = builder.Build();

app.UseCors("AllowAngularOrigins");
app.UseRouting();
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();


app.Run();
