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

        // GET api/SearchResults
        [HttpGet("SearchResults/{criteria}")]
        public async Task<List<vm.ProductIndex>> GetSearchResultsAsync(string criteria)
        {
            var data = await _ds.SelectProductsAsync(criteria);
            return _mapper.Map<List<vm.ProductIndex>>(data);
        }

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
        public async Task<bool> UpdateProductAsync([FromBody] vm.Product product)
        {
            var entity = await _ds.SelectProductAsync(product.ProductId);
            _mapper.Map(product, entity);
            return await _ds.SaveChangesAsync();
        }

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
