using Microsoft.AspNetCore.Mvc;

namespace BenGroseclose.API.Controllers
{
    [Route("api/[controller]")]
    public class HealthController : Controller
    {
        public HealthController() { }

        [HttpGet]
        public IActionResult Health()
        {
            return this.Ok("Healthy 111");
        }
    }
}