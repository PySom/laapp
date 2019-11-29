using System.ComponentModel.DataAnnotations;

namespace LAAPI.Models.ViewModels
{
    public class FileEditViewModel : FileViewModel
    {
        [Required]
        public string OldImage { get; set; }
    }
}
