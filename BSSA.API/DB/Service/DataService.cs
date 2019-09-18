using System.Threading.Tasks;
using BSSA.API.DB.Context;

namespace BSSA.API.DB.Service
{
    public partial class DataService
    {
        private appDbContext _db;

        #region Constructor
        public DataService(appDbContext db)
        {
            _db = db;
        }

        #endregion

        public async Task<bool> SaveChangesAsync()
        {
            await _db.SaveChangesAsync();
            return true;
        }
    }
}