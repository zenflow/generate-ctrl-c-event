Add-Type -TypeDefinition @"
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;

public static class Kernel32
{
  [DllImport("kernel32.dll")]
  public static extern bool GenerateConsoleCtrlEvent(
    uint dwCtrlEvent,
    uint dwProcessGroupId
  );
}
"@

[Kernel32]::GenerateConsoleCtrlEvent($args[0], 0)
