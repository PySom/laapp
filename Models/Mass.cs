using LAAPI.Models.Conform;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LAAPI.Models
{
    public class Mass : IModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DayOfWeek Day { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }

        [ForeignKey("ParishId")]
        public Parish Parish { get; set; }
        public int ParishId { get; set; }
        public override string ToString()
        {
            return Id.ToString();
        }
    }
}