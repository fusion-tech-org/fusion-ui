import * as Comlink from 'comlink';
import * as ParseFileWorker from './parseFile.worker?worker';
import { ParseFileParams } from './interface';

// 使用 Comlink 创建 Worker 代理
const worker = Comlink.wrap<{
  parseFile: (params: ParseFileParams) => Promise<unknown>;
}>(new ParseFileWorker.default());

// const worker = Comlink.wrap<{
//   parseFile: (params: ParseFileParams) => Promise<unknown>;
// }>(
//   new Worker(new URL('./parseFile.worker', import.meta.url), {
//     type: 'module',
//     name: 'parseFile',
//   })
// );

async function parseFile(params: ParseFileParams) {
  const result = await worker.parseFile(params);

  return result;
}

export default parseFile;
