using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
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
        IHttpContextAccessor httpContext;
        public UsersController(AppDbContext context, IConfiguration config, IHttpContextAccessor httpContext)
        {
            this.context = context;
            this.config = config;
            this.httpContext = httpContext;
        }

        [HttpPost]
        public IActionResult NewUser([FromBody] NewUserVM newUser)
        {
            //TO DO: Log the user in

            //are the fields all filled in?
            if(!ModelState.IsValid)
            {
                return Json(new JSONResponseVM { success = false, message = "Model state is incorrect" });
            }

        

            //the user has provided a portfolio that they have been invited to
            if(newUser.portfolioId != null)
            {
                //the user has provided a porfolio that they are being added to

                Guid portId;

                //first lets check if the Guid is valid or not
                if(Guid.TryParse(newUser.portfolioId,out portId))
                {
                    //okay this is a valid Guid, but does it correspond to a porfolio in the database?
                    Portfolio port = context.Portfolios.Where(p => p.portfolioId == portId).FirstOrDefault();

                    if (port != null)
                    {
                        //this is a valid portfolio id, lets create a user
                        User user = new User
                        {
                            userId = Guid.NewGuid(),
                            firstname = newUser.firstname,
                            lastname = newUser.lastname,
                            username = newUser.username,
                            password = HashString.HashThat(newUser.password, config["salt"]),
                            portfolioId1 = port.portfolioId
                        };
                        context.Users.Add(user);
                        //save the database
                        context.SaveChanges();

                        return Json(new JSONResponseVM { success = true, message = "Added user " + user.firstname + " " + user.lastname });

                    } else
                    {
                        //this is not a valid id
                        return Json(new JSONResponseVM { success = false, message = "This Portfolio doesn't exist" });
                    }

                } else
                {
                    //this isn't a valid Guid
                    return Json(new JSONResponseVM { success = false, message = "This Portfolio doesn't exist" });
                }

            } else
            {
                //the user doesn't have a portfolio, so let's make them a default one
                Portfolio portfolio = new Portfolio
                {
                    portfolioId = Guid.NewGuid(),
                    name = newUser.firstname + "'s Portfolio",
                    date = DateTime.Now,
                    value = 0
                };

                //create a new user
                User user = new User
                {
                    userId = Guid.NewGuid(),
                    firstname = newUser.firstname,
                    lastname = newUser.lastname,
                    username = newUser.username,
                    password = HashString.HashThat(newUser.password, config["salt"]),
                    portfolioId1 = portfolio.portfolioId
                };
                

                //add to the db
                context.Portfolios.Add(portfolio);
                context.Users.Add(user);

                //save the database
                context.SaveChanges();

                return Json(new JSONResponseVM { success = true, message = "Added user " + user.firstname + " " + user.lastname });
            }
            
        }

        [HttpPost]
        public IActionResult Login([FromBody]LoginVM user)
        {
            //TO DO: MAKE THE MUTLPIPLE ACCOUNTS SHOW UP WHEN THE USER THEM

            if(!ModelState.IsValid)
            {
                return Json(new JSONResponseVM { success = false, message = "Model state is incorrect" });
            }

            string password = HashString.HashThat(user.password, config["salt"]);

            User theUser = context.Users.Where(u => u.username == user.username && u.password == password).FirstOrDefault();
            if(theUser != null)
            {
                return Json(new JSONResponseVM { success = true, message = GenerateJWT.Generate(
                    theUser.userId.ToString(), 
                    theUser.portfolioId1.ToString(), 
                    config)
                });

            } else
            {
                return Json(new JSONResponseVM { success = false, message = "Incorrect login details" });
            }
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult ChangeUsername([FromBody] UsernameVM username)
        {
            //get the user id
            var userid = httpContext?.HttpContext?.User?.FindFirst(JwtRegisteredClaimNames.Sub).Value;

            //dpes this user exist?
            if (userid != null)
            {
                User user = context.Users.Where(u => u.userId == Guid.Parse(userid)).FirstOrDefault();

                user.username = username.username;

                context.SaveChanges();
                return Json(new JSONResponseVM { success = true, message = "New username: " + username.username });

            }
            return Json(new JSONResponseVM { success = false, message = "Something went wrong" });
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult ChangePassword([FromBody] PasswordVM password)
        {
            //get the user id from the JWT token
            var userid = httpContext?.HttpContext?.User?.FindFirst(JwtRegisteredClaimNames.Sub).Value;

            if(userid != null)
            {
                User user = context.Users.Where(u => u.userId == Guid.Parse(userid)).FirstOrDefault();

                //is the old password correct?
                if(user.password != HashString.HashThat(password.oldPassword, config["salt"]))
                {
                    return Json(new JSONResponseVM { success = false, message = "Old password is incorrect" });
                }
                //change the password
                user.password = HashString.HashThat(password.password, config["salt"]);
                context.SaveChanges();

                return Json(new JSONResponseVM { success = true, message = "New password created!" });
            }
            return Json(new JSONResponseVM { success = false, message = "This user doesn't exist" });
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetUser()
        {
            //get the userId
            var userId = httpContext?.HttpContext?.User?.FindFirst(JwtRegisteredClaimNames.Sub).Value;
            var port = httpContext?.HttpContext?.User?.FindFirst(JwtRegisteredClaimNames.Azp).Value;

            //does this user exist?
            if(userId != null)
            {
                User user = context.Users.Where(u => u.userId == Guid.Parse(userId)).FirstOrDefault();

                if(user != null)
                {
                    return Json(user);
                } else
                {
                    return Json(new JSONResponseVM { success = false, message = "This user doesn't exist" });
                }
            } else
            {
                return Json(new JSONResponseVM { success = false, message = "This user doesn't exist" });
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetUsers() => Json(context.Users.ToList());
    }
}