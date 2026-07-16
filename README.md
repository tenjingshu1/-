# 城管领域本体库（最新精简版）

本目录由最新的 16 概念域版本整理而来，旧目录未修改。

## 保留内容

- `app/src`：从 `main.tsx` 追踪得到的实际使用源码，共 12 个文件。
- `app/public/logo-icon.svg`：页面使用的 Logo。
- `app/dist`：本体库构建产物，仅保留主页面、样式、脚本和 Logo。
- `data/ontology.json`：从源码导出的本体 JSON，包含概念、法规、约束和字典。
- `城管领域本体库_离线单文件.html`：无需服务器，双击打开。
- `启动城管本体库.ps1`：以 3004 端口启动构建产物。

## 已排除内容

知识图谱 HTML/JSON-LD/CSV、过程报告、临时脚本、演示页、未被入口引用的 UI 组件、旧版本文件均未复制。

## 开发构建

```powershell
cd app
npm install
npm run build
```
