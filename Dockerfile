FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build

RUN apk add --update nodejs npm

RUN node --version

#Frontend Build
# COPY BenGrosecloseWebsite/ClientApp/package.json BenGrosecloseWebsite/ClientApp/package-lock.json ./
# RUN npm install

# COPY ./BenGrosecloseWebsite/ClientApp/ . 

#Backend Build
WORKDIR /Backend
COPY BenGrosecloseWebsite/BenGrosecloseWebsite.csproj .
RUN dotnet restore

COPY BenGrosecloseWebsite/ .
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /Backend/out .
ENTRYPOINT ["dotnet", "BenGrosecloseWebsite.dll"]

EXPOSE 80