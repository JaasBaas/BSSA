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

            CreateMap<db.MeasureUnit, vm.MeasureUnitLookup>();
            // .ForMember(d => d.MeasureUnitId, o => o.MapFrom(s => s.MeasureUnitId))
            // .ForMember(d => d.MeasureUnitDisplay, o => o.MapFrom(s => s.MeasureUnitDisplay))
            //.ReverseMap();



            CreateMap<db.Product, vm.Product>().ReverseMap();
            CreateMap<db.ProductIndex, vm.ProductIndex>();
            CreateMap<db.ProductVariation, vm.ProductVariation>().ReverseMap();
            CreateMap<db.ProductVariationList, vm.ProductVariationListItem>();

            CreateMap<db.ProductTag, vm.ProductTag>().ReverseMap();
            CreateMap<db.ProductTags, vm.ProductTagListItem>();

            CreateMap<db.Province, vm.Province>().ReverseMap();
            CreateMap<db.Province, vm.Lookup>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.ProvinceId))
                .ForMember(d => d.Value, o => o.MapFrom(s => s.ProvinceName));

            CreateMap<db.Town, vm.Town>().ReverseMap();
            CreateMap<db.Town, vm.Lookup>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.TownId))
                .ForMember(d => d.Value, o => o.MapFrom(s => s.TownName));

            CreateMap<db.Retailer, vm.Lookup>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.RetailerId))
                .ForMember(d => d.Value, o => o.MapFrom(s => s.RetailerName));

            CreateMap<db.StoreIndex, vm.Lookup>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.StoreId))
                .ForMember(d => d.Value, o => o.MapFrom(s => s.StoreName));
        }
    }
}