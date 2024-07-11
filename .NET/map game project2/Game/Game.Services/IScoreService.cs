using Game.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game.Services
{
    public interface IScoreService
    {
        public List<GetScoreDto> GetAll();
        public bool Create(GetScoreDto e);
		// public bool Update(int Id, GetScoreDto e);
		public GetScoreDto GetOneByUsername(string username);
	}
}
