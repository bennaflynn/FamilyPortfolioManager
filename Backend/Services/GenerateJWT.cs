using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FamilyPortfolioManager.Services
{
    public static class GenerateJWT
    {
        public static string Generate(string userid,IConfiguration config)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userid),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier,userid)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenInformation:Key"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //same signin should work for the next 50 days
            var expires = DateTime.Now.AddDays(Convert.ToDouble(50));

            var token = new JwtSecurityToken(
                config["TokenInformation:Issuer"],
                config["TokenInformation:Audience"],
                claims,
                expires: expires,
                signingCredentials: creds
                );

            var formattedToken = new JwtSecurityTokenHandler().WriteToken(token);

            return formattedToken;
        }
    }

    
}
