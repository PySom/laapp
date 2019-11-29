using LAAPI.Models.Conform;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LAAPI.Models
{
    public class Deanery : IModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Other { get; set; }
        public ICollection<Parish> Parishes { get; set; }

        public override string ToString()
        {
            return Id.ToString();
        }
    }
}