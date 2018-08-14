﻿// <auto-generated />
using System;
using FamilyPortfolioManager.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FamilyPortfolioManager.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.1-rtm-30846");

            modelBuilder.Entity("FamilyPortfolioManager.Models.Asset", b =>
                {
                    b.Property<Guid>("assetId")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("currentValue");

                    b.Property<string>("name");

                    b.Property<double>("overhead");

                    b.Property<double>("purchasePrice");

                    b.Property<double>("quanityOwned");

                    b.Property<string>("type");

                    b.HasKey("assetId");

                    b.ToTable("Assets");
                });

            modelBuilder.Entity("FamilyPortfolioManager.Models.Portfolio", b =>
                {
                    b.Property<Guid>("portfolioId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("assetIds");

                    b.Property<DateTime>("date");

                    b.Property<double>("value");

                    b.HasKey("portfolioId");

                    b.ToTable("Portfolios");
                });

            modelBuilder.Entity("FamilyPortfolioManager.Models.Stock", b =>
                {
                    b.Property<Guid>("stockId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("name");

                    b.Property<double>("quantityOwned");

                    b.Property<string>("symbol");

                    b.HasKey("stockId");

                    b.ToTable("Stocks");
                });

            modelBuilder.Entity("FamilyPortfolioManager.Models.User", b =>
                {
                    b.Property<Guid>("userId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("firstname");

                    b.Property<string>("lastname");

                    b.Property<string>("password");

                    b.Property<string>("username");

                    b.HasKey("userId");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
