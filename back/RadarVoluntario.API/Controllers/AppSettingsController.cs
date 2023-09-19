using Microsoft.AspNetCore.Mvc;
using RadarVoluntario.Domain.Helpers;

namespace RadarVoluntario.API.Controllers
{
    public class AppSettingsController : ControllerBase
    {
        public AppSettingsController() { }

        [HttpGet]
        [Route("/appsettings")]
        public IActionResult Get()
        {
            return Ok(new PublicAppSettings());
        }
    }
}
