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
    public class ParishesController : ControllerBase
    {
        private readonly IModelManager<Parish> _repo;
        private readonly IMapper _mapper;
        public ParishesController(IModelManager<Parish> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async ValueTask<IActionResult> Get()
        {
            ICollection<ParishViewModel> model = await _repo
                                                .Item()
                                                .Select(c => c.Convert<Parish, ParishViewModel>(_mapper))
                                                .ToListAsync();
            return Ok(model);
        }

        [HttpGet("{id:int}")]
        public async ValueTask<IActionResult> Get(int id)
        {
            ParishInfoViewModel parish = await _repo
                                    .Item()
                                    .Where(c => c.Id == id)
                                    .Include(c => c.Deanery)
                                    .Include(c => c.Confessions)
                                    .Include(c => c.Masses)
                                    .Select(c => c.Convert<Parish, ParishInfoViewModel>(_mapper))
                                    .FirstOrDefaultAsync();
            if (parish != null)
            {
                return Ok(parish);
            }
            return NotFound(new { Message = "Parish not found" });
        }

        [HttpPost]
        public async ValueTask<IActionResult> Post([FromBody] ParishViewModel model)
        {
            if (ModelState.IsValid)
            {
                Parish parish = model.Convert<ParishViewModel, Parish>(_mapper);
                (bool succeeded, Parish addedParish, string error) = await _repo.Add(parish);
                if (succeeded) return await Get(addedParish.Id);
                return BadRequest(new { Message = error });
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }

        [HttpPut]
        public async ValueTask<IActionResult> Put([FromBody] ParishViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (model.Id != 0)
                {
                    Parish parish = model.Convert<ParishViewModel, Parish>(_mapper);
                    (bool succeeded, Parish updatedParish, string error) = await _repo.Update(parish, model.Id);
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