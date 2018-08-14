using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FamilyPortfolioManager.Migrations
{
    public partial class updated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Assets",
                columns: table => new
                {
                    assetId = table.Column<Guid>(nullable: false),
                    type = table.Column<string>(nullable: true),
                    name = table.Column<string>(nullable: true),
                    quanityOwned = table.Column<double>(nullable: false),
                    purchasePrice = table.Column<double>(nullable: false),
                    currentValue = table.Column<double>(nullable: false),
                    overhead = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assets", x => x.assetId);
                });

            migrationBuilder.CreateTable(
                name: "Portfolios",
                columns: table => new
                {
                    portfolioId = table.Column<Guid>(nullable: false),
                    value = table.Column<double>(nullable: false),
                    date = table.Column<DateTime>(nullable: false),
                    assetIds = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Portfolios", x => x.portfolioId);
                });

            migrationBuilder.CreateTable(
                name: "Stocks",
                columns: table => new
                {
                    stockId = table.Column<Guid>(nullable: false),
                    symbol = table.Column<string>(nullable: true),
                    name = table.Column<string>(nullable: true),
                    quantityOwned = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stocks", x => x.stockId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    userId = table.Column<Guid>(nullable: false),
                    username = table.Column<string>(nullable: true),
                    firstname = table.Column<string>(nullable: true),
                    lastname = table.Column<string>(nullable: true),
                    password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.userId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Assets");

            migrationBuilder.DropTable(
                name: "Portfolios");

            migrationBuilder.DropTable(
                name: "Stocks");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
