using Game.Dtos;
using Game.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    //[Authorize]
    public IActionResult GetAll()
    {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        if (identity != null)
        {
            IEnumerable<Claim> claims = identity.Claims;
            // Log claims
            foreach (var claim in claims)
            {
                Console.WriteLine($"Claim: {claim.Type} Value: {claim.Value}");
            }
        }

        var query = _userService.GetAll();
        return Ok(query);
    }

	//[HttpGet("{Id}")]
	//[Authorize]
	//public IActionResult GetOne(string Id)
	// {
	//   var query = _userService.GetOne(Id);
	//  return Ok(query);
	//}

	[HttpGet("username/{username}")]
	public IActionResult GetOne(string username)
	{
		var query = _userService.GetOne(username);
		if (query == null)
		{
			return NotFound(); // Return 404 if the score is not found
		}

		return Ok(query); // Return 200 with the score data
	}

	[HttpPost]
    //[Authorize]
    public IActionResult Create(GetUserDto dto)
    {
        var result = _userService.Create(dto);
        if (result)
            return Ok();
        else
            return StatusCode(500, "Failed to create user score.");
    }

    [HttpPut("{id}")]
    //[Authorize]
    public IActionResult Update(string id, GetUserDto dto)
    {
        var result = _userService.Update(id, dto);
        if (result)
            return Ok();
        else
            return StatusCode(500, "Failed to update user.");
    }
}
