using System.Collections.Generic;

namespace LAAPI.Models.DTO
{
    public class DeaneryInfoViewModel : DeaneryViewModel
    {
        public ICollection<ParishInfoViewModel> Parishes { get; set; }
    }
}
