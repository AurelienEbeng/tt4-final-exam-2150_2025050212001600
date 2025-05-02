namespace backend.Controllers {
    using System.Threading.Tasks;
    using backend.Data;
    using backend.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [ApiController]
    [Route("")]
    public class BugController: ControllerBase{
        private ApplicationDBContext _context { get; }
        
        public BugController(ApplicationDBContext context){
            _context = context;
        }

        
        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<Bug>>> GetTasks()
        {
            return await _context.Bugs.ToListAsync();
        }


        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Bug model)
        {
            var bug = new Bug{
                Title=model.Title,
                Priority = model.Priority,
                Description=model.Description
            };

            await _context.Bugs.AddAsync(bug);
            await _context.SaveChangesAsync();
            return Ok(new {message = "Bug registered successfully"});
            
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(Bug updatedBug)
        {
            var bug = _context.Bugs.Where(b => b.ID == updatedBug.ID).FirstOrDefault();
            await _context.SaveChangesAsync();
            return Ok(new {message = "Bug updated successfully"});
            
        }

         [HttpDelete("delete")]
        public async Task<IActionResult> Delete(int bugId){
            await _context.Bugs.Where(b => b.ID == bugId).ExecuteDeleteAsync();
            return Ok(new {message = "Bug deleted successfully"});
        }

    }
}