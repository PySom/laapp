using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LAAPI.Models;
using LAAPI.Repositories.Generics.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LAAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly IModelManager<News> _repo;
        public NewsController(IModelManager<News> repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async ValueTask<IActionResult> Get()
        {
            ICollection<News> model = await _repo
                                                .Item()
                                                .ToListAsync();
            return Ok(model);
        }

        [HttpGet("{id:int}")]
        public async ValueTask<IActionResult> Get(int id)
        {
            News news = await _repo
                                  .Item()
                                  .Where(o => o.Id == id)
                                  .FirstOrDefaultAsync();
            if (news != null)
            {
                return Ok(news);
            }
            return NotFound(new { Message = "News not found" });
        }

        [HttpPost]
        public async ValueTask<IActionResult> Post([FromBody] News model)
        {
            if (ModelState.IsValid)
            {
                model.DatePosted = DateTime.Now;
                (bool succeeded, News addedNews, string error) = await _repo.Add(model);
                if (succeeded) return Ok(addedNews);
                return BadRequest(new { Message = error });
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }

        [HttpPut]
        public async ValueTask<IActionResult> Put([FromBody] News model)
        {
            if (ModelState.IsValid)
            {
                if (model.Id != 0)
                {
                    (bool succeeded, News updatedNews, string error) = await _repo.Update(model, model.Id);
                    if (succeeded) return Ok(updatedNews);
                    return NotFound(new { Message = error });
                }
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }
        [HttpDelete("{id}")]
        public async ValueTask<IActionResult> Delete(int id)
        {
            (bool succeeded, string error) = await _repo.Delete(id);
            if (succeeded) return NoContent();
            return NotFound(new { Message = error });
        }
    }
}