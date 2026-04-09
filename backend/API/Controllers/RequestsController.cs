using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        private readonly IRequestRepository _repo;

        public RequestsController(IRequestRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Request request)
        {
            var id = await _repo.CreateAsync(request);
            return Ok(id);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string category, [FromQuery] string priority)
        {
            return Ok(await _repo.GetAllAsync(category, priority));
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _repo.GetAllAsync());
        }

        [HttpGet("user/{username}")]
        public async Task<IActionResult> GetByUser(string username)
        {
            return Ok(await _repo.GetByUserAsync(username));
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
        {
            await _repo.UpdateStatusAsync(id, status);
            return Ok(new { message = "Status updated successfully" });
        }
    }
}
