#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/ac256d9c0fbfcff84c664f6d24276bc226bb5d14d8e60202a135d8aea011ce39/contract';
import startContract from '../../snapshots/ac256d9c0fbfcff84c664f6d24276bc226bb5d14d8e60202a135d8aea011ce39/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/fbe8dac5f806ca60fc485d3727bdfa5cb720d931c2fbed6d504f709c2b5c92b5/contract';
import endContract from '../../snapshots/fbe8dac5f806ca60fc485d3727bdfa5cb720d931c2fbed6d504f709c2b5c92b5/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Brand',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', {
            notNull: true,
            default: lit(''),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isPublished', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('logo', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('website', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
