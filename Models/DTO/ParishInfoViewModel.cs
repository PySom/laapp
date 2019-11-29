using System.Collections.Generic;

namespace LAAPI.Models.DTO
{
    public class ParishInfoViewModel : ParishViewModel
    {
        public DeaneryViewModel Deanery { get; set; }
        public ICollection<MassViewModel> Masses { get; set; }
        public ICollection<ConfessionViewModel> Confessions { get; set; }
    }
}
