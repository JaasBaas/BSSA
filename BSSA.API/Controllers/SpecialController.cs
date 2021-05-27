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
    [Route("api/special")]
    [ApiController]
    public class SpecialController : ControllerBase
    {
        private DataService _ds;
        private IMapper _mapper;

        #region Constructor
        public SpecialController(DataService ds, IMapper mapper)
        {
            _ds = ds;
            _mapper = mapper;
        }
        #endregion

        /*
                /// <summary>
                /// Get product variations for a specific product
                /// </summary>
                /// <param name="productId">Product Id</param>
                [HttpGet("ProductVariations/{productId}")]
                public async Task<List<vm.ProductVariationListItem>> GetSpecialCrudView(int specialId)
                {
                    var special = await _ds.SelectProductVariations(productId);
                    return _mapper.Map<List<vm.ProductVariationListItem>>(items);
                }
        */

    }
}