using Api.Domain.UserModel;
using Api.Infrastructure;
using Api.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder( args );

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

const string allowSpecificOrigins = "_allowSpecificOrigins";
builder.Services.AddCors( options =>
{
    options.AddPolicy( name: allowSpecificOrigins,
        policy =>
        {
            policy
                .WithOrigins( "http://localhost:5173" )
                .WithExposedHeaders( "Date", "Server", "Transfer-Encoding" )
                .AllowAnyMethod()
                .AllowAnyHeader();
        } );
} );

builder.Services.AddDbContext<DataContext>();
builder.Services.AddControllers();
builder.Services.AddScoped<IUsersRepository, UsersRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if ( app.Environment.IsDevelopment() )
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors( allowSpecificOrigins );

app.UseHttpsRedirection();

app.MapControllers();

app.UseCors( allowSpecificOrigins );

app.Run();
