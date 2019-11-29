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
    public class ReflectionsController : ControllerBase
    {
        private readonly IModelManager<Reflection> _repo;
        public ReflectionsController(IModelManager<Reflection> repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async ValueTask<IActionResult> Get()
        {
            ICollection<Reflection> model = await _repo
                                                   .Item()
                                                   .ToListAsync();
            return Ok(model);
        }

        [HttpGet("{id:int}")]
        public async ValueTask<IActionResult> Get(int id)
        {
            Reflection reflection = await _repo
                                        .Item()
                                        .Where(o => o.Id == id)
                                        .FirstOrDefaultAsync();
            if (reflection != null)
            {
                return Ok(reflection);
            }
            return NotFound(new { Message = "Occasion not found" });
        }

        [HttpPost]
        public async ValueTask<IActionResult> Post([FromBody] Reflection model)
        {
            if (ModelState.IsValid)
            {
                (bool succeeded, Reflection addedReflection, string error) = await _repo.Add(model);
                if (succeeded) return Ok(addedReflection);
                return BadRequest(new { Message = error });
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }

        [HttpPut]
        public async ValueTask<IActionResult> Put([FromBody] Reflection model)
        {
            if (ModelState.IsValid)
            {
                if (model.Id != 0)
                {
                    (bool succeeded, Reflection updatedReflection, string error) = await _repo.Update(model, model.Id);
                    if (succeeded) return Ok(updatedReflection);
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