using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Security;
using Microsoft.Ajax.Utilities;
using WebLife.Models;

namespace WebLife.DAL
{
    public class DataManager
    {
        public DataManager()
        {
            context = new ApplicationDbContext();
        }

        private ApplicationDbContext context;

        public ApplicationUser GetUser(Func<ApplicationUser,bool> predicate)
        {
            return context.Users.SingleOrDefault(predicate);
        }

        public void ModifyUser(ApplicationUser user)
        {
            ApplicationUser oldUser = GetUser(u => u.Id == user.Id);
            oldUser.ConfirmationToken = user.ConfirmationToken;
            oldUser.IsConfirmed = user.IsConfirmed;
            oldUser.Email = user.Email;
            DbSet<ApplicationUser> dbSet = context.Set<ApplicationUser>();
            dbSet.Attach(oldUser);
            context.Entry(oldUser).State = EntityState.Modified;
            context.SaveChanges();

        }

        public string GetTheme(string id)
        {
            
            return id == null ? null : GetUser(u => u.Id == id).Theme;
        }

        public IQueryable<ApplicationUser> GetUsers()
        {
            return context.Set<ApplicationUser>();
        }

        public void RemoveUser(string id)
        {
            context.Users.Remove(context.Users.Single(u => u.Id == id));
            context.SaveChanges();
        }
    }
}