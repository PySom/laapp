using LAAPI.Models.Conform;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LAAPI.Models
{
    public class Donor : IModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime DateDonated { get; set; }
        public double Amount { get; set; }

        [ForeignKey("DonationId")]
        public Donation Donation { get; set; }
        public int DonationId { get; set; }

        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }
        public string UserId { get; set; }

        public override string ToString()
        {
            return Id.ToString();
        }
    }
}