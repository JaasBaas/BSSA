using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BSSA.API.DB.Service;
using Microsoft.AspNetCore.Mvc;
using vm = BSSA.API.ViewModel;

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
        // GET api/index
        [HttpGet("index")]
        public async Task<List<vm.ProductIndex>> GetIndexAsync()
        {
            var data = await _ds.SelectProductsAsync();
            return _mapper.Map<List<vm.ProductIndex>>(data);
        }

        /*
        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
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
