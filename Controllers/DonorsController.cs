using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LAAPI.Models;
using LAAPI.Models.DTO;
using LAAPI.Models.ViewModels;
using LAAPI.Repositories.Extensions;
using LAAPI.Repositories.Generics.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LAAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorsController : ControllerBase
    {
        private readonly IModelManager<Donor> _repo;
        private readonly IMapper _mapper;
        public DonorsController(IModelManager<Donor> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async ValueTask<IActionResult> Get()
        {
            ICollection<DonorViewModel> model = await _repo
                                                .Item()
                                                .Include(c => c.User)
                                                .Include(c => c.Donation)
                                                .Select(c => c.Convert<Donor, DonorViewModel>(_mapper))
                                                .ToListAsync();
            return Ok(model);
        }

        [HttpGet("{id:int}")]
        public async ValueTask<IActionResult> Get(int id)
        {
            Donor donor = await _repo
                                    .Item()
                                    .Include(c => c.User)
                                    .Include(c => c.Donation)
                                    .Where(c => c.Id == id)
                                    .FirstOrDefaultAsync();
            if (donor != null)
            {
                return Ok(donor.Convert<Donor, DonorViewModel>(_mapper));
            }
            return NotFound(new { Message = "Donor not found" });
        }

        [HttpPost]
        public async ValueTask<IActionResult> Post([FromBody] DonorCreateViewModel model)
        {
            if (ModelState.IsValid)
            {
                Donor donor = model.Convert<DonorCreateViewModel, Donor>(_mapper);
                donor.DateDonated = DateTime.Now;
                (bool succeeded, Donor addedDonor, string error) = await _repo.Add(donor);
                if (succeeded) return Ok(addedDonor);
                return BadRequest(new { Message = error });
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }

        [HttpPut]
        public async ValueTask<IActionResult> Put([FromBody] Donor model)
        {
            if (ModelState.IsValid)
            {
                if (model.Id != 0)
                {
                    (bool succeeded, Donor updatedDonor, string error) = await _repo.Update(model, model.Id);
                    if (succeeded) return Ok(updatedDonor);
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