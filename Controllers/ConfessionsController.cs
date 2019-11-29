using System;
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
    public class ConfessionsController : ControllerBase
    {
        private readonly IModelManager<Confession> _repo;
        private readonly IMapper _mapper;
        public ConfessionsController(IModelManager<Confession> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async ValueTask<IActionResult> Get()
        {
            ICollection<ConfessionViewModel> model = await _repo
                                                   .Item()
                                                   .Select(c => c.Convert<Confession, ConfessionViewModel>(_mapper))
                                                   .ToListAsync();
            return Ok(model);
        }

        [HttpGet("{id:int}")]
        public async ValueTask<IActionResult> Get(int id)
        {
            Confession confession = await _repo
                                        .Item()
                                        .Include(c => c.Parish)
                                        .Where(c => c.Id == id)
                                        .FirstOrDefaultAsync();
            if (confession != null)
            {
                return Ok(confession.Convert<Confession, ConfessionInfoViewModel>(_mapper));
            }
            return NotFound(new { Message = "Occasion not found" });
        }

        [HttpPost]
        public async ValueTask<IActionResult> Post([FromBody] ConfessionViewModel model)
        {
            if (ModelState.IsValid)
            {
                Confession confession = model.Convert<ConfessionViewModel, Confession>(_mapper);
                (bool succeeded, Confession addedConfession, string error) = await _repo.Add(confession);
                if (succeeded) return Ok(addedConfession);
                return BadRequest(new { Message = error });
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }

        [HttpPut]
        public async ValueTask<IActionResult> Put([FromBody] ConfessionViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (model.Id != 0)
                {
                    Confession confession = model.Convert<ConfessionViewModel, Confession>(_mapper);
                    (bool succeeded, Confession updatedConfession, string error) = await _repo.Update(confession, model.Id);
                    if (succeeded) return Ok(updatedConfession);
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