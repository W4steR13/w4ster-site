# NODEWORK — публикация игровых сборок

**Файлы игры храним в GitHub Releases, а не в репозитории сайта.**
GitHub Web Upload ограничивает отдельный файл 25 МБ; для ZIP на десятки мегабайт удобнее Releases.

Планируемый репозиторий: `W4steR13/nodework-releases`.
Релиз: `alpha-0.14` (prerelease).
Ссылка после фактической публикации:
`https://github.com/W4steR13/nodework-releases/releases/download/alpha-0.14/NODEWORK_Alpha_0.14_windows_x64.zip`

Для автоматизации подготовлен локальный PowerShell-скрипт `PUBLISH_NODEWORK_ALPHA.ps1` (выдан в чате).
Он использует GitHub CLI (`gh`), создаёт репозиторий при необходимости и публикует проверенный ZIP с SHA-256.

После загрузки проверить публичный URL, затем прописать его в **встроенный** `window.NODEWORK_SITE.downloadUrl` файла `nodework/index.html` в ветке `release/nodework`.
Сайт использует встроенную конфигурацию; отдельный `site.config.js` сейчас не подключён.
Workflow `.github/workflows/publish-nodework.yml` синхронизирует `nodework/` с `main`.

**Пока пользователь исправляет сборку, ничего не публиковать и не активировать кнопку.**
