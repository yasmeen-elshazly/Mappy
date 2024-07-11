using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game.Dtos
{
    public class GetScoreDto
    {
        public int LastScore { get; set; }
        public int NumOfAttempt { get; set; }
        public DateTime Time { get; set; }
        public string Status { get; set; }
    }
}
