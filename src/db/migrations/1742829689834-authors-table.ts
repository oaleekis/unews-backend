import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthorsTable1742829689834 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`authors\` (
                \`id\` CHAR(36) NOT NULL DEFAULT (UUID()),
                \`name\` VARCHAR(256) NOT NULL,
                \`email\` VARCHAR(256) NOT NULL,
                \`password\` VARCHAR(256) NOT NULL,
                \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updatedAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deletedAt\` TIMESTAMP NULL,
                PRIMARY KEY (\`id\`),
                UNIQUE KEY \`author_email\` (\`email\`)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS \`authors\`;`);
    }

}
