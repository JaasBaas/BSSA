using System.Collections.Generic;
using System.Threading.Tasks;
using BSSA.API.DB.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BSSA.API.DB.Service
{
    partial class DataService
    {
        public async Task<List<StoreIndex>> SelectStores(int retailerId, int provinceId)
        {
            var x = await (from p in _db.StoreIndex
                           where p.RetailerId == retailerId && p.ProvinceId == provinceId
                           orderby p.StoreName
                           select p).ToListAsync();
            return x;
        }
        public async Task<List<StoreIndex>> SelectStores(int retailerId, int provinceId, int townId)
        {
            var x = await (from p in _db.StoreIndex
                           where p.RetailerId == retailerId && p.ProvinceId == provinceId && p.TownId == townId
                           orderby p.StoreName
                           select p).ToListAsync();
            return x;
        }

        public async Task<StoreIndex> SelectStoreIndex(int storeId)
        {
            var x = await (from p in _db.StoreIndex
                           where p.StoreId == storeId
                           select p).SingleOrDefaultAsync();
            return x;
        }

        public async Task<List<StoreIndex>> SearchRetailerStores(int[] retailerId, string searchCriteria)
        {
            var x = await (from p in _db.StoreIndex
                           where retailerId.Contains(p.RetailerId)
                           && p.StoreName.Contains(searchCriteria)
                           orderby p.StoreName
                           select p).ToListAsync();
            return x;
        }

        //Get the stores for a specific special
        public async Task<List<StoreIndex>> SelectSpecialStores(int specialId)
        {
            var x = await (from p in _db.SpecialStores
                           join si in _db.StoreIndex on p.StoreId equals si.StoreId
                           where p.SpecialId == specialId
                           orderby si.ProvinceName, si.StoreName
                           select si).ToListAsync();
            return x;
        }
        public async Task<SpecialStores> SelectSpecialStore(int specialId, int storeId)
        {
            var x = await (from p in _db.SpecialStores
                           where p.SpecialId == specialId && p.StoreId == storeId
                           select p).SingleOrDefaultAsync();
            return x;
        }
        public async Task<bool> DeleteSpecialStore(SpecialStores specialStore)
        {
            _db.Remove(specialStore);
            await _db.SaveChangesAsync();
            return true;
        }
        public async Task<SpecialStores> InsertSpecialStore(int specialId, int storeId)
        {
            var ss = await (from s in _db.SpecialStores
                            where s.SpecialId == specialId && s.StoreId == storeId
                            select s).SingleOrDefaultAsync();

            if (ss == null)
            {
                ss = new SpecialStores() { SpecialId = specialId, StoreId = storeId };
                _db.Add(ss);
                await _db.SaveChangesAsync();
                return ss;
            }

            //This function did not insert a new entry
            return null;
        }

        public async Task<bool> DeleteSpecialStore(int specialId, int storeId)
        {
            var ss = await (from s in _db.SpecialStores
                            where s.SpecialId == specialId && s.StoreId == storeId
                            select s).SingleOrDefaultAsync();

            if (ss == null)
            {
                //This function did not delete an entry
                return false;
            }
            else
            {
                _db.Remove(ss);
                await _db.SaveChangesAsync();
                return true;
            }
        }

        /*
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