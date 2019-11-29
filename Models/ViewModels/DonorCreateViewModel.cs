namespace LAAPI.Models.ViewModels
{
    public class DonorCreateViewModel
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public int DonationId { get; set; }
        public string UserId { get; set; }
    }
}