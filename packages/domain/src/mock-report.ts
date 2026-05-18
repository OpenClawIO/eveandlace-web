import type { InterpretedReport, UserProfile } from './types';

function buildLDLExplanation(profile: UserProfile) {
  const riskTag = profile.medicalHistory?.includes('hypertension') || profile.familyHistory?.includes('cardiovascular')
    ? '结合您的高血压或心血管家族史，这个结果需要更积极地管理。'
    : '目前更像是早期血脂异常信号，适合尽早做生活方式干预。';

  return {
    plain: '低密度脂蛋白胆固醇偏高，说明血液里的“坏胆固醇”有点多，长期可能增加动脉粥样硬化风险。',
    personalized: riskTag,
    technical: 'LDL-C 3.9 mmol/L，高于一般成人理想控制目标；对于合并高血压或心血管危险因素人群，管理目标通常更严格。'
  };
}

export function buildMockReport(reportName: string, profile: UserProfile): InterpretedReport {
  const ldl = buildLDLExplanation(profile);
  const glucoseTrend = profile.age >= 40
    ? '近两次结果呈缓慢上升，虽然尚未超标，但已接近边界区。'
    : '当前处于正常高值区，建议继续观察后续变化。';

  return {
    reportId: `mock-${Date.now()}`,
    reportName,
    generatedAt: new Date().toISOString(),
    overview: {
      score: 82,
      headline: '整体状态稳定，但需要优先关注血脂和血糖趋势。',
      summary: '系统结合本次报告与基础档案后，识别到 2 项值得优先关注的问题：LDL-C 偏高、空腹血糖持续上升。',
      systemScores: [
        { name: '心血管', score: 74, status: 'watch' },
        { name: '血糖代谢', score: 80, status: 'watch' },
        { name: '肝功能', score: 91, status: 'good' },
        { name: '肾功能', score: 93, status: 'good' }
      ],
      priorityActions: [
        {
          priority: 'high',
          title: '3 个月内复查血脂四项',
          description: '优先确认 LDL-C 是否持续升高，并结合血压、BMI 评估心血管风险。',
          dueWindow: 'within_3_months'
        },
        {
          priority: 'medium',
          title: '记录空腹血糖与体重变化',
          description: '建议每周记录一次体重，并在下次体检前关注主食、甜饮与晚间加餐。',
          dueWindow: 'within_1_month'
        }
      ]
    },
    abnormalMetrics: [
      {
        code: 'LDL_C',
        name: '低密度脂蛋白胆固醇（LDL-C）',
        category: '心血管',
        value: 3.9,
        unit: 'mmol/L',
        referenceRange: '< 3.4 mmol/L',
        clinicalThreshold: '心血管风险人群建议 < 2.6 mmol/L',
        status: 'high',
        plainExplanation: ldl.plain,
        personalizedExplanation: ldl.personalized,
        technicalExplanation: ldl.technical,
        impactLevel: 'high',
        trendSignal: '与上次相比轻度上升，属于需要优先处理的慢病风险指标。',
        actions: [
          {
            priority: 'high',
            title: '控制饱和脂肪摄入',
            description: '减少油炸食品、肥肉和奶油制品，优先用鱼类、豆制品和坚果替代。',
            dueWindow: 'within_1_month'
          },
          {
            priority: 'high',
            title: '评估是否需要门诊随访',
            description: '如果既往已有高血压、肥胖或家族早发心血管病史，建议咨询全科或心内科。',
            dueWindow: 'within_1_month'
          }
        ],
        evidence: [
          {
            type: 'guideline',
            sourceTitle: '中国成人血脂异常防治指南',
            version: '2023 修订版',
            locator: '血脂管理章节'
          }
        ]
      },
      {
        code: 'FPG',
        name: '空腹血糖',
        category: '血糖代谢',
        value: 5.8,
        unit: 'mmol/L',
        referenceRange: '3.9 - 6.1 mmol/L',
        clinicalThreshold: '糖尿病前期关注区间 5.6 - 6.9 mmol/L',
        status: 'normal',
        plainExplanation: '空腹血糖虽然仍在实验室正常范围内，但已经进入临床上需要关注的边界区。',
        personalizedExplanation: profile.bmi && profile.bmi >= 24
          ? '结合您的 BMI 偏高，这个结果比单纯“正常”更值得留意。'
          : '如果近期饮食偏甜、运动减少，这类上升趋势通常值得尽早调整生活方式。',
        technicalExplanation: '实验室参考范围内并不等于无风险；按代谢风险管理视角，5.6 mmol/L 以上已经进入需要观察的高值区。',
        impactLevel: 'medium',
        trendSignal: glucoseTrend,
        actions: [
          {
            priority: 'medium',
            title: '减少精制碳水和含糖饮料',
            description: '优先控制夜宵、甜饮和高糖零食，主食适度替换为全谷物。',
            dueWindow: 'within_1_month'
          },
          {
            priority: 'medium',
            title: '3 个月后复查空腹血糖或 HbA1c',
            description: '如果体重持续上升或有糖尿病家族史，建议更早复查。',
            dueWindow: 'within_3_months'
          }
        ],
        evidence: [
          {
            type: 'trend_rule',
            sourceTitle: '系统趋势规则',
            version: 'v1',
            locator: '边界上升判定'
          },
          {
            type: 'guideline',
            sourceTitle: '中国 2 型糖尿病防治指南',
            version: '2023 版',
            locator: '糖代谢异常筛查章节'
          }
        ]
      }
    ]
  };
}
