using System.Collections.Generic;
using System.Threading.Tasks;
using BSSA.API.DB.Entities;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace BSSA.API.DB.Service
{
    partial class DataService
    {
        public async Task<List<MeasureUnit>> SelectMeasureUnitsAsync()
        {
            var x = await (from p in _db.MeasureUnit
                           select p).ToListAsync();
            return x;
        }
        public async Task<Brand> SelectMeasureUnitAsync(int BrandId)
        {
            var x = await (from p in _db.Brand
                           where p.BrandId == BrandId
                           select p).SingleAsync();
            return x;
        }

        public async Task<int> InsertMeasureUnitAsync(MeasureUnit measureUnit)
        {
            _db.Add(measureUnit);
            await _db.SaveChangesAsync();
            return measureUnit.MeasureUnitId;
        }

        public async Task<bool> UpdateMeasureUnitAsync(MeasureUnit measureUnit)
        {
            _db.Attach(measureUnit);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}