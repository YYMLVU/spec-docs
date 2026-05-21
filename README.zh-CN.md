<div align="center">
  <img src="./head.png" alt="Spec Docs" width="320" />

  <h1>Spec Docs</h1>

  <p><strong>面向真实代码库的 implementation-first AI spec 知识库。</strong></p>

  <p>
    <a href="./README.md">English</a>
    ·
    <a href="https://www.npmjs.com/package/spec-docs">npm package</a>
    ·
    <a href="./LICENSE">MIT License</a>
  </p>

  <p>
    <img alt="npm" src="https://img.shields.io/npm/v/spec-docs" />
    <img alt="license" src="https://img.shields.io/badge/license-MIT-blue" />
    <img alt="AI skill" src="https://img.shields.io/badge/AI-skill-7c3aed" />
  </p>
</div>

Spec Docs 是一个可复用 skill，用于为软件项目构建和维护 `docs/spec-docs/` 工作区，其中包含 **implementation-first AI spec 知识库**和**架构治理**（根据项目需要执行治理深度）。

在这个工作区中，`specs/` 记录代码当前已经实现的事实：行为、技术栈、模块约束、接口、数据流、关键符号、调用关系、边界和验证点。`architecture/`、`decisions/`、`reviews/` 和 `rebuild/` 提供架构治理（根据项目需要执行治理深度）、ADR、review 记录和迁移状态。后续 AI agent 可以通过这个工作区精准修改项目，减少重复全仓扫描，也避免牵连无关代码。

## 快速开始

### 方式 1：通过 AI 助手

将以下内容发送给 Claude Code、Cursor、GitHub Copilot 或其他 AI 编码助手：

```text
请按照 https://github.com/YYMLVU/spec-docs/blob/main/INSTALL-FOR-AI.md 中的指引，将 spec-docs skill 安装到当前项目。
然后使用 spec-docs skill 的 init mode 为本项目构建一个完整的 implementation-first spec 知识库。
```

### 方式 2：通过 npx 安装

```bash
npx spec-docs
```

这会将 skill 复制到当前项目的 `.claude/skills/spec-docs/` 中。然后向你的 AI 助手发送：

```text
Use the spec-docs skill in init mode to build a full implementation-first spec knowledge base for this project.
```

### 方式 3：手动安装

Claude Code 项目级安装：

```bash
mkdir -p .claude/skills/spec-docs
cp -R skills/spec-docs/* .claude/skills/spec-docs/
```

Claude Code 用户级安装：

```bash
mkdir -p ~/.claude/skills/spec-docs
cp -R skills/spec-docs/* ~/.claude/skills/spec-docs/
```

其他 agent：如果你的 agent 支持 skills 或 prompt-package 目录，将 `skills/spec-docs/` 的内容安装到对应位置，并保持目录名为 `spec-docs`。

## 你会得到什么

| 能力 | 用途 |
| --- | --- |
| Implementation specs | 记录已确认的行为、技术栈、接口、数据流、边界情况和验证点。 |
| Inventory 反向索引 | 映射文件、任务、symbols 和 specs，让 agent 知道该读什么、该更新什么。 |
| 架构治理 | 记录放置规则、当前架构、目标架构和架构 review。 |
| ADRs | 保存架构决策原因以及对应的 implementation evidence。 |
| Rebuild tracking | 协调受控子系统重写，同时保持 spec/code 对齐。 |
| Agent protocol block | 将持久维护协议写入 `AGENTS.md` 或 `CLAUDE.md`，要求后续 agent 持续同步 specs。 |

## 核心定位

Spec Docs 把当前实现作为事实源。

它不是：

- 产品需求系统
- roadmap
- implementation planning 工具
- 任务生成器
- 从 spec 生成代码的工作流

它是：

- 当前代码知识库
- AI 阅读入口
- 代码到 spec 的反向索引
- symbol 到 spec 的维护地图
- 让项目在后续 AI 迭代中持续同步 spec 的项目级协议

## 紧凑 Skill 结构

spec-docs skill 使用紧凑的 `SKILL.md` 作为执行路由入口，详细规则被拆分到独立层级：

| 层级 | 目录 | 职责 |
| --- | --- | --- |
| 路由 | `SKILL.md` | 身份、模式路由、硬门禁和引用索引。agent 首先读取此文件，确定应使用的模式和对应引用。 |
| 规范性规则 | `skills/spec-docs/references/` | 各模式的详细规则、验证标准、spec 写作规则、架构控制、工作流集成和 hook 策略。当某个模式指向某个 reference 时，该 reference 是规范性的——agent 必须在执行前阅读并遵循。 |
| 输出模板 | `templates/` | specs、架构文档、ADR、review 及其他工作区输出的文件模板。 |
| 可选 Hook 层 | `hooks/` | agent hook 集成的骨架/提醒占位。Claude hook 脚手架覆盖 `SessionStart`、`PreToolUse`、`PostToolUse` 和 `Stop`；Cursor hook 脚手架覆盖 `sessionStart` 和 `stop`。Hook 不替代规则；它只检测事件并指向所需的模式或引用。Hook 不得自动修改代码、ADR 或架构规则。当前 hooks 仅为集成脚手架，并非生产级强制层。 |

这种分离使 skill 入口保持精简，同时确保所有规则在其规范位置可被引用且具有权威性。

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
│   ├── current-architecture.md
│   ├── placement-rules.md
│   ├── target-architecture.md
│   └── adoption-plan.md
├── decisions/
│   └── adr-001-example.md
├── reviews/
└── rebuild/
    ├── status.md
    └── archive/
```

仅创建当前模式与已确认项目实际所需的目录。不应创建空的或推测性的子 spec 目录。

### 工作区目录

| 目录 | 职责 |
| --- | --- |
| `specs/` | 实现事实：代码行为、技术栈、约束、映射和验证点。 |
| `architecture/` | 当前架构规则、放置规则、目标架构，以及 rebuild 期间的 adoption plans。 |
| `decisions/` | ADRs，架构决策原因的唯一来源。 |
| `reviews/` | 治理工作流产生的放置和架构 review 记录。 |
| `rebuild/status.md` | rebuild 模式事实源，用于 active、paused 或 completed 迁移。 |

## 模式

| Mode | 使用场景 | 行为 |
| --- | --- | --- |
| `init` | 在项目中首次启用 Spec Docs | 构建 implementation spec library，创建核心文件，在存在架构治理时记录规则，并安装带 marker 的 agent 协议块。 |
| `update` | 代码已经变更 | 使用 Code-to-Spec、Task-to-Spec、Symbol-to-Spec 映射同步受影响 specs 和 `inventory.md`。 |
| `verify` | 声明 specs 当前有效之前 | 检查协议块、必需文件、frontmatter、source paths、覆盖率、symbol 映射、无占位内容和架构一致性。报告 `[ARCHITECTURE VIOLATION: <subtype>]`，包含预期行为和建议操作。Severity 反映 Adoption Mode 和启用的 Addons。 |
| `repair` | specs 过期或不一致 | 将文档和项目规则重新对齐当前代码；发现疑似代码问题时只报告，不主动修改代码。 |
| `place` | 判断新模块或变更应放在哪里 | 在实现规划前运行 Placement & Boundary Review，根据 `architecture/` 规则输出所有权、层级放置、边界合约（允许/禁止依赖、必需合约、禁止捷径）、故障定位提示和需更新的 specs。作为后续规划的边界合约。不修改代码。 |
| `rebuild` | 启动目标架构迁移 | 定义目标架构、adoption plan 和 rebuild 状态，并在迁移期间保持 specs 对齐。 |
| `adopt` | 完成 rebuild 迁移 | 将 target architecture 合并到 current architecture，更新 ADR evidence，标记 rebuild completed，并归档 rebuild 文档。 |
| `diagnose` | 对症状进行架构引导的排查 | 识别可能的负责人、可能所属的层级、需要检查的 specs/文件、需要关注的信号，以及排查顺序。不执行直接修复。 |

### 空项目行为

对于空项目目录，`init` 创建一份极简项目原则种子，而不是完整的 implementation spec library。它记录经确认的项目用途、预期技术栈、长期有效的编码/测试/依赖原则、目录组织约束和项目外边界。它不会创建 `inventory.md`、空索引、plan、脚手架、未来 feature spec 或 roadmap 条目。当实现文件出现后，`update` 会吸收这份种子并生成正常的 implementation-first spec library。

### 已有实现项目行为

对于已有实现的项目，只有当 Code-to-Spec Index 覆盖所有 included implementation-relevant files，并且协议块已经安装或更新到 `AGENTS.md` 和/或 `CLAUDE.md` 时，`init` 才算完成。

## 架构治理

Spec Docs 执行一个架构控制层，包含六项职责：

1. **架构选择（Architecture Selection）** -- 识别或选择项目的 Primary Preset、Addons 和 Adoption Mode。
2. **放置（Placement）** -- 在实现规划前决定新代码应放在哪里。
3. **边界合约（Boundary Contract）** -- 定义模块边界、依赖方向、公共合约、共享代码规则和基础设施访问规则。
4. **合规验证（Compliance Verification）** -- 检查代码是否符合架构规则；报告越界和漂移。
5. **故障定位（Failure Localization）** -- 将症状追踪到负责模块、失败层级和排查路径。
6. **重建演进（Rebuild Evolution）** -- 跟踪从当前架构到目标架构的受控迁移。

架构治理通过 `docs/spec-docs/architecture/`、`docs/spec-docs/decisions/` 和 `docs/spec-docs/reviews/` 运作：

- `current-architecture.md` 记录架构选择（Primary Preset、置信度、来源、Addons、Adoption Mode、理由、已知偏差）和当前架构规则。
- `placement-rules.md` 记录边界合约和放置规则。
- `target-architecture.md` 和 `adoption-plan.md` 记录目标架构选择，并指导活跃的 rebuild 迁移。
- `docs/spec-docs/decisions/` 中的 ADRs 解释架构决策原因及对应的 implementation evidence。
- `docs/spec-docs/reviews/` 中的放置和架构 review 记录治理决策，不修改代码。

当架构治理激活时，`place` 在实现规划前检查提议的模块放置，`verify` 检查代码是否仍然符合声明的当前或活跃目标架构约束。

架构验证会在证据充分时报告具体违规子类型，而不是只报告泛化 drift。例如，当 placement rules 规定某类业务策略属于特定 feature module，但该策略逐渐堆积到 shared utilities 中时，`verify` 可以报告 `[ARCHITECTURE VIOLATION: ARCHITECTURE DRIFT]`。在 strict Adoption Mode 或启用边界相关 Addons 时，severity 应反映更强的边界合约。

已完成的 rebuild 使用 `adopt` 作为最终化步骤，而不是再次执行 first-time `init`。当 `rebuild/status.md` 显示 ready-to-adopt phase 且 verify 已通过时，`adopt` 会将目标 Architecture Selection 合并到当前架构，保留相关 placement rules，更新 ADR evidence，标记 rebuild completed，并归档 target/adoption 文档。

## 独立模式与集成模式

Spec Docs 检测项目是否已使用管理需求、计划或 feature 级 spec 的外部 Spec Skill 或工作流（例如 Superpowers、OpenSpec、Spec-Kit）。

1. 如果检测到已知的外部 Spec Skill，Spec Docs 以**集成模式**运行，将需求级和规划事务交由该 skill 处理。
2. 如果未发现已知的外部 Spec Skill，Spec Docs 会询问一次是否存在其他模块级或 feature 级 Spec Skill。
3. 如果不存在，Spec Docs 以**独立模式**运行，使用**最小实现计划**——仅记录保持 specs 与当前代码同步所需的内容，不会成为完整的需求系统、roadmap、backlog 或外部 Spec Skill 的替代。

独立模式不会创建 roadmap 条目、backlog 条目或 feature 计划。它可以在实现前进行轻量意图澄清、placement review 和最小实现计划；这些内容属于临时执行辅助或 review，不会进入 `specs/` 作为实现事实。

## Implementation Mapping

每个 spec 都应将行为精准映射到代码。

可包含：

- 技术栈
- 输入和输出
- 当前行为
- implementation map
- 关键函数/类/路由/命令/schema/job
- 调用流
- 数据流
- 状态变化和副作用
- 边界情况和错误
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

实现行为信息冲突时：

1. code、contracts、configs
2. tests
3. existing docs
4. commit history
5. existing specs
6. ADRs in `docs/spec-docs/decisions/`

架构规则冲突时，依次参考 `architecture/current-architecture.md`、`architecture/placement-rules.md`、Accepted ADRs 和 specs。决策原因以 ADRs 为第一事实源。

如果行为无法确认，spec 必须使用：

```text
[NEEDS CLARIFICATION: <specific question>]
```

AI 不允许猜测。

## 使用方式

| 任务 | 提示词 |
| --- | --- |
| 初始化项目 | `Use $spec-docs init to build a full implementation-first spec knowledge base for this project.` |
| 代码变更后同步 specs | `Use $spec-docs update to synchronize specs with the current code changes.` |
| 检查一致性 | `Use $spec-docs verify to check whether docs/spec-docs is current and complete.` |
| 修复过期 specs | `Use $spec-docs repair to realign stale specs with the current implementation.` |
| 审查模块放置 | `Use $spec-docs place to decide where this change belongs before implementation planning.` |
| 启动 rebuild 迁移 | `Use $spec-docs rebuild to define and track a target architecture migration for this project.` |
| 采纳已完成的 rebuild | `Use $spec-docs adopt to merge the completed target architecture into the current architecture and archive rebuild documents.` |
| 架构化排错 | `Use the spec-docs skill in diagnose mode for this symptom: <symptom>. Identify likely owner, failure boundary, specs/files to inspect, signals to check, and debugging order without claiming root cause prematurely.` |

## 发布与完备性说明

版本 `2.0.0` 已对源码形态和安装后 package 形态进行本地完备性覆盖。当前本地套件覆盖十二个场景，并覆盖全部八种模式：`init`、`update`、`verify`、`repair`、`place`、`rebuild`、`adopt` 和 `diagnose`。

覆盖重点包括：

- source form 和 installed form 检查
- 空项目与已有项目的 `init`
- 架构放置与边界 review
- implementation/spec 同步
- fact drift 与 architecture violation 报告
- 针对策略进入错误模块的 `[ARCHITECTURE VIOLATION: ARCHITECTURE DRIFT]`
- 不擅自修改代码的 repair
- rebuild 状态追踪与 completed-rebuild `adopt` 最终化
- 架构引导诊断
- 存在 Superpowers 时的协同，以及无 Spec Skill 时的 fallback reasoning
- Claude 和 Cursor hook 脚手架的静态检查、脚本执行检查和 matcher simulation；hooks 是提醒脚手架，不是生产级强制自动化

剩余已知限制是有意保留的：`greenfield` Adoption Mode 语义仍需要产品决策；live protocol-block synchronization 不属于当前本地 static/script/simulation hook 套件范围。

## 从旧版 `docs/specs/` 布局迁移

旧版本直接使用 `docs/specs/`。当前工作区布局是 `docs/spec-docs/specs/`。

迁移步骤：

1. 将 `docs/specs/*` 移动到 `docs/spec-docs/specs/`。
2. 如果存在 `constitution.md` 和 `inventory.md`，移动到 `docs/spec-docs/`。
3. 更新 `AGENTS.md` 或 `CLAUDE.md` 中的协议块。
4. 运行 `spec-docs verify`。

迁移完成后不需要兼容层。

## 仓库内容

```text
.
├── skills/
│   └── spec-docs/
│       ├── SKILL.md
│       ├── references/
│       │   ├── modes.md
│       │   ├── architecture-control.md
│       │   ├── source-priority.md
│       │   ├── verification.md
│       │   ├── spec-authoring.md
│       │   ├── workflow-integration.md
│       │   ├── project-instructions.md
│       │   ├── hard-gates.md
│       │   ├── hooks.md
│       │   └── common-mistakes.md
│       ├── hooks/
│       │   ├── hooks.json
│       │   ├── hooks-cursor.json
│       │   ├── run-hook.cmd
│       │   └── scripts/
│       │       ├── session-start
│       │       ├── pre-edit-guard
│       │       ├── pre-bash-guard
│       │       ├── post-edit-reminder
│       │       └── stop-verify-reminder
│       └── templates/
│           ├── agent-protocol-block.md
│           ├── specs-readme.md
│           ├── workspace-readme.md
│           ├── constitution.md
│           ├── inventory.md
│           ├── project-overview.spec.md
│           ├── feature.spec.md
│           ├── module.spec.md
│           ├── interface.spec.md
│           ├── runtime.spec.md
│           ├── data.spec.md
│           ├── integration.spec.md
│           ├── quality.spec.md
│           ├── current-architecture.md
│           ├── target-architecture.md
│           ├── placement-rules.md
│           ├── architecture-review.md
│           ├── placement-review.md
│           ├── adr.md
│           ├── rebuild-status.md
│           ├── adoption-plan.md
│           └── minimal-implementation-plan.md
├── bin/
│   └── spec-docs.js
├── agents/
│   └── openai.yaml
├── test-runs/
│   └── spec-docs-completeness/   # 本地完备性套件：12 个场景、全部模式、source + installed 检查
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
