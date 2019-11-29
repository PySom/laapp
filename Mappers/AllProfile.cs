using AutoMapper;
using LAAPI.Models;
using LAAPI.Models.DTO;
using LAAPI.Models.ViewModels;

namespace GovCheck.Mappers
{
    public class AllProfile : Profile
    {
        public AllProfile()
        {
            CreateMap<Confession, ConfessionViewModel>()
                .ReverseMap();

            CreateMap<Confession, ConfessionInfoViewModel>()
                .ReverseMap();

            CreateMap<Deanery, DeaneryViewModel>()
                .ReverseMap();
            
            CreateMap<Deanery, DeaneryInfoViewModel>()
                .ReverseMap();

            CreateMap<Donor, DonorViewModel>()
                .ReverseMap();

            CreateMap<Donor, DonorCreateViewModel>()
                .ReverseMap();

            CreateMap<Mass, MassViewModel>()
                .ReverseMap();

            CreateMap<Mass, MassInfoViewModel>()
                .ReverseMap();

            CreateMap<Parish, ParishInfoViewModel>()
                .ReverseMap();

            CreateMap<Parish, ParishViewModel>()
                .ReverseMap();

            CreateMap<ApplicationUser, UserViewModel>()
                .ReverseMap();

            CreateMap<ApplicationUser, RegisterViewModel>()
                .ReverseMap();
        }
    }
}
