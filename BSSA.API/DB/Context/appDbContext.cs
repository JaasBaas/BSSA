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
        public virtual DbSet<ProductVariation> ProductVariation { get; set; }

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
                entity.HasIndex(e => e.MeasureUnit1)
                    .IsUnique();

                entity.HasIndex(e => e.MeasureUnitAbbr)
                    .IsUnique();

                entity.Property(e => e.MeasureUnitId).HasColumnName("MeasureUnitID");

                entity.Property(e => e.MeasureUnit1)
                    .IsRequired()
                    .HasColumnName("MeasureUnit")
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

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
