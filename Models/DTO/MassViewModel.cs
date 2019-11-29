using System;
namespace LAAPI.Models.DTO
{
    public class MassViewModel
    {
        public int Id { get; set; }
        public DayOfWeek Day { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int ParishId { get; set; }
    }
}
