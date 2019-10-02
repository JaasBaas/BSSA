using System.Collections.Generic;
using System.Threading.Tasks;
using BSSA.API.DB.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BSSA.API.DB.Service
{
    partial class DataService
    {
        #region Product
        public async Task<List<ProductIndex>> SelectProductsAsync(string criteria)
        {
            var x = await (from p in _db.ProductIndex
                           where p.ProductName.Contains(criteria)
                           select p).ToListAsync();
            return x;
        }
        public async Task<Product> SelectProductAsync(int productId)
        {
            var x = await (from p in _db.Product
                           where p.ProductId == productId
                           select p).SingleAsync();
            return x;
        }

        public async Task<int> InsertProductAsync(Product product)
        {
            _db.Add(product);
            await _db.SaveChangesAsync();
            return product.ProductId;
        }
        #endregion

        #region Product Variation

        public async Task<List<ProductVariationList>> SelectProductVariations(int productId)
        {
            var x = await (from p in _db.ProductVariationList
                           where p.ProductId == productId
                           select p).ToListAsync();
            return x;
        }
        public async Task<ProductVariationList> SelectProductVariation(int productVariationId)
        {
            return await (from p in _db.ProductVariationList
                          where p.ProductVariationId == productVariationId
                          select p).SingleAsync();
        }


        public async Task<int> InsertProductVariationAsync(ProductVariation productVariation)
        {
            _db.Add(productVariation);
            await _db.SaveChangesAsync();
            return productVariation.ProductVariationId;
        }

        public async Task DeleteProductVariationAsync(ProductVariation productVariation)
        {
            var x = await _db.ProductVariation.FindAsync(productVariation.ProductVariationId);
            _db.Remove(x);
            await _db.SaveChangesAsync();
        }
        #endregion

        #region Product Tag

        public async Task<List<ProductTags>> SelectProductTags(int productId)
        {
            var x = await (from p in _db.ProductTags
                           where p.ProductId == productId
                           select p).ToListAsync();
            return x;
        }
        public async Task InsertProductTag(ProductTag entity)
        {
            _db.Add(entity);
            await _db.SaveChangesAsync();
        }
        public async Task DeleteProductTag(ProductTag entity)
        {
            var pt = await _db.ProductTag.FindAsync(entity.ProductId, entity.TagId);
            _db.Remove(pt);
            await _db.SaveChangesAsync();
        }
        public async Task DeleteProductTag(int productId, int tagId)
        {
            var pt = await _db.ProductTag.Where(p => p.ProductId == productId && p.TagId == tagId).SingleAsync();
            _db.Remove(pt);
            await _db.SaveChangesAsync();
        }
        #endregion

        #region Tag
        public async Task<Tag> SelectTag(string tagName)
        {
            return await (from o in _db.Tag
                          where o.TagName.ToUpper() == tagName.ToUpper()
                          select o).SingleOrDefaultAsync();
        }
        public async Task InsertTag(Tag entity)
        {
            _db.Add(entity);
            await _db.SaveChangesAsync();
        }


        #endregion
    }
}