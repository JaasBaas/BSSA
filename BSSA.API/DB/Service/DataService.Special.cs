using System.Collections.Generic;
using System.Threading.Tasks;
using BSSA.API.DB.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BSSA.API.DB.Service
{
    partial class DataService
    {
        /// <summary>
        /// Select a specific special
        /// </summary>
        /// <param name="specialId">Special ID</param>
        /// <returns>Special</returns>
        public async Task<Special> SelectSpecial(int specialId)
        {
            return await (from p in _db.Special
                          where p.SpecialId == specialId
                          select p).SingleAsync();
        }

        //  public async Task<List<Retailer>> SelectSpecialRetailers(int specialId)
        // {
        //     return await (from p in _db.SpecialStores
        //                  from s in p.Store
        //                   where p.SpecialId == specialId
        //                   select p).SingleAsync();
        // }

    }
}