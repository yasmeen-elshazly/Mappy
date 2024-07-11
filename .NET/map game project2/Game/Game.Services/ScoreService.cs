using AutoMapper;
using Game.Dtos;
using Game.Models;
using Game.Repositories.Contract;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game.Services
{
    public class ScoreService : IScoreService
    {
        private readonly IScoreRepository _scoreRepository;

        private readonly IMapper _mapper;

        public ScoreService(IScoreRepository scoreRepository, IMapper mapper)
        {

            _scoreRepository = scoreRepository;

            _mapper = mapper;
        }


        public List<GetScoreDto> GetAll()
        {
            var scores = _scoreRepository.GetAll().ToList();
            var dtos = _mapper.Map<List<GetScoreDto>>(scores);
            return dtos;
        }

		public GetScoreDto GetOneByUsername(string username)
		{
			var userr = _scoreRepository.GetAll()
				.Include(us => us.User) // Ensure that User entity is included
				.FirstOrDefault(us => us.User.UserName == username);

			var dto = _mapper.Map<GetScoreDto>(userr);
			return dto;
		}

		public bool Create(GetScoreDto e)
        {
            var score = _mapper.Map<UsersScores>(e);
            _scoreRepository.Create(score);
            return true;
        }

		

	}
}
