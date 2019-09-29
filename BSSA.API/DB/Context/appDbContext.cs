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
        public virtual DbSet<Tag> Tag { get; set; }
        public virtual DbSet<TagCategory> TagCategory { get; set; }

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
                entity.HasIndex(e => e.MeasureUnitName)
                    .IsUnique();

                entity.HasIndex(e => e.MeasureUnitAbbr)
                    .IsUnique();

                entity.Property(e => e.MeasureUnitId).HasColumnName("MeasureUnitID");

                entity.Property(e => e.MeasureUnitName)
                    .IsRequired()
                    .HasColumnName("MeasureUnitName")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.MeasureUnitAbbr)
                    .IsRequired()
                    .HasMaxLength(10)
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

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
