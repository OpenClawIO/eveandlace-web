import Fastify from 'fastify';
import cors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { z } from 'zod';
import { buildMockReport, type UserProfile } from '@health-report/domain';

const app = Fastify({ logger: true });
const port = Number(process.env.PORT ?? 4000);

await app.register(cors, {
  origin: true
});

await app.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

app.get('/health', async () => {
  return {
    status: 'ok',
    service: 'health-report-api',
    timestamp: new Date().toISOString()
  };
});

app.post('/api/reports/interpret', async (request, reply) => {
  const parts = request.parts();
  let fileName = '未命名体检报告';
  let profileRaw = '{}';

  for await (const part of parts) {
    if (part.type === 'file') {
      fileName = part.filename;
      await part.toBuffer();
      continue;
    }

    if (part.type === 'field' && part.fieldname === 'profile') {
      profileRaw = String(part.value ?? '{}');
    }
  }

  const profileSchema = z.object({
    age: z.number().min(1).max(120).default(35),
    sex: z.enum(['male', 'female', 'other']).default('male'),
    bmi: z.number().min(10).max(60).optional(),
    medicalHistory: z.array(z.string()).optional(),
    familyHistory: z.array(z.string()).optional()
  });

  let profile: UserProfile;

  try {
    profile = profileSchema.parse(JSON.parse(profileRaw));
  } catch {
    return reply.code(400).send({ message: '用户档案格式不正确' });
  }

  const report = buildMockReport(fileName, profile);

  return {
    message: '报告已完成结构化解析与智能解读（当前为可运行演示版本）',
    report
  };
});

app.setErrorHandler((error, _request, reply) => {
  app.log.error(error);
  reply.code(500).send({
    message: '服务暂时不可用，请稍后重试'
  });
});

app.listen({ port, host: '0.0.0.0' }).catch((error) => {
  app.log.error(error);
  process.exit(1);
});
