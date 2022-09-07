FROM ubuntu:latest
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update \
    && apt-get --no-install-recommends -y install \
    siege \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists 

WORKDIR /source

COPY console/. .
RUN dotnet build console.csproj

ENTRYPOINT ["dotnet", "run"]
