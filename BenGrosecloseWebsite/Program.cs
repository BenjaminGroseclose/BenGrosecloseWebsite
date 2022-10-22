using BenGrosecloseWebsite.API;
using BenGrosecloseWebsite.Hubs;
using Refit;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// APIs
builder.Services.AddRefitClient<ISportsDataAPI>()
    .ConfigureHttpClient(x => x.BaseAddress = new Uri("https://api.sportsdata.io/v3"))
    .AddHttpMessageHandler(() => new AppendAPIKeyHandler("3856c8fd884e47de9dca01a8427bf3b1"));
// TODO: Remove Key and pull from Env var instead

// Hubs
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.MapControllers();
app.UseRouting();

app.MapHub<ChessHub>("/hubs/chess");

app.MapFallbackToFile("index.html"); ;

app.Run();
