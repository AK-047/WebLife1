using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using WebLife.Models;

namespace WebLife.DAL
{
    public class DataManager : IDisposable
    {
        public DataManager()
        {
            _context = new ApplicationDbContext();
        }

        private readonly ApplicationDbContext _context;

        public ApplicationUser GetUser(Func<ApplicationUser, bool> predicate)
        {

            return _context.Users.SingleOrDefault(predicate);
        }

        public void ModifyUser(ApplicationUser user)
        {
            ApplicationUser oldUser = GetUser(u => u.Id == user.Id);
            oldUser.ConfirmationToken = user.ConfirmationToken;
            oldUser.IsConfirmed = user.IsConfirmed;
            oldUser.Email = user.Email;
            DbSet<ApplicationUser> dbSet = _context.Set<ApplicationUser>();
            dbSet.Attach(oldUser);
            _context.Entry(oldUser).State = EntityState.Modified;
            _context.SaveChanges();

        }

        public string GetTheme(string id)
        {

            return id == null ? null : GetUser(u => u.Id == id).Theme;
        }

        public IQueryable<ApplicationUser> GetUsers()
        {
            return _context.Set<ApplicationUser>();
        }

        public void RemoveUser(string id)
        {
            _context.Users.Remove(_context.Users.Single(u => u.Id == id));
            _context.SaveChanges();
        }

        public void SaveConfig(string name,int cellSize, int min, int max, int spawn, int[][] grid, string userId)
        {
            var configDbSet = _context.Set<Config>();
            var config = new Config
            {
                Name = name,
                CellSize = cellSize,
                Min = min,
                Max = max,
                Spawn = spawn,
                ConfigId = Guid.NewGuid().ToString(),
                UiserId = userId
            };
            configDbSet.Attach(config);
            _context.Entry(config).State = EntityState.Added;
            _context.SaveChanges();


            for (int i = 0; i < grid.Length; i++)
            {
                for (int j = 0; j < grid[i].Length; j++)
                {
                    if (grid[i][j] != 0)
                    {
                        var cellDbSet = _context.Set<Cell>();
                        var cell = new Cell
                        {
                            ConfigId = config.ConfigId,
                            Id = Guid.NewGuid().ToString(),
                            X = i,
                            Y = j
                        };
                        cellDbSet.Attach(cell);
                        _context.Entry(cell).State = EntityState.Added;
                        _context.SaveChanges();

                    }
                }
            }
        }

        public List<Config> GetConfigs()
        {
            return _context.Set<Config>().ToList();
        }

        public Config GetConfig(string id)
        {
            return _context.Set<Config>().SingleOrDefault(c => c.ConfigId == id);
        }

        public Cell[] GetCells(string configId)
        {
            return _context.Set<Cell>().Where(c => c.ConfigId == configId).ToArray();
        }

        public void Dispose()
        {
            ((IDisposable) _context).Dispose();
        }
        
        
        
    }
}