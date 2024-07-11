﻿using Game.Context.Context;
using Game.Models;
using Game.Repositories.Contract;
using Game.Repositories.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game.Repositories.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        GameDbContext gameDbContext;
        public UserRepository(GameDbContext _gameDbContext) : base(_gameDbContext)
        {
            gameDbContext = _gameDbContext;
        }
    }
}
