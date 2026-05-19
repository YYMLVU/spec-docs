<p align="center">
  <img src="./head.png" alt="Spec Docs" />
</p>

# Spec Docs

[English](./README.md)

Spec Docs 是一个可复用 skill，用于为软件项目构建和维护 **implementation-first AI spec 知识库**，并提供**可选的架构治理**。

它记录当前已经实现的代码事实：代码行为、技术栈、模块约束、接口、数据流、关键符号、调用关系、边界和验证点。它还可以管理架构规则、记录决策（ADR）、追踪重建进度。后续 AI agent 可以通过这些 spec 精准维护项目，减少重复全仓扫描，也避免牵连无关代码。

## 安装方式

### 1. 通过 AI 助手

将以下文本发给你的 AI 助手（Claude Code、Cursor、GitHub Copilot 等），它会自动完成安装：

```text
请根据 https://github.com/YYMLVU/spec-docs/blob/main/INSTALL-FOR-AI.md 中的指引，将 spec-docs skill 安装到当前项目。
然后使用 spec-docs skill 的init mode，为本项目构建一个完整的、以实现为先的Spec docs库。
```

### 2. 通过 npx

```bash
npx spec-docs
```

这会将 skill 复制到当前项目的 `.claude/skills/spec-docs/` 中。然后将以下内容发送给你的 AI：

```text
Use the spec-docs skill in init mode to build a full implementation-first spec knowledge base for this project.
```

### 3. 手动安装

**Claude Code 项目级：**

```bash
mkdir -p .claude/skills/spec-docs
cp -R skills/spec-docs/* .claude/skills/spec-docs/
```

**Claude Code 用户级：**

```bash
mkdir -p ~/.claude/skills/spec-docs
cp -R skills/spec-docs/* ~/.claude/skills/spec-docs/
```

**其他 agent：** 如果你的 agent 支持 skills 或 prompt-package 目录，将 `skills/spec-docs/` 的内容安装到对应位置，并保持目录名为 `spec-docs`。

## 核心定位

Spec Docs 把当前实现作为事实源。

它不是：

- 产品需求系统
- roadmap
- implementation plan
- 任务生成器
- 从 spec 生成代码的工作流

它是：

- 当前代码知识库
- AI 阅读入口
- 代码到 spec 的反向索引
- symbol 到 spec 的维护地图
- 让项目在后续 AI 迭代中持续同步 spec 的项目级协议

## 它会生成什么

目标项目中的典型输出：

```text
docs/spec-docs/
├── README.md
├── constitution.md
├── inventory.md
├── specs/
│   ├── project-overview.spec.md
│   ├── features/
│   ├── modules/
│   ├── interfaces/
│   ├── runtime/
│   ├── data/
│   ├── integrations/
│   └── quality/
├── architecture/
│   └── (架构规则和放置约束)
├── decisions/
│   └── (ADR 记录)
└── rebuild/
    └── status.md
```

实际结构服从真实项目。不要创建空目录或未来才可能用到的目录。

### 工作区目录

- `specs/` -- 实现事实：代码行为、技术栈、约束、映射
- `architecture/` -- 规则和放置约束，决定代码的组织方式
- `decisions/` -- 架构决策记录（ADR），决策原因的唯一来源
- `rebuild/status.md` -- rebuild 模式的事实源，用于追踪进行中的重建

## 七种模式

### `init`

从当前代码库首次构建全项目 implementation spec library。

对于空项目目录，`init` 会创建一份极简项目原则种子，而不是完整 implementation spec library。它记录经确认的项目用途、预期技术栈、长期有效的编码/测试/依赖原则、目录组织约束和项目外边界。它不会创建 `inventory.md`、空索引、plan、脚手架、未来 feature spec 或 roadmap。当实现文件出现后，`update` 会吸收这份种子并生成正常的 implementation-first spec library。

对于已有实现的项目，会创建：

- `docs/spec-docs/README.md`
- `docs/spec-docs/constitution.md`
- `docs/spec-docs/inventory.md`
- `docs/spec-docs/specs/project-overview.spec.md`
- 面向真实 feature、module、interface、runtime、data、integration、quality 的类型化 specs
- `docs/spec-docs/decisions/` 中的 ADR 记录
- `docs/spec-docs/architecture/` 中的规则和放置约束
- 写入 `AGENTS.md` 和/或 `CLAUDE.md` 的 marker-based 项目维护协议块

对于已有实现的项目，只有当 Code-to-Spec Index 覆盖所有 included implementation-relevant files，并且项目协议块已经安装或更新时，`init` 才算完成。

### `update`

代码变更后同步维护 specs。

AI 必须：

- 阅读 `docs/spec-docs/README.md` 和 `docs/spec-docs/inventory.md`
- 使用 Code-to-Spec、Task-to-Spec、Symbol-to-Spec 映射
- 在同一次变更中更新受影响 specs
- 路径、symbols、映射变化时更新 `inventory.md`
- 如果不需要更新 spec，明确说明原因

### `verify`

声明 specs 当前有效前执行一致性检查。

检查：

- 项目协议块
- 必需核心文件
- frontmatter 字段
- source paths / globs
- code-to-spec 覆盖率
- symbol 映射
- 不存在模板占位符、TODO/TBD、未来计划内容

### `repair`

当 specs 过期、漂移或索引不可信时，重新与当前代码对齐。

`repair` 默认只更新文档和项目规则。如果发现疑似代码 bug，只报告 implementation concern，不修改代码，除非用户明确要求。

### `place`

根据 `architecture/` 规则检查提议的模块或文件是否应放在已有位置，还是需要新建位置。报告放置决策，不创建文件。

### `rebuild`

追踪模块或子系统的受控重写。读取 `docs/spec-docs/rebuild/status.md` 确定当前重建状态，随工作进展更新，重建完成后将 specs 从旧结构迁移到新结构。

### `adopt`

完成 rebuild 迁移：将 `target-architecture.md` 合并到 `current-architecture.md`，更新 ADR implementation evidence，将 `rebuild/status.md` 标记为 completed，并把 target/adoption 文档归档到 `docs/spec-docs/rebuild/archive/`。

## 架构治理

Spec Docs 通过 `docs/spec-docs/architecture/` 目录可选地执行架构治理：

- **规则** 定义模块必须放置的位置、允许的依赖关系、以及代码的组织方式。
- **放置约束** 决定新文件或模块应放在已有位置还是需要新建位置。
- **决策**（ADR）在 `docs/spec-docs/decisions/` 中是架构决策原因的唯一来源。

当架构治理激活时，`place` 模式使用这些规则验证模块放置，`verify` 检查代码库是否仍然符合声明的约束。

## 独立模式与集成模式

Spec Docs 检测项目是否已使用管理需求、计划或 feature 级 spec 的外部 Spec Skill 或工作流（例如 Superpowers、OpenSpec、Spec-Kit）。

1. 如果检测到已知的外部 Spec Skill，Spec Docs 以**集成模式**运行，将需求级和规划事务交由该 skill 处理。
2. 如果未发现已知的外部 Spec Skill，Spec Docs 会询问一次是否存在其他模块级或 feature 级 Spec Skill。
3. 如果不存在，Spec Docs 以**独立模式**运行，使用**最小实现计划**——仅记录保持 specs 与当前代码同步所需的内容，不会成为完整的需求系统、roadmap、backlog 或外部 Spec Skill 的替代。

独立模式不会创建 roadmap 条目、backlog 条目或 feature 计划。它只记录已实现的内容和已做出的决策。

## Implementation Mapping

每个 spec 都应该能把行为精准映射到代码。

可包含：

- 技术栈
- 输入和输出
- 当前行为
- implementation map
- 关键函数、类、路由、命令、schema、job
- 调用流
- 数据流
- 状态变化和副作用
- 错误和边界情况
- 测试和验证点
- change boundaries 和 precision notes

这让后续 AI 能回答：

- 哪个 spec 描述这个文件？
- 哪些文件实现这个行为？
- 哪些 symbol 会影响这个功能？
- 当前任务不应该改哪些区域？
- 这次变更后必须更新哪些 specs？

## Inventory

`docs/spec-docs/inventory.md` 是 spec library 的客观反向索引。

它包含：

- Coverage Scope，包括 included / excluded globs
- Spec List
- Code-to-Spec Index
- Task-to-Spec Map
- Symbol-to-Spec Index

它不记录 planned specs、coverage gaps、todo 或 roadmap。

## 项目维护协议

`init` 后，Spec Docs 会把带 marker 的协议块安装到项目级 agent 指令中：

- 更新已有 `AGENTS.md`
- 更新已有 `CLAUDE.md`
- 两者都存在时都更新
- 两者都不存在时创建 `AGENTS.md`

协议块使用 `<!-- SPEC-DOCS-PROTOCOL:BEGIN -->` 和 `<!-- SPEC-DOCS-PROTOCOL:END -->` marker 包裹。后续 `init` 或 `repair` 可以替换 marker 内内容，而不改写其它项目指令。

协议会要求后续 AI 在改 implementation-relevant files 前阅读相关 specs，改完后同步更新受影响 specs，并在声明完成前运行或应用 `spec-docs verify`。

## 事实源优先级

信息冲突时：

1. code、contracts、configs
2. tests
3. existing docs
4. commit history
5. existing specs

如果行为无法确认，spec 必须使用：

```text
[NEEDS CLARIFICATION: <specific question>]
```

AI 不允许猜测。

## 使用方式

初始化项目：

```text
Use $spec-docs init to build a full implementation-first spec knowledge base for this project.
```

代码变更后同步 specs：

```text
Use $spec-docs update to synchronize specs with the current code changes.
```

检查一致性：

```text
Use $spec-docs verify to check whether docs/spec-docs is current and complete.
```

修复过期 specs：

```text
Use $spec-docs repair to realign stale specs with the current implementation.
```

## 仓库内容

```text
.
├── skills/
│   └── spec-docs/
│       ├── SKILL.md
│       └── templates/
│           ├── agent-protocol-block.md
│           ├── specs-readme.md
│           ├── constitution.md
│           ├── inventory.md
│           ├── project-overview.spec.md
│           ├── feature.spec.md
│           ├── module.spec.md
│           ├── interface.spec.md
│           ├── runtime.spec.md
│           ├── data.spec.md
│           ├── integration.spec.md
│           └── quality.spec.md
├── bin/
│   └── spec-docs.js
├── agents/
│   └── openai.yaml
├── package.json
├── README.md
├── README.zh-CN.md
├── INSTALL-FOR-AI.md
├── head.png
├── LICENSE
└── .gitignore
```

## License

MIT
