using LAAPI.Models.Conform;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LAAPI.Models
{
    public class News : IModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Brief { get; set; }
        public string Content { get; set; }
        public DateTime DatePosted { get; set; }
        public string Image { get; set; }

        public override string ToString()
        {
            return Id.ToString();
        }
    }
}