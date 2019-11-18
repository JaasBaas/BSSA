using System.Collections.Generic;
using System.Threading.Tasks;
using BSSA.API.DB.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BSSA.API.DB.Service
{
    partial class DataService
    {
        public async Task<List<Retailer>> SelectRetailers()
        {
            var x = await (from p in _db.Retailer
                           orderby p.RetailerName
                           select p).ToListAsync();
            return x;
        }
        /*
        public async Task<List<StoreIndex>> SelectStores(int retailerId, int provinceId, int townId)
        {
            var x = await (from p in _db.StoreIndex
                           where p.RetailerId == retailerId && p.ProvinceId == provinceId && p.TownId == townId
                           orderby p.StoreName
                           select p).ToListAsync();
            return x;
        }
        public async Task<Town> SelectTowns(int provinceId)
        {
            var x = await (from p in _db.Town
                           where p.ProvinceId == provinceId
                           orderby p.TownName
                           select p).SingleAsync();
            return x;
        }
        */

        /*
        public async Task<int> InsertBrandAsync(Brand Brand)
        {
            _db.Add(Brand);
            await _db.SaveChangesAsync();
            return Brand.BrandId;
        }
       */
    }
}