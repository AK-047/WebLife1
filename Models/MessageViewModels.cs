using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebLife.Models
{
    public class AllUsersViewModel
    {
        public class User
        {
            public string Name { get; set; }
            public string Id { get; set; }
        }

        public List<User> Users { get; set; }
    }
}