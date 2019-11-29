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
    public class DonationsController : ControllerBase
    {
        private readonly IModelManager<Donation> _repo;
        public DonationsController(IModelManager<Donation> repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async ValueTask<IActionResult> Get()
        {
            ICollection<Donation> model = await _repo
                                                    .Item()
                                                    .ToListAsync();
            return Ok(model);
        }

        [HttpGet("{id:int}")]
        public async ValueTask<IActionResult> Get(int id)
        {
            Donation donation = await _repo
                                    .Item()
                                    .Where(o => o.Id == id)
                                    .FirstOrDefaultAsync();
            if (donation != null)
            {
                return Ok(donation);
            }
            return NotFound(new { Message = "Donation not found" });
        }

        [HttpPost]
        public async ValueTask<IActionResult> Post([FromBody] Donation model)
        {
            if (ModelState.IsValid)
            {
                (bool succeeded, Donation addedDonation, string error) = await _repo.Add(model);
                if (succeeded) return Ok(addedDonation);
                return BadRequest(new { Message = error });
            }
            return BadRequest(new { Errors = ModelState.Values.SelectMany(e => e.Errors).ToList() });
        }

        [HttpPut]
        public async ValueTask<IActionResult> Put([FromBody] Donation model)
        {
            if (ModelState.IsValid)
            {
                if (model.Id != 0)
                {
                    (bool succeeded, Donation updatedDonation, string error) = await _repo.Update(model, model.Id);
                    if (succeeded) return Ok(updatedDonation);
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