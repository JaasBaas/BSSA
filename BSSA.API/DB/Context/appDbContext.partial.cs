using BSSA.API.DB.Entities;
using Microsoft.EntityFrameworkCore;

/*
dotnet-ef dbcontext scaffold "Server=JACQUES-NAUDE\SQL2016DEV;Database=BargainShopper;User Id=bssa3api;Password=bssaKey&31;" Microsoft.EntityFrameworkCore.SqlServer -c appDbContext --context-dir .\DB\Context\ -f -o .\DB\Entities\  -p BSSA.API --framework netcoreapp3.0 -t [dbo].[Product] -t [dbo].[Brand] -t [dbo].[ProductVariation] -t [dbo].[MeasureUnit] -t [dbo].[ProductTag] -t [dbo].[Tag] -t [dbo].[TagCategory] -t [dbo].[Province] -t [dbo].[Town] -t [dbo].[Store] -t [dbo].[Retailer] -t [dbo].[SpecialStores] -t [dbo].[Special] -t [dbo].[SpecialItems] -t [dbo].[SpecialItemProductVariations] -t [dbo].[SpecialItemType] -t [dbo].[SpecialType]

Views, generate when required
-t [dbo].[ProductIndex]
-t [dbo].[ProductVariationList]
-t [dbo].[ProductTags]
-t [dbo].[StoreIndex]
*/

namespace BSSA.API.DB.Context
{
    partial class appDbContext
    {
        public virtual DbSet<ProductIndex> ProductIndex { get; set; }
        public virtual DbSet<ProductVariationList> ProductVariationList { get; set; }
        public virtual DbSet<ProductTags> ProductTags { get; set; }
        public virtual DbSet<StoreIndex> StoreIndex { get; set; }

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

            modelBuilder.Entity<StoreIndex>(entity =>
           {
               entity.HasKey(e => e.StoreId);

               entity.Property(e => e.ProvinceId).HasColumnName("ProvinceID");

               entity.Property(e => e.ProvinceName)
                   .IsRequired()
                   .HasMaxLength(25)
                   .IsUnicode(false);

               entity.Property(e => e.RetailerId).HasColumnName("RetailerID");

               entity.Property(e => e.RetailerName)
                   .IsRequired()
                   .HasMaxLength(50)
                   .IsUnicode(false);

               entity.Property(e => e.StoreId).HasColumnName("StoreID");

               entity.Property(e => e.StoreName)
                   .IsRequired()
                   .HasMaxLength(50)
                   .IsUnicode(false);

               entity.Property(e => e.TownName)
                   .IsRequired()
                   .HasMaxLength(50)
                   .IsUnicode(false);
           });
        }
    }
}