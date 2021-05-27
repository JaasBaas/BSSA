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

        ///Get the stores linked to a special
        [HttpGet("SpecialStores/{specialId}")]
        public async Task<List<vm.StoreIndex>> GetSpecialStores(int specialId)
        {
            var data = await _ds.SelectSpecialStores(specialId);
            return _mapper.Map<List<vm.StoreIndex>>(data);
        }
        ///Get the stores linked to a special
        [HttpGet("SpecialStoresLookupDetail/{specialId}")]
        public async Task<List<vm.StoreIndex>> GetSpecialStoresLookupDetail(int specialId)
        {
            var data = await _ds.SelectSpecialStores(specialId);
            /*
            var result = (from d in data
                          group d by new { d.ProvinceId, d.ProvinceName } into p
                          select new vm.LookupDetail()
                          {
                              Id = p.Key.ProvinceId,
                              Value = p.Key.ProvinceName,
                              Children = _mapper.Map<List<vm.Lookup>>(data.Where(v => v.ProvinceId == p.Key.ProvinceId))
                          }).ToList();
            return result;
            */
            return _mapper.Map<List<vm.StoreIndex>>(data);
        }

        ///Get the stores linked to a special
        [HttpGet("SearchRetailerStores/{retailerCsv}/{searchCriteria}")]
        public async Task<List<vm.StoreIndex>> SearchRetailerStores(string retailerCsv, string searchCriteria)
        {
            //Search criteria must contain at least 3 characters
            if (searchCriteria.Length < 3)
                return null;

            //No more than 3 retailers allowed in query
            var retailers = (from r in retailerCsv.Split(',')
                             select int.Parse(r)).Take(3).ToArray();

            var data = await _ds.SearchRetailerStores(retailers, searchCriteria);
            return _mapper.Map<List<vm.StoreIndex>>(data);
        }

        [HttpPost("InsertSpecialStore/{specialId}/{storeId}")]
        public async Task<vm.StoreIndex> InsertSpecialStore(int specialId, int storeId)
        {
            var data = await _ds.InsertSpecialStore(specialId, storeId);
            if (data != null)
            {
                var result = _ds.SelectStoreIndex(storeId);
                return _mapper.Map<vm.StoreIndex>(result);
            }

            return null;
        }

        [HttpDelete("DeleteSpecialStore/{specialId}/{storeId}")]
        public async Task<bool> DeleteSpecialStore(int specialId, int storeId)
        {
            var data = await _ds.SelectSpecialStore(specialId, storeId);
            if (data != null)
                return await _ds.DeleteSpecialStore(data);

            return false;
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
