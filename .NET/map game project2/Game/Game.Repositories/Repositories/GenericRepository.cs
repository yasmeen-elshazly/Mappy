using Game.Context.Context;
using Game.Repositories.Contract;
using Microsoft.EntityFrameworkCore;

namespace Game.Repositories.Repository
{

    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        GameDbContext gameDbContext;
        DbSet<T> dbset;
        public GenericRepository(GameDbContext _gameDbContext)
        {
            gameDbContext = _gameDbContext;
            dbset = gameDbContext.Set<T>();
        }
        public IQueryable<T> GetAll()
        {
            return dbset;
        }
        public IQueryable<T> GetOne(int id)
        {
            return dbset;
        }
        public void Create(T Entity)
        {
            dbset.Add(Entity);
            gameDbContext.SaveChanges();

        }
        public void Update(T Entity)
        {
            dbset.Update(Entity);
            gameDbContext.SaveChanges();

        }
        public void Delete(T Entity)
        {
            dbset.Remove(Entity);
            gameDbContext.SaveChanges();

        }

    }

}
