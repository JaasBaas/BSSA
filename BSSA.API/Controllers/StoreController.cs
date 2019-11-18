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
    [Route("api/Store")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private DataService _ds;
        private IMapper _mapper;

        #region Constructor
        public StoreController(DataService ds, IMapper mapper)
        {
            _ds = ds;
            _mapper = mapper;
        }
        #endregion

        [HttpGet("Lookup/{retailerId}/{provinceId}")]
        public async Task<List<vm.Lookup>> GetLookup(int retailerId, int provinceId)
        {
            var data = await _ds.SelectStores(retailerId, provinceId);
            return _mapper.Map<List<vm.Lookup>>(data);
        }

        /*
        [HttpGet("TownLookup/{provinceId}")]
        public async Task<List<vm.TownLookup>> GetTownLookup(int provinceId)
        {
            var data = await _ds.SelectTowns(provinceId);
            return _mapper.Map<List<vm.TownLookup>>(data);
        }

      // GET api/Brand/5
       [HttpGet("{id}")]
       public async Task<vm.Brand> GetBrandAsync(int id)
       {
           var data = await _ds.SelectBrandAsync(id);
           return _mapper.Map<vm.Brand>(data);
       }

       [HttpPost("InsertBrand")]
       public async Task<int> InsertBrandAsync([FromBody] vm.Brand Brand)
       {
           var entity = _mapper.Map<db.Brand>(Brand);
           var key = await _ds.InsertBrandAsync(entity);
           return key;
       }

       [HttpPost("UpdateBrand")]
       public async Task<bool> UpdateBrandAsync([FromBody] vm.Brand Brand)
       {
           var entity = await _ds.SelectBrandAsync(Brand.BrandId);
           _mapper.Map(Brand, entity);
           return await _ds.SaveChangesAsync();
       }

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
