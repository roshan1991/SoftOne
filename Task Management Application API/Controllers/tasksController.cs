using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Task_Management_Application_API.DB;
using OpenIddict.Validation;
using System.Globalization;
namespace Task_Management_Application_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class tasksController : ControllerBase
    {
        private readonly AppliccationDbContext _context;

        

        public tasksController(AppliccationDbContext context)
        {
            _context = context;
        }

        // GET: api/tasks
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<task>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        // GET: api/tasks/{id}
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<task>> Gettask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // PUT: api/tasks/{id}
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Puttask(int id, task task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!taskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/tasks
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<task>> Posttask(task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Gettask", new { id = task.Id }, task);
        }

        // DELETE: api/tasks/{id}
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletetask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool taskExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
