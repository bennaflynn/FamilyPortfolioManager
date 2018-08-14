using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using FamilyPortfolioManager.Models;
using FamilyPortfolioManager.Models.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FamilyPortfolioManager.Controllers
{
    [Produces("application/json")]
    [Route("[controller]/[action]")]
    public class AssetsController : Controller
    {
        AppDbContext context;

        public AssetsController(AppDbContext context)
        {
            this.context = context;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult AddNewStock([FromBody] StockVM stock)
        {
            if (!ModelState.IsValid)
            {
                return Json(new JSONResponseVM { success = false, message = "Model state isn't valid" });
            }

            Stock exists = context.Stocks.Where(s => s.symbol == stock.symbol).FirstOrDefault();

            if(exists != null)
            {
                //if the stock exists just add to the stocks quantity owned
                //as in our system assets are never truely deleted from the system
                //just the quantity owned gets set to zero
                exists.quantityOwned += stock.quantityOwned;
                context.SaveChanges();
                return Json(new JSONResponseVM { success = true, message = "The stocks quantity has been added to" });
            } else
            {
                Stock newStock = new Stock
                {
                    stockId = Guid.NewGuid(),
                    name = stock.name,
                    symbol = stock.symbol,
                    quantityOwned = stock.quantityOwned
                };
                context.Stocks.Add(newStock);
                context.SaveChanges();
                return Json(new JSONResponseVM { success = true, message = newStock.symbol + " has been added!" });
            }

            
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult AddNewAsset([FromBody] AddAssetVM newAsset) 
        {
            if(!ModelState.IsValid)
            {
                return Json(new JSONResponseVM { success = false, message = "Model state is invalid" });
            }

            //to do, add image upload to imgur


            Asset ass = new Asset
            {
                assetId = Guid.NewGuid(),
                type = newAsset.type,
                name = newAsset.name,
                imageUrl = newAsset.imageUrl == null ? "" : newAsset.imageUrl,
                purchasePrice = newAsset.purchasePrice,
                currentValue = newAsset.currentValue,
                overhead = newAsset.overhead,
                quanityOwned = newAsset.quanityOwned
            };

            context.Assets.Add(ass);
            context.SaveChanges();
            return Json(new JSONResponseVM { success = true, message = "Successfully added new asset" });
        }
        
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult ChangeAmountAssetOwned([FromBody] QChangeStockVM asset)
        {
            //can just use the same one as stock as the data that we need is the same
            if (!ModelState.IsValid) return Json(new JSONResponseVM { success = false, message = "No id" });

            Asset ass = context.Assets.Where(a => a.assetId == asset.id).FirstOrDefault();

            if(ass != null)
            {
                ass.quanityOwned = ass.quanityOwned + asset.quantity < 0 ? 0 : ass.quanityOwned + asset.quantity;
                context.SaveChanges();
                return Json(new JSONResponseVM { success = true, message = "Asset changed" });
            }

            return Json(new JSONResponseVM { success = false, message = "Something went wrong..." });
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetAssets() => Json(context.Assets.Where(a => a.quanityOwned > 0));

        //this action result also doubles as a delete, as when deleting the quantity owned just gets 
        //set to zero. And when displaying the stocks we only display the ones whose quantity owned
        //is greater than 0
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult ChangeStockQuantityOwned([FromBody] QChangeStockVM stockChange)
        {
            if(!ModelState.IsValid)
            {
                return Json(new JSONResponseVM { success = false, message = "Model state is not valid" });
            }

            Stock stock = context.Stocks.Where(s => s.stockId == stockChange.id).FirstOrDefault();

            if(stock != null)
            {

                stock.quantityOwned = stock.quantityOwned + stockChange.quantity < 0 ? 0 : stock.quantityOwned + stockChange.quantity;
                context.SaveChanges();

                return Json(new JSONResponseVM { success = true, message = "Quantity Changed" });
            }
            return Json(new JSONResponseVM { success = false, message = "Could not find this stock" });
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetAllStocks() => Json(context.Stocks.Where(s => s.quantityOwned > 0));
        
    }
}