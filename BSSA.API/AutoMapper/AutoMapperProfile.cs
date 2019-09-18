using AutoMapper;
using db = BSSA.API.DB.Entities;
using vm = BSSA.API.ViewModel;

namespace BSSA.API.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<db.Brand, vm.Brand>().ReverseMap();

            CreateMap<db.Product, vm.Product>().ReverseMap();
            CreateMap<db.ProductIndex, vm.ProductIndex>().ReverseMap();
        }
    }
}