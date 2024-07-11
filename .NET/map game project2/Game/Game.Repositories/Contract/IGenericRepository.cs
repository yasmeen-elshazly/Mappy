using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Game.Repositories.Contract
{

    public interface IGenericRepository<T>
    {
        IQueryable<T> GetAll();
        IQueryable<T> GetOne(int id );
        void Update(T Entity);
        void Create(T Entity);
        void Delete(T Entity);
    }

}
