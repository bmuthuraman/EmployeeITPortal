using Dapper;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;

namespace Infrastructure.Repositories
{
    public class RequestRepository : IRequestRepository
    {
        private readonly IDbConnectionFactory _factory;

        public RequestRepository(IDbConnectionFactory factory)
        {
            _factory = factory;
        }

        public async Task<int> CreateAsync(Request request)
        {
            using var conn = _factory.CreateConnection();

            var sql = @"INSERT INTO Requests 
                    (Title, Description, Category, Priority, Status, CreatedBy, CreatedAt)
                    VALUES (@Title, @Description, @Category, @Priority, 'Open', @CreatedBy, GETDATE());
                    SELECT CAST(SCOPE_IDENTITY() as int);";

            return await conn.ExecuteScalarAsync<int>(sql, request);
        }

        public async Task<IEnumerable<Request>> GetAllAsync(string category, string priority)
        {
            using var conn = _factory.CreateConnection();

            var sql = "SELECT * FROM Requests WHERE 1=1";

            if (!string.IsNullOrEmpty(category))
                sql += " AND Category = @category";

            if (!string.IsNullOrEmpty(priority))
                sql += " AND Priority = @priority";

            sql += " ORDER BY CreatedAt DESC";

            return await conn.QueryAsync<Request>(sql, new { category, priority });
        }

        public async Task<IEnumerable<Request>> GetAllAsync()
        {
            using var conn = _factory.CreateConnection();

            var sql = "SELECT * FROM Requests";

            return await conn.QueryAsync<Request>(sql);
        }

        public async Task<IEnumerable<Request>> GetByUserAsync(string username)
        {
            using var conn = _factory.CreateConnection();

            return await conn.QueryAsync<Request>(
                "SELECT * FROM Requests WHERE CreatedBy = @username ORDER BY CreatedAt DESC",
                new { username });
        }

        public async Task UpdateStatusAsync(int id, string status)
        {
            using var conn = _factory.CreateConnection();

            await conn.ExecuteAsync(
                "UPDATE Requests SET Status = @status WHERE Id = @id",
                new { id, status });
        }
    }
}
