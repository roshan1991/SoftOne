using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Task_Management_Application_API.DB
{
    public class User
    {
        [Key]
        public required string UserName { get; set; }
        [Key]
        public required string Password { get; set; }

        public string? Name { get; set; }
    }
}
