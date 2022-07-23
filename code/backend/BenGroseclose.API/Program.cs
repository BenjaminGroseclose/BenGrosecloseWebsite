using BenGroseclose.API.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Services

// Hubs
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ClientPermission", policy =>
    {
        policy
            .AllowAnyOrigin()
            //.WithOrigins("http://localhost:3000", "http://localhost:80", "https://bengroseclose.com", "https://bengroseclose-website-frontend.salmonwater-d1a7f0b1.eastus.azurecontainerapps.io/")
            .AllowAnyHeader()
            .AllowAnyMethod()
            //.AllowAnyOrigin() // TODO: Remove this
            .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("ClientPermission");

app.MapControllers();
app.MapHub<ChessHub>("/hubs/chess");

app.Run();
