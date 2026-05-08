<p align="center">
  <img src="./head.png" alt="Spec Docs" />
</p>

# Spec Docs

[English](./README.md)

Spec Docs 是一个可复用 skill，用于为软件项目构建和维护 **implementation-first AI spec 知识库**。

它记录当前已经实现的代码事实：代码行为、技术栈、模块约束、接口、数据流、关键符号、调用关系、边界和验证点。后续 AI agent 可以通过这些 spec 精准维护项目，减少重复全仓扫描，也避免牵连无关代码。

## 一键安装到你的项目（通过 AI）

将以下文本发给你的 AI 助手（Claude Code、Cursor、GitHub Copilot 等），它会自动完成安装：

```text
请根据 https://github.com/YYMLVU/spec-docs/blob/main/INSTALL-FOR-AI.md 中的指引，将 spec-docs skill 安装到当前项目。
然后使用 spec-docs skill 的init mode，为本项目构建一个完整的、以实现为先的Spec docs库。
```

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
docs/specs/
├── README.md
├── constitution.md
├── inventory.md
├── project-overview.spec.md
├── features/
├── modules/
├── interfaces/
├── runtime/
├── data/
├── integrations/
├── quality/
└── decisions/
```

实际结构服从真实项目。不要创建空目录或未来才可能用到的目录。

## 四种模式

### `init`

从当前代码库首次构建全项目 implementation spec library。

会创建：

- `docs/specs/README.md`
- `docs/specs/constitution.md`
- `docs/specs/inventory.md`
- `docs/specs/project-overview.spec.md`
- 面向真实 feature、module、interface、runtime、data、integration、quality、decision 的类型化 specs
- 写入 `AGENTS.md` 和/或 `CLAUDE.md` 的 marker-based 项目维护协议块

只有当 Code-to-Spec Index 覆盖所有 included implementation-relevant files，并且项目协议块已经安装或更新时，`init` 才算完成。

### `update`

代码变更后同步维护 specs。

AI 必须：

- 阅读 `docs/specs/README.md` 和 `docs/specs/inventory.md`
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

`docs/specs/inventory.md` 是 spec library 的客观反向索引。

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

## 安装

### Claude Code 项目级安装

```bash
mkdir -p .claude/skills/spec-docs
cp -R ./* .claude/skills/spec-docs/
```

### Claude Code 用户级安装

```bash
mkdir -p ~/.claude/skills/spec-docs
cp -R ./* ~/.claude/skills/spec-docs/
```

### 其他 agent

如果你的 agent 支持 skills 或 prompt-package 目录，可以安装到对应位置，并保持目录名为 `spec-docs`。

安装时应包含：

```text
SKILL.md
README.md
README.zh-CN.md
INSTALL-FOR-AI.md
head.png
agents/
templates/
```

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
Use $spec-docs verify to check whether docs/specs is current and complete.
```

修复过期 specs：

```text
Use $spec-docs repair to realign stale specs with the current implementation.
```

## 仓库内容

```text
.
├── SKILL.md
├── README.md
├── README.zh-CN.md
├── INSTALL-FOR-AI.md
├── head.png
├── agents/
│   └── openai.yaml
├── templates/
│   ├── agent-protocol-block.md
│   ├── specs-readme.md
│   ├── constitution.md
│   ├── inventory.md
│   ├── project-overview.spec.md
│   ├── feature.spec.md
│   ├── module.spec.md
│   ├── interface.spec.md
│   ├── runtime.spec.md
│   ├── data.spec.md
│   ├── integration.spec.md
│   ├── quality.spec.md
│   └── decision.spec.md
├── LICENSE
└── .gitignore
```

## License

MIT
