using Microsoft.AspNetCore.Mvc;
using Practica2023.Business.Domain;
using Practica2023.Business.Contracts;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Practica2023.Models;
using System.Security.Cryptography;

namespace Practica2023.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IConfiguration _configuration;

        public AdminsController(IAdminRepository adminRepository, IConfiguration configuration)
        {
            _adminRepository = adminRepository;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login(AdminModel model)
        {
            var admin = _adminRepository.GetAdminByUsername(model.Username);

            if (admin == null || admin.Password != model.Password)
            {
                return Unauthorized();
            }

            var token = GenerateJwtToken(admin.Username);
            return Ok(new { token });
        }

        private string GenerateJwtToken(string username)
        {
            var claims = new[]
            {
        new Claim(ClaimTypes.Name, username)
    };

            var key = new byte[32];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(key);
            }

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddMinutes(1);

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: expires,
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
