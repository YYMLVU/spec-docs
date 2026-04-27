# Spec Docs Knowledge Base

[English](./README.en.md)

将任意软件项目转换为**轻量、可读、可维护的 AI 文档知识库（spec docs）**的通用 skill。它适合在开发、重构、接手旧项目、多人/多 agent 协作之前，先把现有实现整理成一套结构化说明文档，方便后续 AI 快速理解项目。

该 skill 会帮助 agent：

- 先阅读代码与配置，再基于真实实现写文档
- 建立一个可持续维护的 `docs/specs/` 知识库
- 生成 AI 入口文档与推荐阅读顺序
- 按真实职责拆分 feature / architecture / runtime / interfaces 等说明
- 随项目演进持续增删、拆分、合并 spec 文件

## 功能概览

- 从当前实现构建项目 spec 文档库
- 为未来 AI agent 提供统一入口与默认阅读顺序
- 不按固定文件数量拆文档，而是按真实职责建模
- 覆盖功能行为、架构边界、业务规则、边界情况、测试点、代码引用、更新规则
- 适配多种项目形态：Web、CLI、AI/ML、嵌入式、IoT、库、基础设施等

## 适用场景

在这些场景下使用该 skill：

- 想为仓库接入 AI 辅助开发，但当前上下文混乱
- 想把项目转换成结构化知识库
- 想在迭代前先沉淀当前架构与功能行为
- 想减少未来 agent 每次都全仓扫描的成本
- 想给多 agent 协作、长期重构、交接维护建立稳定上下文

## 安装

这个仓库本质上是一个 skill 包。你可以把它安装为：

- **项目级 skill**：只在当前项目中生效
- **用户级 skill**：对当前用户所有项目生效

### Claude Code

#### 项目级安装（推荐）

```bash
mkdir -p .claude/skills/spec-docs-knowledge-base
cp -R ./* .claude/skills/spec-docs-knowledge-base/
```

#### 用户级安装

```bash
mkdir -p ~/.claude/skills/spec-docs-knowledge-base
cp -R ./* ~/.claude/skills/spec-docs-knowledge-base/
```

### Codex / 兼容 skills 目录的 agent

如果你的 agent 使用类似 skills 目录机制，也可以安装到该 agent 的 skills 目录。例如：

```bash
mkdir -p ~/.agents/skills/spec-docs-knowledge-base
cp -R ./* ~/.agents/skills/spec-docs-knowledge-base/
```

### Linux / macOS / Windows 说明

- **Linux / macOS**：直接使用上面的 `mkdir` + `cp` 命令即可
- **Windows PowerShell**：

```powershell
New-Item -ItemType Directory -Force "$HOME/.claude/skills/spec-docs-knowledge-base" | Out-Null
Copy-Item -Recurse . "$HOME/.claude/skills/spec-docs-knowledge-base"
```

### 适用的 agent

本仓库优先面向支持“skills / prompt package / project prompt”机制的 agent，例如：

- Claude Code
- Codex / Codex CLI
- 其他支持项目级或用户级 skills 目录的 agent

如果某个 agent 不直接支持 skills 目录，也可以把本仓库当作**可复制的 prompt + 规范文档**手动接入。

## 让 AI 代你安装

如果你不想手动安装，可以直接把下面这段话复制给 AI：

```text
请将当前目录中的 spec-docs 仓库安装为当前项目可用的 skill：
1. 在当前项目下创建 `.claude/skills/spec-docs-knowledge-base/`
2. 将仓库中的 `SKILL.md` 以及安装所需的说明文件复制进去
3. 保持目录名为 `spec-docs-knowledge-base`
4. 安装完成后检查 `./.claude/skills/spec-docs-knowledge-base/SKILL.md` 是否存在
5. 如果当前环境不是 Claude Code，而是其他支持 skills 目录的 agent，请改装到对应的 skills 目录
6. 不要修改 skill 内容，只做安装与校验
```

如果你希望给 AI 更完整的执行说明，见：[INSTALL-FOR-AI.md](./INSTALL-FOR-AI.md)

## 使用方式

在项目工作目录中调用这个 skill，例如：

```text
$spec-docs-knowledge-base 将当前项目完整 Spec 化
```

典型输出结构：

```text
docs/specs/
├── README.md
├── project-overview.spec.md
├── features/
├── architecture/
├── runtime/
├── interfaces/
└── <project-specific folders>
```

实际结构应根据项目真实形态动态变化。比如：

- Web 项目可能包含 `frontend/`、`backend/`
- AI/ML 项目可能包含 `data/`、`training/`、`inference/`、`evaluation/`
- 嵌入式项目可能包含 `firmware/`、`hardware/`、`drivers/`、`protocols/`
- CLI 项目可能包含 `cli/`、`commands/`、`config/`、`packaging/`

该 skill 的原则是：**让文档结构服从真实项目，而不是强行套固定模板。**

## 仓库内容

```text
.
├── SKILL.md
├── agents/
│   └── openai.yaml
├── README.md
├── README.en.md
├── INSTALL-FOR-AI.md
├── LICENSE
└── .gitignore
```

## License

MIT
