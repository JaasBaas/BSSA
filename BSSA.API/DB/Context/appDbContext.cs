using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using BSSA.API.DB.Entities;

namespace BSSA.API.DB.Context
{
    public partial class appDbContext : DbContext
    {
        public appDbContext()
        {
        }

        public appDbContext(DbContextOptions<appDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Brand> Brand { get; set; }
        public virtual DbSet<MeasureUnit> MeasureUnit { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<ProductTag> ProductTag { get; set; }
        public virtual DbSet<ProductVariation> ProductVariation { get; set; }
        public virtual DbSet<Province> Province { get; set; }
        public virtual DbSet<Retailer> Retailer { get; set; }
        public virtual DbSet<Special> Special { get; set; }
        public virtual DbSet<SpecialItemProductVariations> SpecialItemProductVariations { get; set; }
        public virtual DbSet<SpecialItemType> SpecialItemType { get; set; }
        public virtual DbSet<SpecialItems> SpecialItems { get; set; }
        public virtual DbSet<SpecialStores> SpecialStores { get; set; }
        public virtual DbSet<SpecialType> SpecialType { get; set; }
        public virtual DbSet<Store> Store { get; set; }
        public virtual DbSet<Tag> Tag { get; set; }
        public virtual DbSet<TagCategory> TagCategory { get; set; }
        public virtual DbSet<Town> Town { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Brand>(entity =>
            {
                entity.HasIndex(e => e.BrandName)
                    .HasName("IX_Manufacturer_Manufacturer")
                    .IsUnique();

                entity.Property(e => e.BrandId).HasColumnName("BrandID");

                entity.Property(e => e.BrandName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<MeasureUnit>(entity =>
            {
                entity.HasIndex(e => e.MeasureUnitAbbr)
                    .IsUnique();

                entity.HasIndex(e => e.MeasureUnitName)
                    .HasName("IX_MeasureUnit_MeasureUnit")
                    .IsUnique();

                entity.Property(e => e.MeasureUnitId).HasColumnName("MeasureUnitID");

                entity.Property(e => e.MeasureUnitAbbr)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.MeasureUnitDisplay)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MeasureUnitName)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.BrandId).HasColumnName("BrandID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Brand)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.BrandId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Product_Manufacturer");
            });

            modelBuilder.Entity<ProductTag>(entity =>
            {
                entity.HasKey(e => new { e.ProductId, e.TagId });

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.TagId).HasColumnName("TagID");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductTag)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductTag_Product");

                entity.HasOne(d => d.Tag)
                    .WithMany(p => p.ProductTag)
                    .HasForeignKey(d => d.TagId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductTag_Tag");
            });

            modelBuilder.Entity<ProductVariation>(entity =>
            {
                entity.Property(e => e.ProductVariationId).HasColumnName("ProductVariationID");

                entity.Property(e => e.Measure).HasColumnType("numeric(9, 2)");

                entity.Property(e => e.MeasureUnitId).HasColumnName("MeasureUnitID");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.VariationName)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.HasOne(d => d.MeasureUnit)
                    .WithMany(p => p.ProductVariation)
                    .HasForeignKey(d => d.MeasureUnitId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductVariation_MeasureUnit");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductVariation)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ProductVariation_Product");
            });

            modelBuilder.Entity<Province>(entity =>
            {
                entity.Property(e => e.ProvinceId).HasColumnName("ProvinceID");

                entity.Property(e => e.ProvinceName)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Retailer>(entity =>
            {
                entity.Property(e => e.RetailerId).HasColumnName("RetailerID");

                entity.Property(e => e.RetailerName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Special>(entity =>
            {
                entity.Property(e => e.SpecialId).HasColumnName("SpecialID");

                entity.Property(e => e.CapturedOn).HasColumnType("datetime");

                entity.Property(e => e.FromDate).HasColumnType("date");

                entity.Property(e => e.SpecialName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ToDate).HasColumnType("date");

                entity.HasOne(d => d.SpecialType)
                    .WithMany(p => p.Special)
                    .HasForeignKey(d => d.SpecialTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Special_SpecialType");
            });

            modelBuilder.Entity<SpecialItemProductVariations>(entity =>
            {
                entity.HasKey(e => new { e.SpecialItemId, e.ProductVariationId });

                entity.Property(e => e.SpecialItemId).HasColumnName("SpecialItemID");

                entity.Property(e => e.ProductVariationId).HasColumnName("ProductVariationID");

                entity.HasOne(d => d.ProductVariation)
                    .WithMany(p => p.SpecialItemProductVariations)
                    .HasForeignKey(d => d.ProductVariationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SpecialItemProductVariations_ProductVariation");

                entity.HasOne(d => d.SpecialItem)
                    .WithMany(p => p.SpecialItemProductVariations)
                    .HasForeignKey(d => d.SpecialItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SpecialItemProducts_SpecialItems");
            });

            modelBuilder.Entity<SpecialItemType>(entity =>
            {
                entity.Property(e => e.SpecialItemTypeId).ValueGeneratedNever();

                entity.Property(e => e.SpecialItemTypeDesc)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SpecialItemTypeName)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.SpecialItemTypeRule)
                    .IsRequired()
                    .HasMaxLength(5)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<SpecialItems>(entity =>
            {
                entity.HasKey(e => e.SpecialItemId);

                entity.Property(e => e.SpecialItemId).HasColumnName("SpecialItemID");

                entity.Property(e => e.MeasureUnitId).HasColumnName("MeasureUnitID");

                entity.Property(e => e.Price).HasColumnType("decimal(9, 2)");

                entity.Property(e => e.SpecialId).HasColumnName("SpecialID");

                entity.HasOne(d => d.MeasureUnit)
                    .WithMany(p => p.SpecialItems)
                    .HasForeignKey(d => d.MeasureUnitId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SpecialItems_MeasureUnit");

                entity.HasOne(d => d.Special)
                    .WithMany(p => p.SpecialItems)
                    .HasForeignKey(d => d.SpecialId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SpecialItems_Special");

                entity.HasOne(d => d.SpecialItemType)
                    .WithMany(p => p.SpecialItems)
                    .HasForeignKey(d => d.SpecialItemTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SpecialItems_SpecialItemType");
            });

            modelBuilder.Entity<SpecialStores>(entity =>
            {
                entity.HasKey(e => new { e.StoreId, e.SpecialId })
                    .HasName("PK__SpecialS__29371CC5AE144F4C");

                entity.Property(e => e.StoreId).HasColumnName("StoreID");

                entity.Property(e => e.SpecialId).HasColumnName("SpecialID");

                entity.HasOne(d => d.Special)
                    .WithMany(p => p.SpecialStores)
                    .HasForeignKey(d => d.SpecialId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SpecialStores_Special");

                entity.HasOne(d => d.Store)
                    .WithMany(p => p.SpecialStores)
                    .HasForeignKey(d => d.StoreId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SpecialStores_Store");
            });

            modelBuilder.Entity<SpecialType>(entity =>
            {
                entity.Property(e => e.SpecialTypeName)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.Property(e => e.StoreId).HasColumnName("StoreID");

                entity.Property(e => e.RetailerId).HasColumnName("RetailerID");

                entity.Property(e => e.StoreName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Retailer)
                    .WithMany(p => p.Store)
                    .HasForeignKey(d => d.RetailerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Store_Retailer");

                entity.HasOne(d => d.Town)
                    .WithMany(p => p.Store)
                    .HasForeignKey(d => d.TownId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Store_Town");
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.HasIndex(e => e.TagName)
                    .IsUnique();

                entity.Property(e => e.TagId).HasColumnName("TagID");

                entity.Property(e => e.TagCategoryId).HasColumnName("TagCategoryID");

                entity.Property(e => e.TagName)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.HasOne(d => d.TagCategory)
                    .WithMany(p => p.Tag)
                    .HasForeignKey(d => d.TagCategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Tag_TagCategory");
            });

            modelBuilder.Entity<TagCategory>(entity =>
            {
                entity.HasIndex(e => e.TagCategoryName)
                    .IsUnique();

                entity.Property(e => e.TagCategoryId).HasColumnName("TagCategoryID");

                entity.Property(e => e.TagCategoryName)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Town>(entity =>
            {
                entity.HasIndex(e => new { e.ProvinceId, e.TownName })
                    .HasName("IX_Province_Town")
                    .IsUnique();

                entity.Property(e => e.TownId).ValueGeneratedNever();

                entity.Property(e => e.TownName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Province)
                    .WithMany(p => p.Town)
                    .HasForeignKey(d => d.ProvinceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Town_Province");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
