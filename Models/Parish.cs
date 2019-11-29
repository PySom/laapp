using LAAPI.Models.Conform;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LAAPI.Models
{
    public class Parish : IModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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

        [ForeignKey("DeaneryId")]
        public Deanery Deanery { get; set; }
        public int DeaneryId { get; set; }

        public ICollection<Mass> Masses { get; set; }
        public ICollection<Confession> Confessions { get; set; }
        public override string ToString()
        {
            return Id.ToString();
        }
    }
}