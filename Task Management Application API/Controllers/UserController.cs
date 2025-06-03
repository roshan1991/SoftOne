using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;
using System.Security.Claims;
using Task_Management_Application_API.DB;
using Microsoft.AspNetCore.Authorization;

namespace Task_Management_Application_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppliccationDbContext _context;

        public UserController(AppliccationDbContext context)
        {
            _context = context;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync([FromBody] Login model)
        {
            var loginUser = await _context.Users.FindAsync(model.username, model.password);

            if (loginUser == null)
            {
                return NotFound();
            } else
            {
                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, model.username)
        };
                var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var principal = new ClaimsPrincipal(identity);
                HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
                
                return Ok(new { Message = "Login successful!", UserName= loginUser.Name });
            }
        }

    }
}
