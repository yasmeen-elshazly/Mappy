using Game.Dtos;
using AutoMapper;
using Game.Models;
using Game.Repositories.Contract;
using Game.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Game.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ScoresController : ControllerBase
    {
        private readonly IScoreService _scoreService;

        public ScoresController(IScoreService scoreService)
        {
            _scoreService = scoreService;
        }

        [HttpGet]
      //  [Authorize]
        public IActionResult GetAll()
        {
            var query = _scoreService.GetAll();
            return Ok(query);
        }

		[HttpGet("username/{username}")]
		public ActionResult<GetScoreDto> GetScoreByUsername(string username)
		{
			var scoreDto = _scoreService.GetOneByUsername(username);

			if (scoreDto == null)
			{
				return NotFound(); // Return 404 if the score is not found
			}

			return Ok(scoreDto); // Return 200 with the score data
		}

		[HttpPost]
       // [Authorize]
        public IActionResult Create(GetScoreDto dto)
        {
            var result = _scoreService.Create(dto);
            if (result)
                return Ok();
            else
                return StatusCode(500, "Failed to create user score.");
        }
    }
}
