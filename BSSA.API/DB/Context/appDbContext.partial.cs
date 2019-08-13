using BSSA.API.DB.Entities;
using Microsoft.EntityFrameworkCore;

namespace BSSA.API.DB.Context
{
     partial class appDbContext
    {
         public virtual DbSet<ProductIndex> ProductIndex { get; set; }
       

       partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductIndex>(entity =>
            {
                entity.HasKey(p=>p.ProductId);

                entity.ToTable("ProductIndex", "dbo");

                entity.Property(e => e.ManufacturerName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.ProductName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });
 
       }
    }
}