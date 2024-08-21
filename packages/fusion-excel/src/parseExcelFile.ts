import * as Comlink from 'comlink';
import ParseFileWorker from './parseFile.worker.ts?worker';
import { ParseFileParams } from './interface';

// 使用 Comlink 创建 Worker 代理
const worker = Comlink.wrap<{
  parseFile: (params: ParseFileParams) => Promise<unknown>;
}>(new ParseFileWorker());

async function parseFile(params: ParseFileParams) {
  const result = await worker.parseFile(params);

  return result;
}

export default parseFile;
