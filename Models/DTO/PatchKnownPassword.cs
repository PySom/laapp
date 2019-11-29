using System.ComponentModel.DataAnnotations;

namespace LAAPI.Models.DTO
{
    public class PatchKnownPassword
    {
        public string Id { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string OldPassword { get; set; }
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }
    }
}
