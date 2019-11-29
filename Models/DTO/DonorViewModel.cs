using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LAAPI.Models.DTO
{
    public class DonorViewModel
    {
        public int Id { get; set; }
        public DateTime DateDonated { get; set; }
        public double Amount { get; set; }
        public UserViewModel User { get; set; }
        public Donation Donation { get; set; }
    }
}
