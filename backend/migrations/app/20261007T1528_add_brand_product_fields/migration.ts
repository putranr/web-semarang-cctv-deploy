#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/37f8e06552d91f7c22d1fb0d800539a9e13c594ef4cab33bacb67fca1cfd03ef/contract';
import endContract from '../../snapshots/37f8e06552d91f7c22d1fb0d800539a9e13c594ef4cab33bacb67fca1cfd03ef/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/c84bc9a73a5739880340365853cc82deed08df1f7a3550618ef39e57d7dbdc89/contract';
import startContract from '../../snapshots/c84bc9a73a5739880340365853cc82deed08df1f7a3550618ef39e57d7dbdc89/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'Brand',
        column: col('category', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Brand',
        column: col('productImage', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Brand',
        column: col('productName', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dropNotNull({ schema: 'public', table: 'Brand', column: 'name' }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
