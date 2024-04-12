using CountryJQueryAjax.Data;
using CountryJQueryAjax.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CountryJQueryAjax.Controllers
{
    public class CountryController : Controller
    {
        private readonly ApplicationDbContext _context;
        public CountryController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<ActionResult> CountryList()
        {
            List<CountryInfo> ItemCountryList = await _context.Countries.ToListAsync();
            return Ok(ItemCountryList);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            CountryInfo item = await _context.Countries.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Countries.Remove(item);

            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost, ActionName("Create")]
        public async Task<IActionResult> CreatePost(CountryInfo obj)
        {
            _context.Countries.Add(obj);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var item = await _context.Countries.FindAsync(id);
            return View(item);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(CountryInfo obj)
        {
            _context.Countries.Update(obj);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }
    }
}
