using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BSSA.API.DB.Service;
using Microsoft.AspNetCore.Mvc;
using vm = BSSA.API.ViewModel;
using db = BSSA.API.DB.Entities;

namespace BSSA.API.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private DataService _ds;
        private IMapper _mapper;

        #region Constructor
        public ProductController(DataService ds, IMapper mapper)
        {
            _ds = ds;
            _mapper = mapper;
        }
        #endregion

        #region Product Search
        // GET api/SearchResults
        [HttpGet("SearchResults/{criteria}")]
        public async Task<List<vm.ProductIndex>> GetSearchResultsAsync(string criteria)
        {
            var data = await _ds.SelectProductsAsync(criteria);
            return _mapper.Map<List<vm.ProductIndex>>(data);
        }
        #endregion

        #region Product
        // GET api/product/5
        [HttpGet("{id}")]
        public async Task<vm.Product> GetProductAsync(int id)
        {
            var data = await _ds.SelectProductAsync(id);
            return _mapper.Map<vm.Product>(data);
        }

        [HttpPost("InsertProduct")]
        public async Task<int> InsertProductAsync([FromBody] vm.Product product)
        {
            var entity = _mapper.Map<db.Product>(product);
            var key = await _ds.InsertProductAsync(entity);
            return key;
        }

        [HttpPost("UpdateProduct")]
        public async Task UpdateProductAsync([FromBody] vm.Product product)
        {
            var entity = await _ds.SelectProductAsync(product.ProductId);
            _mapper.Map(product, entity);
            await _ds.SaveChangesAsync();
        }
        #endregion

        #region Product Variation
        [HttpGet("ProductVariations/{productId}")]
        public async Task<List<vm.ProductVariationListItem>> GetProductVariations(int productId)
        {
            var items = await _ds.SelectProductVariations(productId);
            return _mapper.Map<List<vm.ProductVariationListItem>>(items);
        }

        [HttpGet("ProductVariationListItem/{productVariationId}")]
        public async Task<vm.ProductVariationListItem> GetProductVariationListItem(int productVariationId)
        {
            var items = await _ds.SelectProductVariation(productVariationId);
            return _mapper.Map<vm.ProductVariationListItem>(items);
        }

        [HttpPost("InsertProductVariation")]
        public async Task<int> InsertProductVariationAsync([FromBody] vm.ProductVariation productVariation)
        {
            var entity = _mapper.Map<db.ProductVariation>(productVariation);
            var key = await _ds.InsertProductVariationAsync(entity);
            return key;
        }

        [HttpPost("InsertProductVariationAndReturnListItem")]
        public async Task<vm.ProductVariationListItem> InsertProductVariationAndReturnListItem([FromBody] vm.ProductVariation productVariation)
        {
            var key = await InsertProductVariationAsync(productVariation);
            return await GetProductVariationListItem(key);
        }
        #endregion

        #region Product Tag
        [HttpGet("{productId}/ProductTags")]
        public async Task<List<vm.ProductTagListItem>> GetProductTags(int productId)
        {
            var items = await _ds.SelectProductTags(productId);
            return _mapper.Map<List<vm.ProductTagListItem>>(items);
        }

        [HttpPost("InsertProductTag")]
        public async Task<bool> InsertProductTagAsync([FromBody] vm.ProductTag productTag)
        {
            var entity = _mapper.Map<db.ProductTag>(productTag);
            await _ds.InsertProductTag(entity);
            return true;
        }

        [HttpPost("{productId}/InsertProductTag/{tagName}")]
        public async Task<int> InsertProductTagAsync(int productId, string tagName)
        {
            var existing = await _ds.SelectTag(tagName);
            if (existing == null)
            {
                existing = new db.Tag() { TagName = tagName, TagCategoryId = -2 };
                await _ds.InsertTag(existing);
            }

            var pt = new db.ProductTag()
            {
                ProductId = productId,
                Tag = existing
            };
            await _ds.InsertProductTag(pt);

            return pt.TagId;
        }

        [HttpDelete("DeleteProductTag")]
        public async Task<bool> DeleteProductTagAsync([FromBody] vm.ProductTag productTag)
        {
            var entity = _mapper.Map<db.ProductTag>(productTag);
            await _ds.InsertProductTag(entity);
            return true;
        }

        [HttpDelete("{productId}/DeleteTag/{tagId}")]
        public async Task<bool> DeleteProductTagAsync(int productId, int tagId)
        {
            await _ds.DeleteProductTag(productId, tagId);
            return true;
        }
        #endregion

        /*
        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        */
    }
}
