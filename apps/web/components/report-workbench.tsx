'use client';

import { useMemo, useState } from 'react';
import type { InterpretedReport, MetricCard, UserProfile } from '@health-report/domain';
import { interpretReport } from '@/lib/api';

const initialProfile: UserProfile = {
  age: 35,
  sex: 'male',
  bmi: 24,
  medicalHistory: ['hypertension'],
  familyHistory: ['cardiovascular']
};

function dueWindowLabel(value: string) {
  switch (value) {
    case 'immediately':
      return '立即处理';
    case 'within_1_week':
      return '1 周内';
    case 'within_1_month':
      return '1 个月内';
    case 'within_3_months':
      return '3 个月内';
    default:
      return value;
  }
}

function MetricSection({ metric }: { metric: MetricCard }) {
  return (
    <article className="metric-card">
      <div className="metric-head">
        <div>
          <h3>{metric.name}</h3>
          <p className="muted">{metric.category}</p>
        </div>
        <span className={`badge ${metric.status}`}>
          {metric.status === 'high' ? '偏高' : metric.status === 'low' ? '偏低' : metric.status === 'critical' ? '危急' : '趋势关注'}
        </span>
      </div>

      <div className="metric-meta">
        <div>
          <strong>本次结果</strong>
          <p>{metric.value} {metric.unit}</p>
        </div>
        <div>
          <strong>实验室参考</strong>
          <p>{metric.referenceRange}</p>
        </div>
        <div>
          <strong>临床阈值</strong>
          <p>{metric.clinicalThreshold}</p>
        </div>
        <div>
          <strong>趋势信号</strong>
          <p>{metric.trendSignal}</p>
        </div>
      </div>

      <p><strong>白话解释：</strong>{metric.plainExplanation}</p>
      <p><strong>对你意味着什么：</strong>{metric.personalizedExplanation}</p>
      <p><strong>专业说明：</strong>{metric.technicalExplanation}</p>

      <div className="action-list">
        {metric.actions.map((action) => (
          <div className="action-card" key={`${metric.code}-${action.title}`}>
            <strong>{action.title}</strong>
            <p>{action.description}</p>
            <span className="badge normal">{dueWindowLabel(action.dueWindow)}</span>
          </div>
        ))}
      </div>

      <div className="evidence">
        <strong>依据来源：</strong>
        <ul>
          {metric.evidence.map((item) => (
            <li key={`${metric.code}-${item.sourceTitle}`}>
              {item.sourceTitle}{item.version ? ` ${item.version}` : ''}{item.locator ? ` · ${item.locator}` : ''}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function ReportWorkbench() {
  const [file, setFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [report, setReport] = useState<InterpretedReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => Boolean(file) && !loading, [file, loading]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError('请先选择一份体检报告文件');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const nextReport = await interpretReport(file, profile);
      setReport(nextReport);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : '提交失败');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="hero">
        <div className="panel hero-copy">
          <span className="eyebrow">全栈演示版</span>
          <h1>体检报告上传后，直接生成可读、可追溯、可行动的健康解读。</h1>
          <p>
            这一版先打通了最小闭环：前端上传报告，后端接收并返回结构化解读结果，页面展示总览、异常详情和行动建议。
            现在先把“能跑起来”变成事实，后面我们再把 OCR、规则引擎和知识库逐层接进去。
          </p>
          <div className="hero-points">
            <div className="hero-point">
              <strong>第一屏</strong>
              <span>健康总览、系统评分、重点提醒</span>
            </div>
            <div className="hero-point">
              <strong>第二屏</strong>
              <span>异常指标卡片、解释分层、依据可追溯</span>
            </div>
            <div className="hero-point">
              <strong>第三屏</strong>
              <span>行动建议清单与复查优先级</span>
            </div>
            <div className="hero-point">
              <strong>当前后端</strong>
              <span>支持文件上传，返回演示版结构化解读 JSON</span>
            </div>
          </div>
        </div>

        <aside className="panel hero-aside">
          <div>
            <p className="muted" style={{ color: 'rgba(255,255,255,0.72)' }}>演示健康评分</p>
            <div className="score-ring">
              <div>
                <strong>82</strong>
                <span>健康总分</span>
              </div>
            </div>
          </div>
          <div>
            <strong>当前适合验证的闭环</strong>
            <p style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.7 }}>
              上传任意 PDF 或图片后，会生成一份演示版解读结果，便于我们先验证信息架构、交互节奏和前后端联调。
            </p>
          </div>
        </aside>
      </section>

      <div className="grid">
        <section className="panel form-panel">
          <h2 className="section-title">上传一份报告，生成首版解读</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field full">
                <label htmlFor="report-file">体检报告文件</label>
                <input
                  id="report-file"
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                />
              </div>

              <div className="field">
                <label htmlFor="age">年龄</label>
                <input
                  id="age"
                  type="number"
                  value={profile.age}
                  onChange={(event) => setProfile((current) => ({ ...current, age: Number(event.target.value) || 0 }))}
                />
              </div>

              <div className="field">
                <label htmlFor="sex">性别</label>
                <select
                  id="sex"
                  value={profile.sex}
                  onChange={(event) => setProfile((current) => ({ ...current, sex: event.target.value as UserProfile['sex'] }))}
                >
                  <option value="male">男</option>
                  <option value="female">女</option>
                  <option value="other">其他</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="bmi">BMI</label>
                <input
                  id="bmi"
                  type="number"
                  step="0.1"
                  value={profile.bmi ?? ''}
                  onChange={(event) => setProfile((current) => ({ ...current, bmi: Number(event.target.value) || undefined }))}
                />
              </div>

              <div className="field">
                <label htmlFor="history">既往史</label>
                <input
                  id="history"
                  value={profile.medicalHistory?.join(',') ?? ''}
                  onChange={(event) => setProfile((current) => ({
                    ...current,
                    medicalHistory: event.target.value.split(',').map((item) => item.trim()).filter(Boolean)
                  }))}
                  placeholder="如 hypertension, fatty liver"
                />
              </div>

              <div className="field full">
                <label htmlFor="family-history">家族史</label>
                <input
                  id="family-history"
                  value={profile.familyHistory?.join(',') ?? ''}
                  onChange={(event) => setProfile((current) => ({
                    ...current,
                    familyHistory: event.target.value.split(',').map((item) => item.trim()).filter(Boolean)
                  }))}
                  placeholder="如 cardiovascular, diabetes"
                />
              </div>
            </div>

            <button className="primary-button" type="submit" disabled={!canSubmit}>
              {loading ? '正在生成解读...' : '开始解读'}
            </button>

            <p className="note">
              当前是演示版：后端会接收真实上传文件，但返回的是一份可运行的模拟解读结果，用来先验证系统框架与前端体验。
            </p>

            {error ? <div className="error-box">{error}</div> : null}
          </form>
        </section>

        {report ? (
          <section className="report-grid">
            <div className="panel report-card">
              <h2 className="section-title">健康总览</h2>
              <p><strong>{report.overview.headline}</strong></p>
              <p className="muted">{report.overview.summary}</p>
              <div className="system-list">
                {report.overview.systemScores.map((item) => (
                  <div className="system-chip" key={item.name}>
                    <span>{item.name}</span>
                    <strong>{item.score}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel report-card">
              <h2 className="section-title">优先行动建议</h2>
              <div className="action-list">
                {report.overview.priorityActions.map((action) => (
                  <div className="action-card" key={action.title}>
                    <div className="inline-list">
                      <span className="badge high">{action.priority === 'high' ? '高优先级' : action.priority === 'medium' ? '中优先级' : '低优先级'}</span>
                      <span className="badge normal">{dueWindowLabel(action.dueWindow)}</span>
                    </div>
                    <strong>{action.title}</strong>
                    <p>{action.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {report ? (
          <section className="panel report-card">
            <h2 className="section-title">异常与趋势关注项</h2>
            <div className="metric-list">
              {report.abnormalMetrics.map((metric) => (
                <MetricSection key={metric.code} metric={metric} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
