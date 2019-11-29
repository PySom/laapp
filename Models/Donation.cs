using LAAPI.Models.Conform;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LAAPI.Models
{
    public class Donation : IModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Image { get; set; }
        public string Video { get; set; }

        public override string ToString()
        {
            return Id.ToString();
        }
    }
}