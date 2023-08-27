# syntax=docker/dockerfile:1.4
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
# Restore Dependencies as a separate layer so that dotnet restore
# will run only if solution/projects change
COPY RadarVoluntario.sln .
COPY RadarVoluntario.API/RadarVoluntario.API.csproj RadarVoluntario.API/
RUN --mount=type=cache,target=/root/.nuget/packages \
    dotnet restore RadarVoluntario.sln

#######################################
### Base image                      ###
### (shared between prod and debug) ###
#######################################
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS='http://+:8080'
CMD ["dotnet", "RadarVoluntario.API.dll"]
#######################################
### Production image                ###
#######################################
FROM build AS publish-release
COPY RadarVoluntario.API/ RadarVoluntario.API/
RUN --mount=type=cache,target=/root/.nuget/packages \
    dotnet publish --no-restore -c Release -o /out/release
FROM base AS release
ENV ASPNETCORE_ENVIRONMENT='Production'
COPY --from=publish-release /out/release .

#######################################
### Debug image                     ###
#######################################
FROM build AS publish-debug
COPY RadarVoluntario.API/ RadarVoluntario.API/
RUN --mount=type=cache,target=/root/.nuget/packages \
    dotnet publish --no-restore -c Debug -o /out/debug
FROM base AS debug
# Install basic debugging utilities
RUN apt-get update && \
    apt-get install -y procps && \
    rm -rf /var/lib/apt/lists/*
COPY --from=publish-debug /out/debug .
ENV ASPNETCORE_ENVIRONMENT='Development' \
    Logging__Console__FormatterName=Simple