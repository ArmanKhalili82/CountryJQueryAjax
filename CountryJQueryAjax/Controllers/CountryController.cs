using CountryJQueryAjax.Data;
using CountryJQueryAjax.Models;
using Microsoft.AspNetCore.Mvc;

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
        public JsonResult CountryList()
        {
            List<CountryInfo> ItemCountryList = _context.Countries.ToList();
            return new JsonResult(ItemCountryList);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            CountryInfo item = _context.Countries.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            _context.Countries.Remove(item);
            return RedirectToAction("Index");
        }
    }
}
