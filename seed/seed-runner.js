import path from 'node:path';
import { unstable_dev } from 'wrangler';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  // eslint-disable-next-line no-undef
  const seedImages = process.env.SEED_IMAGES.split(',');
  const local = process.env.LOCAL === 'true';

  // FIXME: このやり方だとリモートのD1にシードを流す際に、
  // wrangler.tomlのpreview_database_idを、
  // 本番のDBのidに変更する必要があるので修正する
  const workerPath = path.resolve(__dirname, './seed.ts');
  const worker = await unstable_dev(workerPath, {
    local,
    nodeCompat: true,
    config: path.resolve(__dirname, '../wrangler.toml')
  });

  const response = await worker.fetch('/', {
    method: 'POST',
    body: JSON.stringify({
      seedImages
    })
  });
  console.log(await response.text());
  await worker.stop();
}

main().catch((e) => {
  console.error(e);
  // eslint-disable-next-line no-undef
  process.exit(1);
});
