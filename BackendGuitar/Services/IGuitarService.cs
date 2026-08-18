using BackendGuitar.Models;

namespace BackendGuitar.Services
{
    public interface IGuitarService
    {
        Task<IEnumerable<Guitar>> GetAllAsync();
    }
}
