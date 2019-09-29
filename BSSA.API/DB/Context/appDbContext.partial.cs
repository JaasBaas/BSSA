using BSSA.API.DB.Entities;
using Microsoft.EntityFrameworkCore;

namespace BSSA.API.DB.Context
{
    partial class appDbContext
    {
        public virtual DbSet<ProductIndex> ProductIndex { get; set; }
        public virtual DbSet<ProductVariationList> ProductVariationList { get; set; }
        public virtual DbSet<ProductTags> ProductTags { get; set; }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductIndex>(entity =>
            {
                entity.HasKey(p => p.ProductId);

                entity.ToTable("ProductIndex", "dbo");

                entity.Property(e => e.BrandName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ProductVariationList>((System.Action<Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<ProductVariationList>>)(entity =>
          {
              entity.HasKey(p => p.ProductVariationId);
              entity.ToTable("ProductVariationList", "dbo");

              entity.Property(e => e.BrandName)
                  .IsRequired()
                  .HasMaxLength(50)
                  .IsUnicode(false);

              entity.Property(e => e.Measure).HasColumnType("numeric(9, 2)");

              entity.Property((System.Linq.Expressions.Expression<System.Func<ProductVariationList, string>>)(e => (string)e.MeasureUnitAbbr))
                  .IsRequired()
                  .HasMaxLength(10)
                  .IsUnicode(false);

              entity.Property(e => e.ProductId).HasColumnName("ProductID");

              entity.Property(e => e.ProductName)
                  .IsRequired()
                  .HasMaxLength(50)
                  .IsUnicode(false);

              entity.Property(e => e.ProductVariationId).HasColumnName("ProductVariationID");
          }));

            modelBuilder.Entity<ProductTags>(entity =>
          {
              entity.HasKey(p => new { p.ProductId, p.TagId });

              entity.Property(e => e.ProductId).HasColumnName("ProductID");

              entity.Property(e => e.TagCategoryName)
                  .IsRequired()
                  .HasMaxLength(25)
                  .IsUnicode(false);

              entity.Property(e => e.TagId).HasColumnName("TagID");

              entity.Property(e => e.TagName)
                  .IsRequired()
                  .HasMaxLength(25)
                  .IsUnicode(false);
          });

        }
    }
}