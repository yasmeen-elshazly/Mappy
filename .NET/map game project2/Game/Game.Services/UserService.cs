using AutoMapper;
using Game.Repositories.Contract;
using Game.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Game.Repositories.Repository;
using Game.Models;

namespace Game.Services
{
    public class userService : IUserService
    {
        private readonly IUserRepository _userRepository;
      
        private readonly IMapper _mapper;

        public userService( IUserRepository userRepository, IMapper mapper)
        {
           
            _userRepository = userRepository;
          
            _mapper = mapper;
        }


        public List<GetUserDto> GetAll()
        {
            var users = _userRepository.GetAll().ToList();
            var dtos = _mapper.Map<List<GetUserDto>>(users);
            return dtos;
        }
		//public GetUserDto GetOne(string Id)
		//{
		//   var userr = _userRepository.GetAll().FirstOrDefault(u => u.Id == Id);
		//   var dto = _mapper.Map<GetUserDto>(userr);
		//    return dto;
		// }

		public GetUserDto GetOne(string username)
		{
			var userr = _userRepository.GetAll().FirstOrDefault(u => u.UserName == username);
			var dto = _mapper.Map<GetUserDto>(userr);
			return dto;
		}


		public bool Create(GetUserDto e)
        {
            var user = _mapper.Map<User>(e);
            _userRepository.Create(user);
            return true;
        }

        public bool Update(string id, GetUserDto userDto)
        {
            var existingUser = _userRepository.GetAll().FirstOrDefault(c => c.Id == id);
            if (existingUser == null)
                return false;

            _mapper.Map(userDto, existingUser);
            _userRepository.Update(existingUser);
            return true;
        }

    }
}
