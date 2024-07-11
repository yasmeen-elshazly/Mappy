using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Game.Models
{
    public class UsersScores
    {
        [Key]
        public int Id { get; set; }
        public int MaxScore { get; set; }
        public int LastScore { get; set; }
        public int NumOfAttempt { get; set; }
        public DateTime Time { get; set; }
        public string Status { get; set; }

        // Foreign key for User
        public string UserId { get; set; }

        // Foreign key for Games
        public int? GamesId { get; set; }

        // Navigation properties
        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("GamesId")]
        public Games Games { get; set; }
    }
}
