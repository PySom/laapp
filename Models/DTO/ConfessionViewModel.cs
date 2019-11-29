using System;

namespace LAAPI.Models.DTO
{
    public class ConfessionViewModel
    {
        public int Id { get; set; }
        public DayOfWeek Day { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int ParishId { get; set; }
    }
}
