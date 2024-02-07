import { Table, type MigrationInterface, type QueryRunner } from 'typeorm'

export class Users1706812619477 implements MigrationInterface {
  private readonly table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        isPrimary: true,
        generationStrategy: 'uuid',
        isNullable: false
      },
      {
        name: 'email',
        type: 'varchar',
        isUnique: true,
        isNullable: false
      },
      {
        name: 'birthday',
        type: 'varchar',
        isUnique: true,
        isNullable: false
      },
      {
        name: 'username',
        type: 'varchar',
        isNullable: false
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()'
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()'
      }
    ]
  })

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table)
  }
}
