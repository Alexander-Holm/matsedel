using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{    
    [Route("api/[controller]")]
    [ApiController]
    public class WeeksController : ControllerBase
    {
        private readonly DataContext _context;

        public WeeksController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Weeks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Week>>> GetWeek()
        {
            return await _context.Week.Include(w => w.Recipes).ToListAsync();
        }

        // GET: api/Weeks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Week>> GetWeek(int id)
        {
            var week = await _context.Week.Include(w => w.Recipes).FirstOrDefaultAsync(w => w.Id == id);

            if (week == null)
            {
                return NotFound();
            }

            return week;
        }

        // PUT: api/Weeks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [ApiKeyAuthentication]
        public async Task<IActionResult> PutWeek(int id, Week week)
        {
            if (id != week.Id)
            {
                return BadRequest();
            }

            _context.Entry(week).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WeekExists(id))
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

        // POST: api/Weeks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [ApiKeyAuthentication]
        public async Task<ActionResult<Week>> PostWeek([FromBody]string name)
        {
            Week week = new Week(name);
            _context.Week.Add(week);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWeek", new { id = week.Id }, week);
        }

        // DELETE: api/Weeks/5
        // OBS: tar också bort alla recipe kopplade till week som tas bort!
        [HttpDelete("{id}")]
        [ApiKeyAuthentication]
        public async Task<IActionResult> DeleteWeek(int id)
        {
            var week = await _context.Week.FindAsync(id);
            if (week == null)
            {
                return NotFound();
            }

            _context.Week.Remove(week);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WeekExists(int id)
        {
            return _context.Week.Any(e => e.Id == id);
        }
    }
}
