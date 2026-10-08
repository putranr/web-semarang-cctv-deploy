#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/37f8e06552d91f7c22d1fb0d800539a9e13c594ef4cab33bacb67fca1cfd03ef/contract';
import startContract from '../../snapshots/37f8e06552d91f7c22d1fb0d800539a9e13c594ef4cab33bacb67fca1cfd03ef/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/fb9f4e780c69382fc343edf06ee41ce4c007d18d8c7cb6bb99a2589ef362bfd7/contract';
import endContract from '../../snapshots/fb9f4e780c69382fc343edf06ee41ce4c007d18d8c7cb6bb99a2589ef362bfd7/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'BusinessPartner',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('image', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('isPublished', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
