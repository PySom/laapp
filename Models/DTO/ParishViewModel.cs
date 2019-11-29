using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LAAPI.Models.DTO
{
    public class ParishViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string MapUrl { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string ParishPriest { get; set; }
        public int TotalPriests { get; set; }
        public int DeaneryId { get; set; }

    }
}
