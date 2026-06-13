param (
    [switch]$Unregister
)

$TaskPath = "\UngasisOS"
$WorkingDir = "D:\.projects\ungasis"
$PythonPath = "python"

if ($Unregister) {
    $tasks = @("DailyBackup", "WeeklyWikiLint", "WeeklyPulse")
    foreach ($task in $tasks) {
        Unregister-ScheduledTask -TaskPath $TaskPath -TaskName $task -Confirm:$false -ErrorAction SilentlyContinue
        Write-Host "Unregistered task: $task"
    }
    exit
}

# 1. Daily backup
$action1 = New-ScheduledTaskAction -Execute $PythonPath -Argument "scripts/ungasis.py backup" -WorkingDirectory $WorkingDir
$trigger1 = New-ScheduledTaskTrigger -Daily -At 9:00AM
Register-ScheduledTask -TaskPath $TaskPath -TaskName "DailyBackup" -Action $action1 -Trigger $trigger1 -Force

# 2. Weekly wiki lint
$action2 = New-ScheduledTaskAction -Execute $PythonPath -Argument "scripts/wiki-lint.py" -WorkingDirectory $WorkingDir
$trigger2 = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday -At 8:00AM
Register-ScheduledTask -TaskPath $TaskPath -TaskName "WeeklyWikiLint" -Action $action2 -Trigger $trigger2 -Force

# 3. Weekly pulse
$action3 = New-ScheduledTaskAction -Execute $PythonPath -Argument "scripts/ungasis.py pulse" -WorkingDirectory $WorkingDir
$trigger3 = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday -At 8:05AM
Register-ScheduledTask -TaskPath $TaskPath -TaskName "WeeklyPulse" -Action $action3 -Trigger $trigger3 -Force

Write-Host "Tasks registered successfully."

# Last reviewed: June 2026 | Review by: September 2026 | Owner: Mel
