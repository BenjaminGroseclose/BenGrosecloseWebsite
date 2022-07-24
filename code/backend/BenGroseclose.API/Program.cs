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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
{
    builder
        //.WithOrigins("http://localhost:3000")

        .SetIsOriginAllowed(hostName => true)
        .AllowAnyHeader()
        .AllowAnyMethod()
        //.AllowAnyOrigin()
        .AllowCredentials();
});

app.UseHttpsRedirection();

app.MapControllers();
app.UseRouting();

app.UseAuthorization();

app.MapHub<ChessHub>("/hubs/chess");

app.Run();
