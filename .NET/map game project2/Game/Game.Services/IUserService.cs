using Game.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game.Services
{
    public interface IUserService
    {
        public List<GetUserDto> GetAll();
        //public GetUserDto GetOne(string Id);
        public bool Create(GetUserDto e);
        public bool Update(string Id, GetUserDto e);
		public GetUserDto GetOne(string username);

	}
}
