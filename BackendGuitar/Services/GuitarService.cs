using BackendGuitar.Models;

namespace BackendGuitar.Services
{
    public class GuitarService : IGuitarService
    {
        public Task<IEnumerable<Guitar>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}
