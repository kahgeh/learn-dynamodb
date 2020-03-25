#!/usr/bin/env pwsh
param(
    $name = 'UsersFn',
    $certificateArn = 'ignore',
    $domainName = 'ignore.com',
    [switch]$dontBuild,
    [switch]$debug,
    $debugPort = 5858,
    $basePath = $PSScriptRoot
)
function Use-AwsProfile {
    param(
        $profileName = $(Read-Host 'Provide profile name'),
        $shell = 'powershell'
    )
    Set-AWSCredential -StoredCredentials $profileName
    awsweb env --shell $shell $profileName
    $Cmd = (awsweb env --shell $shell $profileName) | Out-String
    if ( $shell -eq 'powershell') {
        Invoke-Expression $Cmd   
    }
}

Use-AwsProfile 
$vars = [PSObject]@{ };
$envVars = [PSObject]@{UsersFn = $vars };
Get-ChildItem env:AWS_* | ForEach-Object {
    $vars = $vars | Add-Member -MemberType NoteProperty -Name $_.Key -Value $_.Value -PassThru }

$envVarsFilePath = "$basePath/envvars.json"
$envVars | ConvertTo-Json -Depth 100 | Out-File $envVarsFilePath

if (-not $dontbuild) {
    $baseFolder = Get-Item $basePath
    npm --prefix "$($baseFolder.Parent.FullName)" run build
}

$sampleRequestFilePath = "$basePath/events/getUsers.json"
$parameterOverrides = "ParameterKey=CertificateArn,ParameterValue=$certificateArn ParameterKey=DomainName,ParameterValue=$domainName ParameterKey=Version,ParameterValue=$(git rev-parse HEAD)"
if (-not $debug) {
    sam local invoke  --env-vars $envVarsFilePath -e $sampleRequestFilePath --parameter-overrides $parameterOverrides --skip-pull-image $name 
    return
}

if ($debug) {
    sam local invoke --env-vars $envVarsFilePath -e $sampleRequestFilePath --parameter-overrides $parameterOverrides --skip-pull-image --debug-port $debugPort $name
}