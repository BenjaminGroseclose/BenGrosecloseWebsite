using Microsoft.AspNetCore.Mvc;

namespace BenGrosecloseWebsite.Controllers
{
    [Route("api/[controller]")]
    public class HealthController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Healthy");
        }
    }
}
