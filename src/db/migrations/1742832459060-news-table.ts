import { MigrationInterface, QueryRunner } from "typeorm";

export class NewsTable1742832459060 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`news\` (
                \`id\` CHAR(36) NOT NULL DEFAULT (UUID()),
                \`title\` VARCHAR(256) NOT NULL,
                \`content\` TEXT NOT NULL,
                \`authorId\` CHAR(36) NULL,
                FOREIGN KEY (\`authorId\`) REFERENCES \`authors\`(\`id\`),
                \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updatedAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                \`deletedAt\` TIMESTAMP NULL,
                PRIMARY KEY (\`id\`)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS \`news\`;`);
    }


}
