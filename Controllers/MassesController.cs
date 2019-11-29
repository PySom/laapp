using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LAAPI.Models;
using LAAPI.Models.DTO;
using LAAPI.Repositories.Extensions;
using LAAPI.Repositories.Generics.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LAAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MassesController : ControllerBase
    {
        private readonly IModelManager<Mass> _repo;
        private readonly IMapper _mapper;
        public MassesController(IModelManager<Mass> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async ValueTask<IActionResult> Get()
        {
            ICollection<MassViewModel> model = await _repo
                                                   .Item()
                                                   .Select(c => c.Convert<Mass, MassViewModel>(_mapper))
                                                   .ToListAsync();
            return Ok(model);
        }

        [HttpGet("{id:int}")]
        public async ValueTask<IActionResult> Get(int id)
        {
            Mass mass = await _repo
                                        .Item()
                                        .Include(c => c.Parish)
                                        .Where(c => c.Id == id)
                                        .FirstOrDefaultAsync();
            if (mass != null)
            {
                return Ok(mass.Convert<Mass, MassInfoViewModel>(_mapper));
            }
            return NotFound(new { Message = "Occasion not found" });
        }

        [HttpPost]
        public async ValueTask<IActionResult> Post([FromBody] MassViewModel model)
        {
            if (ModelState.IsValid)
            {
                Mass mass = model.Convert<MassViewModel, Mass>(_mapper);
                (bool succeeded, Mass addedMass, string error) = await _repo.Add(mass);
                if (succeeded) return Ok(addedMass);
                return BadRequest(new { Message = error });
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }

        [HttpPut]
        public async ValueTask<IActionResult> Put([FromBody] MassViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (model.Id != 0)
                {
                    Mass mass = model.Convert<MassViewModel, Mass>(_mapper);
                    (bool succeeded, Mass updatedMass, string error) = await _repo.Update(mass, model.Id);
                    if (succeeded) return Ok(updatedMass);
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