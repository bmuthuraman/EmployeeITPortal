using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Interfaces
{
    public interface IRequestRepository
    {
        Task<int> CreateAsync(Request request);
        Task<IEnumerable<Request>> GetAllAsync();
        Task<IEnumerable<Request>> GetAllAsync(string category, string priority);
        Task<IEnumerable<Request>> GetByUserAsync(string username);
        Task UpdateStatusAsync(int id, string status);
    }
}
