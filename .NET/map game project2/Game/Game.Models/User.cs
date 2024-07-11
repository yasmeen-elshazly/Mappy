using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game.Models
{
    public class User : IdentityUser
    {
        public List<UsersScores> UsersScores { get; set; }

    }
}
