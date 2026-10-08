#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/875b050518e6fa45848bdc5750449083577e7ce44809fc5b15e4ca87d51d1a80/contract';
import startContract from '../../snapshots/875b050518e6fa45848bdc5750449083577e7ce44809fc5b15e4ca87d51d1a80/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/ac256d9c0fbfcff84c664f6d24276bc226bb5d14d8e60202a135d8aea011ce39/contract';
import endContract from '../../snapshots/ac256d9c0fbfcff84c664f6d24276bc226bb5d14d8e60202a135d8aea011ce39/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, lit, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Service',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('detail', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('displayOrder', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('features', 'text', {
            notNull: true,
            default: lit(''),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('icon', 'text', {
            notNull: true,
            default: lit('Camera'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('isPublished', 'bool', {
            notNull: true,
            default: lit(true),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
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
