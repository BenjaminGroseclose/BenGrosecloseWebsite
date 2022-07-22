FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build

#Backend
WORKDIR /Backend
COPY BenGroseclose.API/BenGroseclose.API.csproj .
RUN dotnet restore

COPY BenGroseclose.API/ .
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /Backend/out .
ENTRYPOINT ["dotnet", "BenGroseclose.API.dll"]

EXPOSE 5000