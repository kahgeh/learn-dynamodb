#!/usr/bin/env pwsh
param(
    $usersUrl = 'https://updateme.com/api/users'
)

Invoke-WebRequest -Method PUT "$usersUrl/007" -Body (@{FullName='James Bond'}|ConvertTo-Json)

Invoke-WebRequest $usersUrl

Invoke-WebRequest -Method DELETE "$usersUrl/007"

Invoke-WebRequest "$usersUrl/007"

