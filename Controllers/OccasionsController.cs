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
    public class OccasionsController : ControllerBase
    {
        private readonly IModelManager<Occasion> _repo;
        public OccasionsController(IModelManager<Occasion> repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async ValueTask<IActionResult> Get()
        {
            ICollection<Occasion> model = await _repo
                                                   .Item()
                                                   .ToListAsync();
            return Ok(model);
        }

        [HttpGet("{id:int}")]
        public async ValueTask<IActionResult> Get(int id)
        {
            Occasion occasion = await _repo
                                        .Item()
                                        .Where(o => o.Id == id)
                                        .FirstOrDefaultAsync();
            if (occasion != null)
            {
                return Ok(occasion);
            }
            return NotFound(new { Message = "Occasion not found" });
        }

        [HttpPost]
        public async ValueTask<IActionResult> Post([FromBody] Occasion model)
        {
            if (ModelState.IsValid)
            {
                model.DatePosted = DateTime.Now;
                (bool succeeded, Occasion addedOccasion, string error) = await _repo.Add(model);
                if (succeeded) return Ok(addedOccasion);
                return BadRequest(new { Message = error });
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }

        [HttpPut]
        public async ValueTask<IActionResult> Put([FromBody] Occasion model)
        {
            if (ModelState.IsValid)
            {
                if (model.Id != 0)
                {
                    (bool succeeded, Occasion updatedOccasion, string error) = await _repo.Update(model, model.Id);
                    if (succeeded) return Ok(updatedOccasion);
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