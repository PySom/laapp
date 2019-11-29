using LAAPI.Models.ViewModels;
using LAAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace LAAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IImageService _img;
        public FilesController(IImageService image)
        {
            _img = image;
        }
        [HttpPost("upload")]
        public IActionResult Post([FromForm]FileViewModel model)
        {
            if(ModelState.IsValid && model.File != null)
            {
                if(_img.Create(model.File, out string path))
                {
                    return Ok(new { Name = path });
                }
                return BadRequest(new { Message = "We could not add this resource. Please try again" });
            }
            return BadRequest(new { Message = "Your data is bad" });
        }

        [HttpPut("edit")]
        public IActionResult Put([FromForm]FileEditViewModel model)
        {
            if (ModelState.IsValid && model.File != null)
            {
                if (_img.Edit(model.File, model.OldImage, out string path))
                {
                    return Ok(new { Name = path });
                }
                return BadRequest(new { Message = "We could not add this resource. Please try again" });
            }
            return BadRequest(new { Message = "Your data is bad" });
        }

        [HttpDelete("delete")]
        public IActionResult Delete([FromBody]FileDeleteViewModel model)
        {
            if (ModelState.IsValid)
            {
                _img.Delete(model.Image);
                return NoContent();
            }
            return BadRequest(new { Message = "you need to supply an image to remove" });
        }
    }
}


