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
    public class DeaneriesController : ControllerBase
    {
        private readonly IModelManager<Deanery> _repo;
        private readonly IMapper _mapper;
        public DeaneriesController(IModelManager<Deanery> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async ValueTask<IActionResult> Get()
        {
            ICollection<DeaneryInfoViewModel> model = await _repo
                                                .Item()
                                                .Include(c => c.Parishes)
                                                    .ThenInclude(p => p.Masses)
                                                .Include(c => c.Parishes)
                                                    .ThenInclude(p => p.Masses)
                                                .Include(c => c.Parishes)
                                                    .ThenInclude(p => p.Confessions)
                                                .Select(c => c.Convert<Deanery, DeaneryInfoViewModel>(_mapper))
                                                .ToListAsync();
            return Ok(model);
        }

        [HttpGet("{id:int}")]
        public async ValueTask<IActionResult> Get(int id)
        {
            Deanery deanery = await _repo
                                    .Item()
                                    .Include(c => c.Parishes)
                                        .ThenInclude(p => p.Masses)
                                    .Include(c => c.Parishes)
                                        .ThenInclude(p => p.Masses)
                                    .Include(c => c.Parishes)
                                        .ThenInclude(p => p.Confessions)
                                    .Where(c => c.Id == id)
                                    .FirstOrDefaultAsync();
            if (deanery != null)
            {
                return Ok(deanery.Convert<Deanery, DeaneryInfoViewModel>(_mapper));
            }
            return NotFound(new { Message = "Deanery not found" });
        }

        [HttpPost]
        public async ValueTask<IActionResult> Post([FromBody] DeaneryViewModel model)
        {
            if (ModelState.IsValid)
            {
                Deanery deanery = model.Convert<DeaneryViewModel, Deanery>(_mapper);
                (bool succeeded, Deanery addedDeanery, string error) = await _repo.Add(deanery);
                if (succeeded) return await Get(addedDeanery.Id);
                return BadRequest(new { Message = error });
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }

        [HttpPut]
        public async ValueTask<IActionResult> Put([FromBody] Deanery model)
        {
            if (ModelState.IsValid)
            {
                if (model.Id != 0)
                {
                    (bool succeeded, Deanery updatedDeanery, string error) = await _repo.Update(model, model.Id);
                    if (succeeded) return await Get(model.Id);
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