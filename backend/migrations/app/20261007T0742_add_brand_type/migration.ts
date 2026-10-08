#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/c84bc9a73a5739880340365853cc82deed08df1f7a3550618ef39e57d7dbdc89/contract';
import endContract from '../../snapshots/c84bc9a73a5739880340365853cc82deed08df1f7a3550618ef39e57d7dbdc89/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/fbe8dac5f806ca60fc485d3727bdfa5cb720d931c2fbed6d504f709c2b5c92b5/contract';
import startContract from '../../snapshots/fbe8dac5f806ca60fc485d3727bdfa5cb720d931c2fbed6d504f709c2b5c92b5/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'Brand',
        column: col('type', 'text', {
          notNull: true,
          default: lit('partner'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
