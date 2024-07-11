using AutoMapper;
using Game.Models;
using Game.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game.Services.MP
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<GetUserDto, User>().ReverseMap();
            CreateMap<GetScoreDto, UsersScores>().ReverseMap();

        }

    }
}
