using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FamilyPortfolioManager.Models;
using FamilyPortfolioManager.Models.ViewModels;
using FamilyPortfolioManager.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace FamilyPortfolioManager.Controllers
{
    [Produces("application/json")]
    [Route("[controller]/[action]")]
    public class UsersController : Controller
    {
        AppDbContext context;
        IConfiguration config;
        public UsersController(AppDbContext context, IConfiguration config)
        {
            this.context = context;
            this.config = config;
        }

        [HttpPost]
        public IActionResult NewUser([FromBody] NewUserVM newUser)
        {
            //are the fields all filled in?
            if(!ModelState.IsValid)
            {
                return Json(new JSONResponseVM { success = false, message = "Model state is incorrect" });
            }

            //create a new user
            User user = new User
            {
                userId = Guid.NewGuid(),
                firstname = newUser.firstname,
                lastname = newUser.lastname,
                username = newUser.username,
                password = HashString.HashThat(newUser.password, config["salt"])
            };

            context.Users.Add(user);
            context.SaveChanges();

            return Json(new JSONResponseVM { success = true, message = "Added user " + user.firstname + " " + user.lastname });
        }

        [HttpPost]
        public IActionResult Login([FromBody]LoginVM user)
        {
            if(!ModelState.IsValid)
            {
                return Json(new JSONResponseVM { success = false, message = "Model state is incorrect" });
            }

            string password = HashString.HashThat(user.password, config["salt"]);

            User theUser = context.Users.Where(u => u.username == user.username && u.password == password).FirstOrDefault();
            if(theUser != null)
            {
                return Json(new JSONResponseVM { success = true, message = GenerateJWT.Generate(theUser.userId.ToString(), config) });
            } else
            {
                return Json(new JSONResponseVM { success = false, message = "Incorrect login details" });
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetUsers() => Json(context.Users.ToList());
    }
}