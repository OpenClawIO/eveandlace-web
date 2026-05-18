# 领域模型与评分规则

## 1. 核心对象

### 1.1 UserProfile

```ts
interface UserProfile {
  userId: string;
  name?: string;
  sex: 'male' | 'female' | 'other';
  birthDate: string;
  ethnicity?: string;
  heightCm?: number;
  weightKg?: number;
  bmi?: number;
  smokingStatus?: 'never' | 'former' | 'current';
  drinkingStatus?: 'never' | 'occasional' | 'frequent';
  familyHistory?: string[];
  medicalHistory?: string[];
  medications?: string[];
}
```

### 1.2 HealthReport

```ts
interface HealthReport {
  reportId: string;
  userId: string;
  sourceHospital?: string;
  reportDate: string;
  uploadFileUrl: string;
  parseStatus: 'pending' | 'parsed' | 'failed' | 'review_required';
  metrics: LabMetric[];
}
```

### 1.3 LabMetric

```ts
interface LabMetric {
  metricId: string;
  standardCode: string;
  displayName: string;
  aliases?: string[];
  category:
    | 'cardiovascular'
    | 'liver'
    | 'renal'
    | 'glucose_metabolism'
    | 'blood_routine'
    | 'thyroid'
    | 'urine'
    | 'other';
  rawName: string;
  rawValue: string;
  numericValue?: number;
  unit?: string;
  normalizedValue?: number;
  normalizedUnit?: string;
  labReferenceRange?: ReferenceRange;
  clinicalThreshold?: ClinicalThreshold;
  sourcePosition?: SourceAnchor;
}
```

### 1.4 SourceAnchor / ReferenceRange / ClinicalThreshold

```ts
interface SourceAnchor {
  page?: number;
  boundingBox?: { x: number; y: number; width: number; height: number };
  rowIndex?: number;
  rawTextSnippet?: string;
  confidence?: number;
}

interface ReferenceRange {
  lower?: number;
  upper?: number;
  ageRule?: string;
  sexRule?: string;
  sourceLab?: string;
}

interface ClinicalThreshold {
  level: 'attention' | 'high_risk' | 'critical';
  comparator: 'gt' | 'gte' | 'lt' | 'lte' | 'between';
  value?: number;
  min?: number;
  max?: number;
  guidelineId: string;
  guidelineVersion: string;
}
```

### 1.5 InterpretationResult

```ts
interface InterpretationResult {
  metricId: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  severityScore: number;
  trendScore: number;
  personalRiskScore: number;
  priorityScore: number;
  summaryText: string;
  personalizedText: string;
  technicalText: string;
  evidence: EvidenceRef[];
  actions: ActionItem[];
}
```

## 2. 指标状态判定模型

一个指标至少经过三层判定：

### 2.1 实验室判定

比较本次结果与报告自带参考范围：

- 低于下限 -> 偏低
- 高于上限 -> 偏高
- 在范围内 -> 实验室正常

### 2.2 临床判定

比较本次结果与指南风险阈值：

- 未超实验室上限但超过临床建议阈值 -> 提示“风险偏高”
- 在实验室正常内但接近干预线 -> 标记边界风险

### 2.3 个性化判定

结合用户档案进行阈值收紧或解释修正：

- 肥胖 + 空腹血糖边界 -> 上调风险等级
- 高血压病史 + LDL-C 升高 -> 提高优先级
- 剧烈运动后 ALT 升高 -> 降低误报概率，但保留提醒

## 3. 重点突出排序模型

### 3.1 四维评分

```text
priority_score = deviation_score * clinical_weight * trend_weight * personal_risk_weight
```

### 3.2 评分维度说明

#### deviation_score

表示偏离正常值或风险阈值的程度：

- 正常：1.0
- 边界异常：1.2
- 轻度异常：1.5
- 中度异常：2.0
- 重度异常：3.0
- 危急值：5.0

#### clinical_weight

反映指标临床重要性：

- 一般提示性指标：1.0
- 常见慢病风险指标：1.4
- 强相关风险指标：1.8
- 危急相关指标：2.5

#### trend_weight

- 单次异常且无历史：1.0
- 连续恶化：1.3
- 边界持续上升：1.5
- 波动异常且伴多指标联动：1.7

#### personal_risk_weight

- 无已知附加风险：1.0
- 存在年龄/性别风险：1.1
- 存在家族史或肥胖：1.3
- 已有慢病或复合高危因素：1.6

## 4. 综合健康评分

建议总分以 100 分为起点，用“分系统扣分 + 趋势扣分 + 危急项上限封顶”的方式构建。

### 4.1 计算思路

```text
overall_score = 100
              - system_penalty_sum
              - trend_penalty_sum
              - critical_penalty_sum
```

### 4.2 系统维度映射

- 心血管系统：血压、总胆固醇、LDL-C、HDL-C、甘油三酯
- 血糖代谢：空腹血糖、HbA1c、尿糖
- 肝功能：ALT、AST、GGT、总胆红素
- 肾功能：肌酐、尿酸、尿素氮、eGFR
- 血常规：血红蛋白、白细胞、血小板等

### 4.3 展示原则

- 分数用于总览，不替代单项判断
- 遇到危急值时，分数必须让位于明确警报
- 分数变化趋势要可解释，不能只显示结果不显示原因

## 5. 趋势识别规则

### 5.1 识别类型

- 持续升高
- 持续降低
- 边界上升
- 高位波动
- 恢复正常但历史波动大

### 5.2 示例规则

#### 边界上升

满足以下条件时触发：

- 最近 3 次结果均未超上限
- 数值单调上升或总体斜率为正
- 最新值 >= 上限的 85%

#### 持续恶化

满足以下条件时触发：

- 最近 2 次或 3 次均向风险方向变化
- 本次增幅超过最小临床关注变化量

## 6. 自然语言解释模板

### 6.1 第一层：白话摘要

模板：

```text
您的{指标名}这次{状态}，说明{身体层面的通俗含义}。目前属于{严重程度}，建议优先关注{行动方向}。
```

### 6.2 第二层：个性化解释

模板：

```text
结合您的{年龄/性别/病史/生活方式}，这个结果比一般人更需要关注，因为{原因}。
```

### 6.3 第三层：专业说明

模板：

```text
本次结果为 {value}{unit}。实验室参考范围为 {lab_range}，临床参考阈值依据 {guideline_name} {guideline_version}，当前命中规则为 {rule_ids}。
```

## 7. 建议引擎输出模型

```ts
interface ActionItem {
  priority: 'high' | 'medium' | 'low';
  actionType: 'recheck' | 'visit_doctor' | 'diet' | 'exercise' | 'monitor';
  title: string;
  description: string;
  dueWindow: 'immediately' | 'within_1_week' | 'within_1_month' | 'within_3_months';
  triggerReason: string[];
  departmentSuggestion?: string;
}
```

## 8. 依据可追溯模型

```ts
interface EvidenceRef {
  type: 'guideline' | 'lab_range' | 'trend_rule' | 'personalization_rule';
  sourceId: string;
  sourceTitle: string;
  version?: string;
  locator?: string;
  excerpt?: string;
}
```

设计要求：

- 每条高亮结论至少一条 evidence
- 每条建议至少绑定一条触发依据
- 前端默认折叠证据，用户可展开查看

## 9. 风险提示边界

系统必须明确标识以下边界：

- 本系统用于辅助解读，不能替代医生诊断
- 出现危急值或明显不适时，应优先线下就医
- 若报告缺少关键信息或 OCR 置信度低，应提示人工核对
