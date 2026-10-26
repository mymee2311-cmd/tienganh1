# Run from the repository root where questions.js is located.
$ErrorActionPreference = 'Stop'
$path = Join-Path (Get-Location) 'questions.js'
if (-not (Test-Path -LiteralPath $path)) {
  throw "Khong tim thay questions.js trong thu muc hien tai: $((Get-Location).Path)"
}
$encoding = [System.Text.Encoding]::UTF8
$content = [System.IO.File]::ReadAllText($path, $encoding)
$pattern = '(?s)("id"\s*:\s*"Q082"\s*,.*?"number"\s*:\s*2\s*,\s*"correct"\s*:\s*)(\d+)(\s*,\s*"explain"\s*:\s*")[^"]*(")'
$matchesFound = [regex]::Matches($content, $pattern)
if ($matchesFound.Count -ne 1) { throw "Can tim dung 1 cau Q082; tim thay $($matchesFound.Count). Khong thay doi file." }
$explanation = 'Đáp án C. won''t get theo file Word. Câu điều kiện loại 1: If + hiện tại đơn, will/won''t + động từ nguyên mẫu. Lưu ý: doesn''t get cũng có thể đúng khi nói về quy luật chung.'
# Use a match evaluator to change only this Q082 block.
$content = [regex]::Replace($content, $pattern, [System.Text.RegularExpressions.MatchEvaluator]{
  param($m)
  return $m.Groups[1].Value + '2' + $m.Groups[3].Value + $explanation + $m.Groups[4].Value
})
[System.IO.File]::WriteAllText($path, $content, (New-Object System.Text.UTF8Encoding($false)))
Write-Host 'Đã sửa Q082: correct = 2 (C. won''t get).'
Write-Host 'Kiem tra: git diff -- questions.js'
