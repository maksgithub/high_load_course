FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source

COPY console/. .
# RUN dotnet restore --use-current-runtime  
RUN dotnet build console.csproj
ENTRYPOINT ["dotnet", "run"]
